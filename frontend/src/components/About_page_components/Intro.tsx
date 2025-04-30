import * as React from "react"
import * as motion from "motion/react-client"
import type { Variants } from "framer-motion"
import Alg from "../../../public/images/algerian-flag.webp"
import Image from "next/image"
import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"




export default function Intro() {

    return (
        <>
            <section className="h-44 w-full relative grid grid-cols-2 border-b-[1px] border-gray-600">
                <div className="h-full w-full col-span-1 border-r-[1px] flex items-center border-gray-600" id="left-side">
                    <div className="w-[95%] mx-auto">
                        <h1 className="font-semibold text-3xl text-pretty px-4">
                            In this section, I’ve decided to tell you about myself — the genius developer behind it all 😉😉
                        </h1>
                    </div>
                </div>
                <div className="h-full w-full col-span-1 flex items-center" id="right-side">
                    <div className="w-[95%] mx-auto ">
                        <span className="font-semibold text-xl">
                            Of course, don’t forget the golden rule: believe everything you see on the internet.<br />
                        </span>
                        <span className="font-semibold text-orange-500 text-lg">
                            So if you have a job offer, feel free to take the risk 😁
                        </span>
                    </div>
                </div>

            </section>
            <section className="h-dvh w-full relative overflow-hidden grid grid-cols-2">
                <div className="h-full w-full border-r-[1px] border-gray-600 col-span-1 grid grid-rows-2" id="left-side">
                    <div className="w-full relative h-full border-b-[1px] border-gray-600 overflow-hidden flex items-center justify-center ">
                        <div className="h-72 aspect-square shadow-2xs border border-white rounded-full overflow-hidden flex items-center justify-center">
                            <Image src={Alg} alt="algerian flag" height={600} width={600} loading="lazy" />

                        </div>

                    </div>
                    <div className="w-full relative h-full flex items-center justify-center flex-col gap-6 ">
                        <h1 className="text-4xl font-semibold text-center px-6">Talk is cheap , just click on one of this icons to see connect with me </h1>
                        <Icon icon="pixel:arrow-right-solid" width="72" height="72" />
                    </div>
                </div>
                <div className="h-full w-full border-r-[1px] col-span-1 grid grid-rows-2" id="left-right">
                    <div className="w-full relative h-full border-b-[1px] border-gray-600 flex items-center justify-center flex-col gap-2 text-center">
                        <h1 className="font-semibold text-3xl underline text-green-400">To keep it short</h1>
                        <h2 className="font-semibold text-2xl">I'm from Algeria 🧐</h2>
                        <h3 className="font-semibold text-xl">I'm a male and a self-taught developer 😎</h3>
                        <p className="font-semibold text-lg">And I suck at design 😒 and pretty much anything related to smart stuff</p>
                        <p className="font-semibold text-sm text-gray-300">I know flexbox if that helps 😗</p>
                    </div>
                    <div className="w-full relative h-full flex items-center justify-evenly">
                        <Link href={""}><Icon icon="skill-icons:github-light" width="56" height="56" /></Link>
                        <Link href={""}><Icon icon="skill-icons:gmail-dark" width="56" height="56" /></Link>
                        <Link href={""}><Icon icon="cib:upwork" width="56" height="56" /></Link>
                        <Link href={""}><Icon icon="mingcute:linkedin-line" width="56" height="56" /></Link>
                    </div>
                </div>
            </section>
        </>
    )
}