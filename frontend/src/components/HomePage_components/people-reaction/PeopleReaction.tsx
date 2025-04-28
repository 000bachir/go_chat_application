import { motion } from "motion/react";
import Image from "next/image";
import HappyCouple from "../../../../public/images/happy-couple.webp";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function PeopleReaction() {
    return (
        <>
            <main className="h-auto w-full relative overflow-hidden">
                <section className="h-auto w-[95%] relative overflow-hidden mx-auto flex items-center justify-center flex-col gap-4 ">
                    <div className="h-96 w-72 rounded-2xl shadow-2xl overflow-hidden">
                        <Image src={HappyCouple} alt="happy couple" width={400} height={400} />
                    </div>
                    <div className="flex items-center justify-center fle-col gap-2 flex-col text-pretty">
                        <motion.h1 initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1 } }} className="font-semibold text-4xl">What if, instead of these fictional characters,</motion.h1>
                        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1.2 } }} className="font-semibold text-3xl">someday, maybe — just maybe,</motion.h2>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1.4 } }} className="font-semibold text-2xl">you finally go out and talk to real women?</motion.p>
                        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1.6 } }} className="font-semibold text-xl">You're less likely to find love through a messaging app — just leave it for work</motion.span>
                        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1.8 } }} className="font-semibold text-lg">or for asking a relative for money.</motion.span>
                        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 2 } }} animate={{ scale: 1.2 }} className="font-semibold text-sm text-amber-700">Not that I do it myself.</motion.span>
                    </div>

                </section>
                <section className="h-auto w-full relative pt-6">
                    <div className="h-20 w-full">
                        <h1 className="text-3xl font-semibold text-center">let's be serious for a second , am gonna show why you should choose us</h1>
                    </div>
                    <div className="h-[30rem] w-full flex items-center justify-center">
                        <div className="h-[80%] aspect-square flex items-center justify-center ">

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-green-500 text-xl">Is it accessible?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes — if you have an internet connection.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-green-500 text-xl">Is it secure?</AccordionTrigger>
                                    <AccordionContent>
                                        Don't know, honestly — the backend code is a mess.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="text-green-500 text-xl">Can I add friends?</AccordionTrigger>
                                    <AccordionContent>
                                        Sure... if you have any. But I'm too lazy to implement it for now (also, I'm dumb).
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger className="text-green-500 text-xl">Are you going to sell my data?</AccordionTrigger>
                                    <AccordionContent>
                                        Anything has a price, my friend.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-5">
                                    <AccordionTrigger className="text-green-500 text-xl">Is it like the other apps?</AccordionTrigger>
                                    <AccordionContent>
                                        Every app is like every other app.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-6">
                                    <AccordionTrigger className="text-green-500 text-xl">Can I talk to the team working on it?</AccordionTrigger>
                                    <AccordionContent>
                                        I created it alone — but if you're a girl, you're welcome to DM me on Instagram.
                                        If you're a dude, please send an email.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                            
                        </div>

                    </div>
                </section>
            </main>
        </>
    )
}