export async function sendTeamsNotification(pr) {

    const card = {
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
                                    title: "Source Branch",
                                    value: pr.source
                                },

                                {
                                    title: "Target Branch",
                                    value: pr.target
                                }

                            ]
                        },

                        {
                            type: "TextBlock",
                            text: "🔗 Pull Request",
                            weight: "Bolder",
                            spacing: "Medium"
                        },

                        {
                            type: "TextBlock",
                            text: `[View Pull Request](${pr.url})`,
                            wrap: true,
                            color: "Accent"
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
        body: JSON.stringify(card)
    });

    const responseText = await response.text();

    console.log("Teams Response:", responseText);

    if (!response.ok) {
        throw new Error(responseText);
    }
}
