package websocket

import (
	"log"

	"github.com/gorilla/websocket"
)

type Message struct {
	RoomId   string `json:"roomId"`
	Username string `json:"username"`
	Content  string `json:"content"`
}

type Client struct {
	Connection *websocket.Conn
	Message    chan *Message
	ID         string `json:"id"`
	Username   string `json:"username"`
	RoomId     string `json:"roomId"`
}

func (client *Client) WriteMessage() {
	defer func() {
		client.Connection.Close()
	}()

	for {
		message, ok := <-client.Message
		if !ok {
			return
		}

		client.Connection.WriteJSON(message)
	}
}

func (client *Client) ReadMessage(hub *Hub) {
	defer func() {
		hub.Unregister <- client
		client.Connection.Close()
	}()

	for {
		_, message, err := client.Connection.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		msg := &Message{
			Content:  string(message),
			Username: client.Username,
			RoomId:   client.RoomId,
		}

		hub.Broadcast <- msg
	}

}
