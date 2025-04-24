"use client"
import { useState, createContext } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export type UserInfo = {username: string,id: string}
export const AuthContext = createContext<
    {
        authenticated: boolean,
        setAuthenticated: (auth: boolean) => void,
        user: UserInfo
        setUser: (user: UserInfo) => void
    }
>({
    authenticated: false,
    setAuthenticated: () => { },
    user: {
        username: "",
        id: ""
    },
    setUser: () => { }
})
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState<UserInfo>({ username: "", id: "" })
    const router = useRouter()

    useEffect(() => {
        try{
            const userInfo = localStorage.getItem("user_info")
            if (!userInfo) {
                if (window.location.pathname !== "/signup") {
                    router.push("/Login")
                    return
                }
            } else {
                const parsedUser: UserInfo = JSON.parse(userInfo)
                if (parsedUser && parsedUser.username && parsedUser.id) {
                    setUser(parsedUser)                    
                    setAuthenticated(true)
                }
            }
        }catch(err){
            console.error("Error parsing user_info from localStorage", err);
            localStorage.removeItem("user_info"); // reset broken data
        }

    }, [])  // run only on mount
    return (
        <AuthContext.Provider
            value={
                {
                    authenticated,
                    setAuthenticated,
                    user,
                    setUser,
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider