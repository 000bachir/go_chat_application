"use client"
import { API_URL, WEBSOCKET_URL } from "@/middleware/constants/main";
import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid"
import { AuthContext } from "@/middleware/modules/Auth_provider";
import { WebsocketContext } from "@/middleware/modules/Websocket_provider";
import { useRouter } from "next/navigation";


const Home = () => {
  const [rooms, setRooms] = useState<{ id: string, name: string }[]>([])
  const [roomName, setNewRoom] = useState("")
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
    getRooms()
  }, [])

  const HandlerSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    if(!roomName.trim()) return //* prevent empty room creation
    try {
      setNewRoom('')
      const response = await fetch(`${API_URL}/ws/createRoom`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          id: uuidv4(),
          name: roomName
        }),
      })
      if (response.ok) {
        getRooms()
      }
    } catch (err) {
      console.log(err)
    }
  }


  const JoinRoom = (roomId: string) => {
    const websocketConnection = new WebSocket(`${WEBSOCKET_URL}/ws/joinRoom/${roomId}?userId=${user.id}&username=${user.username}`)
    if (websocketConnection.OPEN) {
      setConnection(websocketConnection)
      router.push('/chat')
      return
    }
  }

    return (
      <>
        <div className='my-8 px-4 md:mx-32 w-full h-full'>
          <div className='flex justify-center mt-3 p-5'>
            <input
              type='text'
              className='border border-grey p-2 rounded-md focus:outline-none focus:border-blue'
              placeholder='room name'
              value={roomName}
              onChange={(e) => setNewRoom(e.target.value)}
            />
            <button
              className='bg-blue border text-black cursor-pointer rounded-md p-2 md:ml-4'
              onClick={HandlerSubmit}
            >
              create room
            </button>
          </div>
          <div className='mt-6'>
            <div className='font-bold'>Available Rooms</div>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mt-6'>
              {rooms.map((room, index) => (
                <div
                  key={index}
                  className='border border-blue p-4 flex items-center rounded-md w-full'
                >
                  <div className='w-full'>
                    <div className='text-sm'>room</div>
                    <div className='text-blue font-bold text-lg'>{room.name}</div>
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
        </div>
      </>
  )
}


export default Home