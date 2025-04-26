import { motion } from "motion/react"

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
                    <div className="h-[90%] w-[95%] mx-auto  bg-blue-700 rounded-2xl shadow-2xl"></div>
                </section>

            </main>
        </>
    )
}