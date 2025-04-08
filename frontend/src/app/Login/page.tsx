import React, { ReactNode } from "react";
import { useState } from "react";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    return (
        <div className="h-auto w-[95%] relative mx-auto overflow-hidden ">
            <section className="h-dvh bg-background w-full relative overflow-hidden flex flex-col items-center justify-center gap-4">
                <h1 className="text-3xl font-bold ">Welcome please login dear user</h1>
                <form action="" className=" h-full w-full relative flex items-center justify-center flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Email"
                        className="p-2 mt-4 rounded-2xl border-[1px] border-gray-900 flex items-center justify-start w-[80%]" required />
                        value={email}
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}

                    <input
                        type="password" placeholder="Password" className="p-2 mt-4 rounded-2xl border-[1px] border-gray-900 flex items-center justify-start w-[80%]" required />
                    <button type="submit" className="bg-blue-500 p-4 rounded-2xl shadow-2xl text-2xl font-semibold text-white">
                        Login
                    </button>
                </form>
            </section>
        </div>
    )
}


export default Login