import * as React from "react"
import * as motion from "motion/react-client"
import type { Variants } from "framer-motion"



export default function Intro() {


    // const cardContainer: Variants = {
    //     offscreen: {
    //         opacity : 0 ,
    //         scale : 0
    //     },
    //     onscreen: {
    //         opacity: 1,
    //         scale : 1,
    //         transition: {
    //             type: 'spring',
    //             bounce: 0.2,
    //             duration: 1
    //         }
    //     }
    // }

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
                    <div className="w-full relative h-full border-b-[1px] border-gray-600"></div>
                    <div className="w-full relative h-full"></div>
                </div>
                <div className="h-full w-full border-r-[1px] col-span-1 grid grid-rows-2" id="left-right">
                    <div className="w-full relative h-full border-b-[1px] border-gray-600"></div>
                    <div className="w-full relative h-full "></div>
                </div>
            </section>
        </>
    )
}