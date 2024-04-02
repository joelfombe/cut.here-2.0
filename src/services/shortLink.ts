import axiosShortLink from "@/lib/axios";

const createShortLink = async (props: any) => {
        const response = await axiosShortLink.post("/api/createurl", props);
        return response.data;

};

export { createShortLink };
