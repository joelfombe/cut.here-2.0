"use client";
import { Clipboard, Check } from "@phosphor-icons/react";
import { useRef, useState } from "react";

export default function Home() {
    const [copySuccess, setCopySuccess] = useState("");
    const [link, setLink] = useState("");

    const inputRef = useRef(null);

    const copyLink = () => {
        // Acessando o valor do input através da ref
        const value: any = inputRef.current?.value;
        copyToClipBoard(value);
        console.log(value);
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
                <div className="bg-white p-5 rounded-xl">
                    <h1 className="text-3xl font-bold text-orange-500">
                        Cut Here
                    </h1>
                    <div className="flex flex-col space-y-5">
                        <h2 className="font-semibold">
                            Create Your{" "}
                            <span className="text-orange-500">Short</span> Link
                        </h2>
                        <input
                            className="p-3 border-2 border-black rounded-full w-72 min-w-44  max-w-96 outline-none focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            type="text"
                            placeholder="Enter your Short link here..."
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
                            />
                        </div>
                        {/* end */}
                        <button className="bg-orange-500 hover:bg-orange-600 p-3 rounded-full font-semibold">
                            Create Link
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
                                onClick={() => copyLink()}
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
            </div>
        </main>
    );
}
