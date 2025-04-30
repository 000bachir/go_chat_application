"use client"
import * as React from "react"
import { useEffect, useContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { AuthContext } from "@/middleware/modules/Auth_provider"
import { WebsocketContext } from "@/middleware/modules/Websocket_provider"
import { useRouter } from "next/navigation"
import { API_URL, WEBSOCKET_URL } from "@/middleware/constants/main"
import { Button } from "@/components/ui/button"

export default function Rooms() {

    const [rooms, setRooms] = useState<{ id: string, username: string }[]>([])
    const [roomName, setRoomName] = useState("")
    const { user } = useContext(AuthContext)
    const { setConnection } = useContext(WebsocketContext)
    const router = useRouter()


    const getRooms = async () => {
        try {
            const response = await fetch(`${API_URL}/ws/getRooms`, {
                method: 'GET'
            })

            const data = await response.json()
            if (response.ok) {
                setRooms(data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getRooms
    }, [])

    async function HandleSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        if (!roomName.trim()) return

        try {
            setRoomName('')
            const response = await fetch(`${API_URL}/ws/createRoom`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
                body: JSON.stringify({
                    id: uuidv4(),
                    name: roomName
                })
            })
            if (response.ok) {
                getRooms()
            }

        } catch (err) {
            console.log("error: ", err)
        }
    }


    function JoinRoom(roomId: string) {
        let WsConnection = new WebSocket(`${WEBSOCKET_URL}/ws/joinRoom/${roomId}?userId=${user.id}&username=${user.username}`)
        if (WsConnection.OPEN) {
            setConnection(WsConnection)
            router.push('/chat')
            return
        }
    }


    return (
        <>
            <main className='h-auto w-full relative overflow-hidden m-0'>
                <section className="h-48 w-[95%] mx-auto flex items-center justify-center flex-col gap-6">
                    <h1 className="text-4xl font-semibold text-purple-600">Enter a room name so it can be created</h1>
                    <input
                        type="text"
                        required
                        className="py-3 px-5 border-[1px] border-blue-400 rounded-3xl shadow-2xl focus:bg-white focus:text-black hover:border-red-800 transition-all"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    />

                    <Button type="submit" variant={"secondary"} size={"lg"} onClick={HandleSubmit} >Create room</Button>
                </section>
                <section className="h-dvh w-full ">
                    <div className='mt-6'>
                        <h1 className='font-bold text-center text-2xl text-purple-600'>Available Rooms</h1>
                        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mt-6'>
                            {rooms.map((room, index) => (
                                <div
                                    key={index}
                                    className='border border-blue p-4 flex items-center rounded-md w-full'
                                >
                                    <div className='w-full'>
                                        <div className='text-sm'>room</div>
                                        <div className='text-blue font-bold text-lg'>{room.username}</div>
                                    </div>
                                    <div className=''>
                                        <button
                                            className='px-4 text-black cursor-pointer bg-blue rounded-md'
                                            onClick={() => JoinRoom(room.id)}
                                        >
                                            join
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </section>
            </main>
        </>
    )
}