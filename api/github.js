export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method Not Allowed"
        });
    }

    const event = req.body;

    // Ignore ping event
    if (event.zen) {
        return res.status(200).json({
            success: true,
            message: "Ping received"
        });
    }

    // Ignore everything except newly opened PRs
    if (event.action !== "opened") {
        return res.status(200).json({
            success: true,
            message: `Ignoring PR action : ${event.action}`
        });
    }

    const pr = {

        repository: event.repository.name,

        repositoryUrl: event.repository.html_url,

        title: event.pull_request.title,

        description: event.pull_request.body,

        author: event.pull_request.user.login,

        sourceBranch: event.pull_request.head.ref,

        targetBranch: event.pull_request.base.ref,

        prUrl: event.pull_request.html_url,

        number: event.pull_request.number,

        draft: event.pull_request.draft
    };

    console.log("==============================");
    console.log("NEW PULL REQUEST");
    console.log("==============================");

    console.log(pr);

    return res.status(200).json(pr);

}
