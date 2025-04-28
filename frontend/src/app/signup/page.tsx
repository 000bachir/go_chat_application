import { Button } from "@/components/ui/button"
import Signup from "../../../public/signup.svg"
import Image from "next/image"
import Link from "next/link"
export default function SignupPage(){

    return (
        <main className="h-auto w-full relative overflow-hidden m-0">
            <section className="h-dvh w-full grid grid-cols-2">
                <div className="h-full w-full col-span-1 flex items-center justify-center">
                    <Image src={Signup} alt="sign up logo" width={200} height={200} />
                </div>
                <div className="h-full w-full col-span-1 flex items-center justify-center">
                    <form action="" method="POST" className="w-full h-auto flex gap-6 flex-col ">
                        <div className="h-auto w-full flex flex-col items-start justify-start gap-2">
                            <label htmlFor="Email">Email</label>
                            <input type="text" placeholder="Email" required className="border-[1px] border-blue-600 py-4 px-2 text-lg font-semibold rounded-2xl shadow-2xl w-[80%]" />
                        </div>

                        <div className="h-auto w-full flex flex-col items-start justify-start gap-2">
                            <label htmlFor="Password">Password</label>
                            <input type="password" placeholder="Password" required className="border-[1px] border-blue-600 py-4 px-2 text-lg font-semibold rounded-2xl shadow-2xl w-[80%]" />
                        </div>
                        <div className="flex items-center justify-center gap-6 w-[80%]">
                            <Button type="submit" size={"lg"} variant={"destructive"}>
                                Sign up
                            </Button>
                            <Button type="submit" size={"lg"} variant={"destructive"}>
                                <Link href={"/Login"}>Login</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}