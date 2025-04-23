"use client"
import React, { ReactNode } from "react";
import { useState } from "react";
import { API_URL } from "@/middleware/constants/main";
import { useRouter } from "next/navigation";
import { UserInfo, AuthContext } from "@/middleware/modules/Auth_provider";
import { useContext, useEffect } from "react";
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { authenticated } = useContext(AuthContext)
    const router = useRouter()
    useEffect(() => {
        console.log("Login component rendered. authenticated:", authenticated);
        if (authenticated) {
            router.push("/");
            console.log("authenticated is true, pushing to /");
            console.log("Pushed to /, returning from useEffect");
            return;
        } else {
            console.log("authenticated is false, staying on /login");
        }
    }, [authenticated]);

    const HandleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            if (response.ok) {
                const user: UserInfo = {
                    username: data.username,
                    id: data.id
                }
                // nit the best practice to let the data move arround
                localStorage.setItem('user_info', JSON.stringify(user))
                // redirect the user to the home page 
                return router.push("/")
            }

        } catch (error) {
            console.log("Error :", error)
        }

    }
    return (
        <div className="h-auto w-[95%] relative mx-auto overflow-hidden ">
            <section className="h-dvh bg-background w-full relative overflow-hidden flex flex-col items-center justify-center gap-4">
                <h1 className="text-3xl font-bold ">Welcome please login dear user</h1>
                <form action="" className=" h-full w-full relative flex items-center justify-center flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Email"
                        className="p-2 mt-4 rounded-2xl border-[1px] border-gray-900 flex items-center justify-start w-[80%]" required
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        onSubmit={HandleSubmit}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="p-2 mt-4 rounded-2xl border-[1px] border-gray-900 flex items-center justify-start w-[80%]"
                        required
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="cursor-pointer bg-blue-500 p-4 rounded-2xl shadow-2xl text-2xl font-semibold text-white">
                        Login
                    </button>
                </form>
            </section>
        </div>
    )
}
export default Login