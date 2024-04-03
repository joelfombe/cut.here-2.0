import { headers } from "next/headers";

export const getHostName = async () => {
    const headersList = headers();
    const hostname = await headersList.get("x-forwarded-host");
    return hostname;
};