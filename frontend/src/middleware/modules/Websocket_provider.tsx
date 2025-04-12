import React, { useState, createContext, Children } from "react";


type Connection = WebSocket | null

export const WebsocketContext = createContext<{
    connection: Connection,
    setConnection: (connect: Connection) => void
}>({
    connection: null,
    setConnection: () => { }
})


const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [connection, setConnection] = useState<Connection>(null)

    return (
        <WebsocketContext.Provider

            value={{
                connection: connection,
                setConnection: setConnection
            }}
        >

            {children}

        </WebsocketContext.Provider>
    )
}


export default WebSocketProvider