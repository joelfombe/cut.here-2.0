import connectMongoDB from "@/lib/mongodb";
import { createurl } from "@/models/createUrl";
import { NextApiRequest, NextApiResponse } from "next";

export default async function createUrl(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        await connectMongoDB();
        const { shortUrl, url }: any = req.body;
        try {
            const newUrl = new createurl({
                shortUrl,
                url,
            });
            await newUrl.save();
            return res.status(200).json(newUrl);
        } catch (error: any) {
            if (error.code === 11000) {
                return res
                    .status(400)
                    .json({ error: "Short URL is already in use." });
            }
            return res.status(500).json(error);
        }
    }
}
