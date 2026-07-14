export default async function handler(req, res) {

    console.log("========== NEW REQUEST ==========");

    console.log("Method:", req.method);

    console.log("Headers:", req.headers);

    console.log("Body:", req.body);

    return res.status(200).json({
        success: true,
        message: "Webhook received successfully"
    });
}
