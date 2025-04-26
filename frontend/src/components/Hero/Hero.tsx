import Image from 'next/image'
import Heroimage from "../../../public/images/chat-application.webp"
export default function HeroPage(){
    return(
        <>
            <main className="h-dvh w-full relative overflow-hidden m-0 p-0 grid grid-cols-2">
                <section className="h-full w-full relative col-span-1 flex items-center justify-center">
                    <div className="h-96 w-96 fancy-border overflow-hidden">

                        <Image 
                        src={Heroimage}
                        alt='image for hero section'
                        width={450}
                        height={450} 
                            />

                    </div>
                </section>
                <section className="h-full w-full relative col-span-1 flex items-center justify-center">
                    <h1 className='text-4xl font-semibold text-pretty'>Chat with freinds with help, <br /> of the bleu <span className='text-blue-400'>mouse</span></h1>
                </section>
            </main>
        </>
    )
}