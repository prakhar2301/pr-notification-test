import repositories from "../config/repositories.js";

export function resolveRepository(repositoryName) {

    for (const key of Object.keys(repositories)) {

        const group = repositories[key];

        if (group.repositories.includes(repositoryName)) {

            return {
                type: key,
                leads: group.leads,
                webhookKey: group.teamsWebhook
            };

        }
    }

    return null;
}
