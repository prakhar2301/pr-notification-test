export default async function handler(req, res) {

    const body = req.body;

    const response = {
        action: body.action,
        repository: body.repository?.name,
        title: body.pull_request?.title,
        author: body.pull_request?.user?.login,
        sourceBranch: body.pull_request?.head?.ref,
        targetBranch: body.pull_request?.base?.ref,
        url: body.pull_request?.html_url
    };

    console.log(response);

    return res.status(200).json(response);
}
