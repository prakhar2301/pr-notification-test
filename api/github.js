import { resolveRepository } from "../utils/repositoryResolver.js";

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).end();
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

    return res.status(200).json({

        repository: repositoryName,

        type: config.type,

        leads: config.leads,

        webhook: config.webhookKey,

        title: event.pull_request.title,

        author: event.pull_request.user.login,

        source: event.pull_request.head.ref,

        target: event.pull_request.base.ref

    });

}
