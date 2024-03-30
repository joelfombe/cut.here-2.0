import { createurl } from "@/models/createUrl";
import { NextApiRequest, NextApiResponse } from "next";
import { HttpStatusCode } from "axios";
import connectMongoDB from "@/lib/mongodb";

export default async function getShortUrl(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { shortUrl } = req.query;
    await connectMongoDB();
    if (req.method === "GET") {
        try {
            const response: any = await createurl.findOne({
                shortUrl: shortUrl,
            });
            if (response) {
                await createurl.findOneAndUpdate(
                    { shortUrl: shortUrl },
                    { views: response.views + 1 }
                );
                return res.status(301).redirect(response.url);
            }
            return res.status(404).json({ error: "Url not found" });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
