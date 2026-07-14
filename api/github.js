export default async function handler(req, res) {

    console.log("========== NEW REQUEST ==========");

    console.log("Method:");
    console.log(req.method);

    console.log("Headers:");
    console.log(req.headers);

    console.log("Body:");
    console.log(JSON.stringify(req.body, null, 2));

    return res.status(200).json({
        success: true,
        message: "Webhook received successfully"
    });

}
