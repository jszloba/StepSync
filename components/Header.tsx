import Image from "next/image"

export const Header = () => {
    return (
        <header>
            <Image
                src="https://jetbrains.com/ai/parts/header-section/img/header-illustration.png"
                alt="Trello Logo"
                width={100}
                height={100}
                className="w-34 md:w-56 pb-10 md:pb-0 object-contain"
            />

            <div>
                {/*searchbox*/}
                <form action="">
                    <input type="text"/>
                    <button hidden>Search</button>
                </form>
            </div>

        </header>

    );
};