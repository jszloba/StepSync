'use client'

import Image from "next/image"
import {MagnifyingGlassIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import {useBoardStore} from "@/store/BoardStore";

export const Header = () => {
    const [searchString, setSearchString] = useBoardStore((state) => [
        state.searchString,
        state.setSearchString,
    ])

    return (
        <header>
            <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">

                <div
                    className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055D1]
                    rounded-md filter blur-3xl opacity-50 -z-50
                    "
                />

                <Image
                    src="https://jetbrains.com/ai/parts/header-section/img/header-illustration.png"
                    alt="Trello Logo"
                    width={100}
                    height={100}
                    className="w-34 md:w-34 pb-10 md:pb-0 object-contain"
                />

                <div className="flex items-center space-x-5 justify-end flex-1 w-full">

                    <form
                        className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400"/>
                        <input
                            type="text"
                            placeholder="Поиск"
                            className="flex-1 outline-none p-2"
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}

                        />
                        <button type="submit" hidden>
                            Search
                        </button>
                    </form>
                    <Avatar name="Vladimir Zloba" round color="#0055D1" size="50"/>
                </div>
            </div>
            <div className="flex items-center justify-center px-5 md:py-5 mt-5">
                <p className="flex p-3 items-center text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white max-w-3xl text-[#0055D1]">
                    <UserCircleIcon className="inline-block  h-10 w-10 text-[#0055D1] mr-1"/>
                    GPT is summarising your tasks for the day...
                </p>
            </div>
        </header>

    );
};