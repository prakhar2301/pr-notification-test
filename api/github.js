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

    if (event.action !== "opened") {
        return res.status(200).json({
            message: "Ignored"
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

    title: event.pull_request.title,

    description: event.pull_request.body || "No description provided.",

    author: event.pull_request.user.login,

    source: event.pull_request.head.ref,

    target: event.pull_request.base.ref,

    url: event.pull_request.html_url,

    number: event.pull_request.number,

    createdAt: `${timeAgo(event.pull_request.created_at)} (${new Date(event.pull_request.created_at).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata"
})})`

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

        message: "Teams notification sent successfully",

        pullRequest: prDetails

    });

}
