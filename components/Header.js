import Image from "next/image";
import {
    BellIcon,
    ChatIcon,
    ChevronDownIcon,
    HomeIcon,
    UserGroupIcon,
    ViewGridIcon,
} from "@heroicons/react/solid";

import {
    FlagIcon,
    PlayIcon,
    SearchIcon,
    ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Header() {
    const [user] = useAuthState(auth);

    return (
        <header className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
            {/* Left */}
            <div className="flex items-center">
                <Image
                    src="/FacebookLogo.png"
                    width={45}
                    height={45}
                    layout="fixed"
                />

                {/* Input */}
                <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
                    <SearchIcon className="h-6 text-gray-500" />
                    <input
                        className="hidden md:inline-flex flex py-1 ml-2 items-center bg-transparent focus:outline-none placeholder-gray-500 flex-shrink"
                        placeholder="Search Facebook"
                    />
                </div>
            </div>

            {/* Centre */}
            <div className="flex justify-center items-center flex-grow">
                <div className="flex space-x-6 md:space-x-2">
                    <HeaderIcon active Icon={HomeIcon} />
                    <HeaderIcon Icon={FlagIcon} />
                    <HeaderIcon Icon={PlayIcon} />
                    <HeaderIcon Icon={ShoppingCartIcon} />
                    <HeaderIcon Icon={UserGroupIcon} />
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center sm:space-x-2 justify-end">
                {/* Profile Pic */}
                <img
                    onClick={() => auth.signOut()}
                    className="rounded-full cursor-pointer"
                    src={user.photoURL}
                    width={40}
                    height={40}
                    layout="fixed"
                />

                <p className="whitespace-nowrap font-semibold p-3">{user.displayName}</p>

                <ViewGridIcon className="icon" />
                <ChatIcon className="icon" />
                <BellIcon className="icon" />
                <ChevronDownIcon className="icon" />
            </div>
        </header>
    )
}

export default Header
