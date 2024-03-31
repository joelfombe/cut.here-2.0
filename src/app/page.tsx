"use client";
import { Clipboard } from "@phosphor-icons/react";

export default function Home() {
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
                            className="p-3 border-2 border-black rounded-2xl w-72 min-w-44  max-w-96 outline-none focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            type="text"
                        />
                        <button className="bg-orange-500 hover:bg-orange-600 p-2 rounded-full font-semibold">
                            Create Link
                        </button>
                        <div className="p-1 gap-1 flex items-center justify-center rounded-full border-2 border-orange-500 w-72 min-w-44 max-w-96 ">
                            <input
                                className="w-full p-3 rounded-full outline-none"
                                type="text"
                                value="https://cut.here/short-link"
                            />
                            <button className="w-14 flex items-center justify-center p-2 bg-orange-500 rounded-full">
                                <Clipboard size={28} weight="light" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
