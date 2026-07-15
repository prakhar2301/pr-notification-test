import { resolveRepository } from "../utils/repositoryResolver.js";
import { sendTeamsNotification } from "../services/teamsService.js";
import { timeAgo } from "../utils/timeFormatter.js";

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method Not Allowed"
        });
    }

    const event = req.body;

    // Handle only the PR events we care about
    if (!["opened", "closed"].includes(event.action)) {
        return res.status(200).json({
            message: `Ignoring action: ${event.action}`
        });
    }

    const repositoryName = event.repository.name;

    const config = resolveRepository(repositoryName);

    if (!config) {
        return res.status(404).json({
            message: "Repository not configured",
            repository: repositoryName
        });
    }

    const prDetails = {

        repository: repositoryName,

        type: config.type,

        leads: config.leads,

        number: event.pull_request.number,

        title: event.pull_request.title,

        description: event.pull_request.body || "No description provided.",

        author: event.pull_request.user.login,

        source: event.pull_request.head.ref,

        target: event.pull_request.base.ref,

        url: event.pull_request.html_url,

        action: event.action,

        merged: event.pull_request.merged,

        createdAt: `${timeAgo(event.pull_request.created_at)} (${new Date(event.pull_request.created_at).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata"
})})`,

closedAt: event.pull_request.closed_at
    ? `${timeAgo(event.pull_request.closed_at)} (${new Date(event.pull_request.closed_at).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Kolkata"
    })})`
    : null

    };

    try {

        await sendTeamsNotification(prDetails);

    } catch (error) {

        console.error("Teams Notification Failed:", error);

        return res.status(500).json({

            message: "Failed to send Teams notification",

            error: error.message

        });

    }

    return res.status(200).json({

        success: true,

        message: `PR ${event.action} notification sent successfully`,

        pullRequest: prDetails

    });

}
