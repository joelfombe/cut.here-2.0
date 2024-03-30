import connectMongoDB from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { createurl } from "@/models/createUrl";

export default async function getAll(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            await connectMongoDB();
            const response: any = await createurl.find();
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}