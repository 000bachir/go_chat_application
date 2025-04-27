import Signup from "../../../public/signup.svg"
import Image from "next/image"
export default function SignupPage(){

    return (
        <main className="h-auto w-full relative overflow-hidden m-0">
            <section className="h-dvh w-full grid grid-cols-2">
                <div className="h-full w-full col-span-1 flex items-center justify-center">
                    <Image src={Signup} alt="sign up logo" width={200} height={200} />
                </div>
                <div className="h-full w-full col-span-1">
                    
                </div>
            </section>
        </main>
    )
}