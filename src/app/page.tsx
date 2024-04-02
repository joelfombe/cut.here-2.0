"use client";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { Clipboard, Check } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { createShortLink } from "@/services/shortLink";
import Image from "next/image";
import pulse from "../../public/pulse-multiple.svg";
import axiosShortLink from "@/lib/axios";
import { toast } from "react-toastify";
const queryClient = new QueryClient();

type Inputs = {
    shortUrl: string;
    url: string;
};

export default function Home() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (newLink) => {
        toast.info("Creating link...");
        console.log(newLink);
        mutation.mutate(newLink);
    };

    const mutation = useMutation({
        mutationKey: ["createLink"],
        mutationFn: (newLink: Inputs) => {
            const response = axiosShortLink.post("/api/createurl", newLink);
            return response;
        },
        onSuccess: () => {
            toast.success("Link created successfully!");
            console.log("Link created successfully!");
        },
        onError: (e) => {
            console.log(`o erro e: ${e}`);
            toast.error("Failed to create link!");
        },
        onSettled(data, error, variables, context) {
            console.log(data?.data);
        },
    });

    const [copySuccess, setCopySuccess] = useState("");
    const inputRef = useRef(null);

    const copyLink = () => {
        const value: any = inputRef.current?.value;
        copyToClipBoard(value);
        setTimeout(() => {
            setCopySuccess("");
        }, 2000);
    };

    const copyToClipBoard = async (copyMe: any) => {
        try {
            await navigator.clipboard.writeText(copyMe);
            setCopySuccess("Copied!");
        } catch (err) {
            setCopySuccess("Failed to copy!");
        }
    };

    return (
        <main className="bg-[#16302b] flex h-screen w-screen items-center justify-center">
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {" "}
                    <div className="bg-white p-5 rounded-xl">
                        <h1 className="text-3xl font-bold text-orange-500">
                            Cut Here
                        </h1>
                        <div className="flex flex-col space-y-5">
                            <h2 className="font-semibold">
                                Create Your{" "}
                                <span className="text-orange-500">Short</span>{" "}
                                Link
                            </h2>
                            <input
                                className="p-3 border-2 border-black rounded-full w-72 min-w-44  max-w-96 outline-none focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                                type="text"
                                placeholder="Enter your Short link here..."
                                {...register("shortUrl", { required: true })}
                            />
                            {/* teste */}
                            <div className="p-3 focus-within:ring-1 focus-within:border-orange-500 focus-within:ring-orange-500 gap-1 flex items-center justify-center rounded-full border-2 border-black w-72 min-w-44 max-w-96 ">
                                <input
                                    className="w-[60px] h-full"
                                    type="text"
                                    disabled
                                    value="https://"
                                />
                                <input
                                    className="w-full h-full outline-none"
                                    type="text"
                                    placeholder="Enter your link here..."
                                    {...register("url", { required: true })}
                                />
                            </div>
                            {/* end */}
                            <button
                                onClick={() => {}}
                                className="bg-orange-500 hover:bg-orange-600 p-3 rounded-full font-semibold flex items-center justify-center"
                            >
                                Create Link
                                {/* {isLoading ? (
                                // eslint-disable-next-line @next/next/no-img-element

                            ) : null} */}
                                <Image src={pulse} alt="loading" />
                            </button>
                            <div className="p-1 gap-1 flex items-center justify-center rounded-full border-2 border-orange-500 w-72 min-w-44 max-w-96 ">
                                <input
                                    className="w-full p-3 rounded-full outline-none"
                                    type="text"
                                    value="https://cut.here/short-link"
                                    disabled
                                    ref={inputRef}
                                />
                                <button
                                    onClick={(e) => e.preventDefault()}
                                    type="submit"
                                    className="w-14 flex items-center justify-center p-2 bg-orange-500 rounded-full"
                                >
                                    {copySuccess ? (
                                        <Check size={32} weight="thin" />
                                    ) : (
                                        <Clipboard size={28} weight="light" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
