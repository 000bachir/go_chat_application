import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"
export default function Redirection(){
    return(
        <>
            <main className="h-auto w-full relative overflow-hidden m-0">
                <section className="h-32 w-full flex items-center justify-center">
                    <h1 className="text-3xl font-semibold">
                        Alright, back to business. Sign up or log in if you already have an account.
                    </h1>
                </section>
                <section className="h-[30rem] w-full flex items-center justify-center">
                    <div className="flex items-center justify-center h-80 aspect-square">
                        <Link href="/signup">                        
                            <Icon icon="game-icons:captain-hat-profile" width="120" height="120" />
                            <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
                        </Link>
                    </div>
                    <div className="flex items-center justify-center h-80 aspect-square">
                        <Link href="/Login">                        
                            <Icon icon="material-icon-theme:lock" width="120" height="120" />
                            <h1 className="text-2xl font-semibold text-center">Log in</h1>
                        </Link>
                    </div>
                </section>
            </main>
        </>
    )
}