"use client"
import React, { ReactNode } from "react";
import { useState } from "react";
import { API_URL } from "@/middleware/constants/main";
import { useRouter } from "next/navigation";
import { UserInfo, AuthContext } from "@/middleware/modules/Auth_provider";
import { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";




const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading , setIsLoading] = useState(false)
    const [error , setError] = useState("")
    const { authenticated } = useContext(AuthContext)
    const router = useRouter()



    useEffect(() => {
        console.log("Login component rendered. authenticated:", authenticated);
        if (authenticated) {
            router.push("/rooms");
            console.log("authenticated is true, pushing to /rooms");
            console.log("Pushed to /, returning from useEffect");
            return;
        } else {
            console.log("authenticated is false, staying on /login");
        }
    }, [authenticated , router]);

    const HandleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setError("")
        setIsLoading(true)
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()
            if (response.ok) {
                const user: UserInfo = {
                    username: data.username,
                    id: data.id
                }
                // Store user info in localStorage
                localStorage.setItem('user_info', JSON.stringify(user))

                // redirect the user to the home page 
                return router.push("/rooms")
            }else {
                setError(data.message || "Login failed. Please check your credentials.");
            }

        } catch (error) {
            console.log("Error during login :", error)
            setError("connection error , please try again")
        }finally{
            setIsLoading(false)
        }

    }
    return (
        <div className="h-auto w-[95%] relative mx-auto overflow-hidden ">
            <section className="h-dvh bg-background w-full relative overflow-hidden flex flex-col items-center justify-center gap-4">
                <h1 className="text-3xl font-bold ">Welcome please login dear user</h1>
                <form method="POST" onSubmit={HandleSubmit}  className=" h-full w-full relative flex items-center justify-center flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Email"
                        className="p-2 mt-4 rounded-2xl border-[1px] border-gray-900 flex items-center justify-start w-[80%]" required
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="p-2 mt-4 rounded-2xl border-[1px] border-gray-900 flex items-center justify-start w-[80%]"
                        required
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant={"destructive"} size={"lg"} disabled={loading} >
                        {loading ? 'signing in...' : 'Login'}
                    </Button>
                </form>
            </section>
        </div>
    )
}
export default Login