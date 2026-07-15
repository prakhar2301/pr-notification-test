export async function sendTeamsNotification(pr) {

    const payload = {
        type: "message",
        attachments: [
            {
                contentType: "application/vnd.microsoft.card.adaptive",
                content: {
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    type: "AdaptiveCard",
                    version: "1.5",

                    body: [

    {
        type: "TextBlock",
        text: "🚀 New Pull Request",
        size: "Large",
        weight: "Bolder"
    },

    {
        type: "FactSet",
        facts: [

            {
                title: "Repository",
                value: pr.repository
            },

            {
                title: "Author",
                value: pr.author
            },

            {
                title: "Title",
                value: pr.title
            },

            {
                title: "Source",
                value: pr.source
            },

            {
                title: "Target",
                value: pr.target
            },

            {
                title: "Opened",
                value: pr.createdAt
            },

            {
                title: "PR URL",
                value: pr.url
            }

        ]
    },

    {
        type: "TextBlock",
        text: "Description",
        weight: "Bolder",
        spacing: "Medium"
    },

    {
        type: "TextBlock",
        text: pr.description,
        wrap: true
    }

],

                    actions: [
                        {
                            type: "Action.OpenUrl",
                            title: "🚀 Open Pull Request",
                            url: pr.url
                        }
                    ]
                }
            }
        ]
    };

    const response = await fetch(process.env.TEST_TEAMS_WEBHOOK, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
}
