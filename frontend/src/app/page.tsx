"use client"


import { API_URL , WS_URL } from "@/middleware/constants/main";
import React, { useEffect, useState , useContext } from "react";
import {v4 as uuidv4} from "uuid"
import { AuthContext } from "@/middleware/modules/Auth_provider";
import WebSocketProvider from "@/middleware/modules/Websocket_provider";
import { WebsocketContext } from "@/middleware/modules/Websocket_provider";
import { useRouter } from "next/navigation";


const Home = () => {
  const [rooms , setRooms] = useState<{id : string , name : string}[]>([])

  const [newRoom , setNewRoom] = useState("")

  const { user } = useContext(AuthContext)

  const {setConnection} = useContext(WebsocketContext)

  const router = useRouter()

  const getRooms = async() => {
    try{
      const response = await fetch(`${API_URL}/ws/getRooms`,{
        method : 'GET'
      })

      const data = await response.json()
      if(response.ok){
        setRooms(data)
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getRooms()
  })

  const HandlerSubmit = async (event : React.SyntheticEvent) => {
    event.preventDefault()
    try{
      setNewRoom('')
      const response = await fetch(`${API_URL}/ws/createNewRoom` , {
        method : 'POST',
        headers : { 'Content-range' : 'application/json'} , 
        credentials : 'include',
        body : JSON.stringify({
          id : uuidv4(),
          name : newRoom
        }),
      })
      if(response.ok){
        getRooms()
      }
    }catch(err){ 
      console.log(err)
    }
  }


  const JoinRoom = (roomId : string) => {
    const websocketConnection = new WebSocket(`${WS_URL}/ws/joinRoom/${roomId}?userId=${user.id}username=${user.username}`)
    if(websocketConnection.OPEN){
      setConnection(websocketConnection)
      router.push('/chat')
      return
    }
  }

  return(
    <main className="h-auto w-[95%] mx-auto relative overflow-hiddeb">
      <article className="h-dvh w-full relative overflow-hidden">
        <section className="h-full w-full relative flex items-center justify-center">
          <input value={newRoom} onChange={(e)=> e.target.value} type="text" placeholder="room title" required className="p-4 w-80 rounded-2xl border border-black shadow-2xl" />
          <button className="p-4 w-40 rounded-2xl bg-amber-500 text-xl text-white" onClick={HandlerSubmit}>
            Create Room
          </button>
        </section>
      </article>
      <article className="h-dvh w-full relative overflow-hidden">

        <section className="h-full w-[95%] mx-auto relative flex items-center justify-center flex-col gap-4">
          <h1 className="text-3xl text-center text-blue-500">rooms that are available</h1>
          {rooms.map((room : any , index : number)=>(
            <div key={index} className="h-32 w-72 border border-blue-500 flex items-center justify-center gap-4">
              <h1>
                {room.name}
              </h1>
              <button type="submit" className="bg-red-500 text-white text-lg p-4 cursor-pointer" onClick={()=> JoinRoom(room.id)}>
                  Enter Room
              </button>
            </div>
          ))}
        </section>

      </article>
    </main>
  )
}


export default Home