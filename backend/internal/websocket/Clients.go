package websocket

import (
	"github.com/gorilla/websocket"
)

type Client struct {
	Connection *websocket.Conn
	Message    chan *Message
}

type Message struct {
	RoomId   string `json:"roomId"`
	Username string `json:"username"`
	Content  string `json:"content"`
}
