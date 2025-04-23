"use client"
import { useRef , useState , useActionState  ,useEffect, useContext } from "react";
import { WebsocketContext } from "@/middleware/modules/Websocket_provider";
import { useRouter } from "next/navigation";
import { API_URL } from "@/middleware/constants/main";
import { AuthContext } from "@/middleware/modules/Auth_provider";
import autosize from "autosize"
import ChatBody from "@/components/chat_body";



export type Message = {
  content : string
  client_id : string
  username : string
  room_id : string
  type : 'receiver' | 'self'
}
export default function ChatPage() {

  
  const [messages , setMessage] = useState<Array<Message>>([])
  const textArea = useRef<HTMLTextAreaElement>(null)
  const { connection } = useContext(WebsocketContext)
  const [users , setUsers] = useState<Array<{username : string}>>([])
  const { user } = useContext(AuthContext)
  const router = useRouter()


  useEffect(()=>{
    if(connection === null){
      router.push('/')
      return 
    }

    const roomId = connection.url.split('/')[5]

    async function getUsers(){
      try{
        const response = await fetch(`${API_URL}/ws/getClients/${roomId}`,{
          method : 'GET',
          headers : {'Content-Type':'application/json' }
        })

        const data = await response.json()

        setUsers(data)


      }catch(err){
        console.log(err)
      }
    }
    getUsers()
  } , [])

  useEffect(()=>{
    if(textArea.current){
      autosize(textArea.current)
    }

    if(connection === null){
      router.push('/')
      return
    }

    connection.onmessage = (message)=> {
      const msg : Message = JSON.parse(message.data)
      if(msg.content == 'A new user has joined the room'){
        setUsers([...users , {username : msg.username}])
      }

      if(msg.content == 'the user has left the chat'){
        const deleteUser = users.filter((user)=> user.username != msg.username)
        setUsers([...deleteUser])
        setMessage([...messages , msg])
        return
      }

      user?.username == msg.username ? (msg.type = 'self') : (msg.type = 'receiver')
      setMessage([...messages , msg])
    }

    connection.onclose = () => {}
    connection.onerror = () => {}
    connection.onopen = () => {}
  
  },[textArea  , messages , users , connection])

  const sendMessage = () => {
    if(!textArea.current?.value) return
    if(connection === null){
      router.push('/')
      return
    }

    connection.send(textArea.current.value)
    textArea.current.value = ''

  }

  return (
    <div className='flex flex-col w-full'>
        <div className='p-4 md:mx-6 mb-14'>
          <ChatBody data={messages} />
        </div>
        <div className='fixed bottom-0 mt-4 w-full'>
          <div className='flex md:flex-row px-4 py-2 bg-grey md:mx-4 rounded-md'>
            <div className='flex w-full mr-4 rounded-md border border-blue'>
              <textarea
                ref={textArea}
                placeholder='type your message here'
                className='w-full h-10 p-2 rounded-md focus:outline-none'
                style={{ resize: 'none' }}
              />
            </div>
            <div className='flex items-center'>
              <button
                className='p-2 rounded-md bg-blue-500 cursor-pointer text-black'
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
  