export async function sendTeamsNotification(pr) {

    let header = `🚀 New Pull Request (#${pr.number})`;

    if (pr.action === "closed") {

        if (pr.merged) {
            header = `🟢 Pull Request Merged (#${pr.number})`;
        } else {
            header = `🔴 Pull Request Closed Without Merge (#${pr.number})`;
        }

    }

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
                            text: header,
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

                                ...(pr.action === "opened"
    ? [{
        title: "Opened",
        value: pr.createdAt
    }]
    : [{
        title: pr.merged ? "Merged" : "Closed",
        value: pr.closedAt
    }]),

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
