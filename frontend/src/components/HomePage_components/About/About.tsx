import { motion } from "motion/react";
import Image from "next/image";
import chatImage from "../../../../public/images/chat-image.webp"

export default function About(){
    return(
        <>
            <main className="h-auto w-full relative">
                <section className="h-32 w-[95%] mx-auto relative flex items-center justify-center">
                    <motion.h1 
                    className="text-3xl font-semibold"
                    initial={{ opacity : 0,}} 
                    whileInView={{opacity : 1, transition:{duration : 2}}}
                    animate = {{
                        scale : 1.2 ,
                        transition : {duration : 2}
                    }} 
                    >
                        Our little blue mouse is more reliable than your local post service
                    </motion.h1>
                </section>

                <section className="h-dvh w-full relative flex items-center justify-center">
                    <div className="h-[90%] w-[95%] mx-auto bg-blue-700 rounded-2xl shadow-2xl grid grid-cols-2">
                        <div className="h-full w-full relative col-span-1 flex items-center justify-center">
                            <div className="overflow-hidden h-auto w-72  shadow-2xl rounded-2xl">
                                <Image src={chatImage} alt="simple image displaying someone waiting for a message" width={400} height={400} className="object-cover" />
                            </div>
                        </div>
                        <div className="h-full w-full relative col-span-1 flex flex-col items-center justify-center">
                            <h1 className="font-semibold text-3xl">I'll admit we are unique in a way</h1>
                            <br />
                            <h2 className="font-semibold text-2xl">We chose blue as our primary color</h2>
                            <br />
                            <p className="font-semibold text-xl">wait!! , i remember now , nevermind</p>
                            <br />
                            <span className="font-semibold text-primary-foreground">please use us, i need to put food on my family</span>
                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}