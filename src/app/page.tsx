"use client";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { Clipboard, Check } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { createShortLink } from "@/services/shortLink";
import Image from "next/image";
import pulse from "../../public/pulse-multiple.svg";
import axiosShortLink from "@/lib/axios";
import { toast, Bounce } from "react-toastify";

type Inputs = {
    shortUrl: string;
    url: string;
};

export default function Home() {
    const hostname = `${window.location.protocol}//${window.location.hostname}`;
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = ({ shortUrl, url }) => {
        const textoLimpo = shortUrl
            .replace(/[^\w\s]|_/g, "")
            .replace(/\s+/g, "_");
        // newLink.preventDefault();
        toast.info("Creating link...");
        mutation.mutate({ shortUrl: textoLimpo, url: url });
    };

    const mutation = useMutation({
        mutationKey: ["createLink"],
        mutationFn: (newLink: Inputs) => {
            const response = axiosShortLink.post("/api/createurl", newLink);
            return response;
        },
        onSuccess: () => {
            toast.success("Link created successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            console.log("Link created successfully!");
        },
        onError: (e) => {
            console.log(`o erro e: ${e}`);
            toast.error("Failed to create link!");
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
                            <button
                                onClick={() => {}}
                                className="bg-orange-500 hover:bg-orange-600 p-3 rounded-full font-semibold flex items-center justify-center"
                            >
                                {mutation.isPending ? (
                                    <Image src={pulse} alt="loading" />
                                ) : (
                                    "Create Link"
                                )}
                            </button>
                            {mutation.isSuccess ? (
                                <div className="p-1 gap-1 flex items-center justify-center rounded-full border-2 border-orange-500 w-72 min-w-44 max-w-96 ">
                                    <input
                                        className="w-full p-3 rounded-full outline-none"
                                        type="text"
                                        value={`${hostname}/${mutation.data.data.shortUrl}`}
                                        disabled
                                        ref={inputRef}
                                    />
                                    <button
                                        onClick={(e) => copyLink()}
                                        type="submit"
                                        className="w-14 flex items-center justify-center p-2 bg-orange-500 rounded-full"
                                    >
                                        {copySuccess ? (
                                            <Check size={32} weight="thin" />
                                        ) : (
                                            <Clipboard
                                                size={28}
                                                weight="light"
                                            />
                                        )}
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
