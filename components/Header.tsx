import Image from "next/image"
import {MagnifyingGlassIcon, UserCircleIcon} from "@heroicons/react/24/solid";
export const Header = () => {
    return (
        <header>
            <Image
                src="https://jetbrains.com/ai/parts/header-section/img/header-illustration.png"
                alt="Trello Logo"
                width={100}
                height={100}
                className="w-34 md:w-34 pb-10 md:pb-0 object-contain"
            />

            <div>
                {/*searchbox*/}
                <form
                    className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-400"/>
                    <input type="text" placeholder="Поиск"/>
                    <button hidden>Search</button>
                </form>
            </div>

        </header>

    );
};