"use client"
import { Button } from "@/components/ui/button"
import Signup from "../../../public/signup.svg"
import Image from "next/image"
import Link from "next/link"
import React, { useState, useContext, useEffect } from "react"
import { AuthContext } from "@/middleware/modules/Auth_provider"
import { useRouter } from "next/navigation"
import { API_URL } from "@/middleware/constants/main"


interface userSignUpInfo {
    email: string
    password: string
    username: string
}


export default function SignupPage() {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");

    const [Loading, setIsLoading] = useState(false)

    const router = useRouter()
    const { authenticated } = useContext(AuthContext)
    useEffect(() => {
        if (authenticated) {
            router.push('/rooms')
            return
        }
    }, [authenticated, router])

    function ValidatePassword() {
        if (password !== confirmPassword) {
            setError("password do not match")
            return false
        }

        if (password.length < 8) {
            setError("password must be at least 8 characters")
            return false
        }

    }


    async function HandleSubmit(event: React.FormEvent) {
        event.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    username
                })
            })

            const data = await response.json()

            if (response.ok) {
                let user: userSignUpInfo = {
                    email: data.email,
                    password: data.password,
                    username: data.username
                }
                // Store user info in localStorage
                localStorage.setItem('user_info', JSON.stringify(user));
                router.push("/rooms");
            } else {
                setError(data.message || "Registration failed. Please try again.");

            }

        } catch (err) {
            console.error("Error during registration:", error);
            setError("Connection error. Please try again later.");
        } finally {
            setIsLoading(false)
        }


    }

    return (
        <main className="h-auto w-full relative overflow-hidden m-0">
            <section className="h-dvh w-full grid grid-cols-2">
                <div className="h-full w-full col-span-1 flex items-center justify-center">
                    <Image src={Signup} alt="sign up logo" width={200} height={200} />
                </div>
                <div className="h-full w-full col-span-1 flex items-center justify-center">
                    <form onSubmit={HandleSubmit} method="POST" className="w-full h-auto flex gap-6 flex-col ">
                        <div className="h-auto w-full flex flex-col items-start justify-start gap-2">
                            <label htmlFor="Email">Email</label>
                            <input
                                type="text"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-[1px] border-blue-600 py-4 px-2 text-lg font-semibold rounded-2xl shadow-2xl w-[80%]" />
                        </div>
                        <div className="h-auto w-full flex flex-col items-start justify-start gap-2">
                            <label htmlFor="Username">Username</label>
                            <input type="text" onChange={(e) => setUsername(e.target.value)}
                                value={username} placeholder="username" required className="border-[1px] border-blue-600 py-4 px-2 text-lg font-semibold rounded-2xl shadow-2xl w-[80%]" />
                        </div>

                        <div className="h-auto w-full flex flex-col items-start justify-start gap-2">
                            <label htmlFor="Password">Password</label>
                            <input type="password" minLength={8} value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" required className="border-[1px] border-blue-600 py-4 px-2 text-lg font-semibold rounded-2xl shadow-2xl w-[80%]" />
                        </div>
                        <div className="flex items-center justify-center gap-6 w-[80%]">
                            <Button type="submit" size={"lg"} variant={"destructive"}>
                                {Loading ? 'creating account..' : 'Create account'}
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