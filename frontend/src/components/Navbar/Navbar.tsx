import Link from "next/link"
import { Icon } from "@iconify/react";
import './Navbar.css'
export default function Navbar(){
    return(
        <>
            <header id="header-navbar" className="h-20 w-full relative m-0 border-b-[1px] border-gray-300">
                <nav className="h-full w-[95%] mx-auto relative flex items-center justify-between">
                    <div id="logo-and-name" className="flex items-center gap-2">
                        <Link id="home-links-container" href={"/"} className="">
                            <Icon icon="cryptocurrency-color:chat" width="32" height="32" className="" />
                            <h1 className="font-semibold text-xl">PingChat</h1>
                        </Link>
                    </div>
                    <div id="links-navbar" className="flex items-center justify-center gap-8">
                        <Link href={"/about"}>
                            <h1 className="font-semibold text-xl">about</h1>
                        </Link>
                        <Link href={"/contact"}>
                            <h1 className="font-semibold text-xl">contact</h1>
                        </Link>
                    </div>
                    <div id="login-section" className="">
                        <Link href={"/signup"}>
                            <Icon icon="game-icons:plague-doctor-profile" width="32" height="32" />
                        </Link>
                    </div>
                </nav>
                {/* <Icon id="menu-icon" icon="pepicons-print:menu" width="20" height="20" /> */}
            </header>
        
        </>
    )
}