package websocket

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type Handler struct {
	hub *Hub
}

func NewHandler(handler *Hub) *Handler {
	return &Handler{
		hub: handler,
	}
}

func (handler *Handler) CreateNewRoom(context *gin.Context) {
	var request CreateRoomRequest

	if err := context.ShouldBindJSON(&request); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	handler.hub.Rooms[request.ID] = &Room{
		ID:      request.ID,
		Name:    request.Name,
		Clients: make(map[string]*Client),
	}

	context.JSON(http.StatusOK, request)
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(request *http.Request) bool {
		return true
	},
}

func (handler *Handler) JoinRoom(context *gin.Context) {
	connection, err := upgrader.Upgrade(context.Writer, context.Request, nil)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	roomId := context.Param("roomId")
	clientId := context.Query("userId")
	username := context.Query("username")

	client := &Client{
		Connection: connection,
		Message:    make(chan *Message, 10),
		ID:         clientId,
		Username:   username,
		RoomId:     roomId,
	}

	message := &Message{
		Content:  "a new user has joined the room ",
		RoomId:   roomId,
		Username: username,
	}

	// register a client throught the register chanel
	handler.hub.Register <- client
	// broadcast the new message
	handler.hub.Broadcast <- message

	go client.WriteMessage()
	client.ReadMessage(handler.hub)

}

func (handler *Handler) GetRooms(context *gin.Context) {

	rooms := make([]RoomsRequestResponse, 0)
	for _, room := range handler.hub.Rooms {
		rooms = append(rooms, RoomsRequestResponse{
			ID:   room.ID,
			Name: room.Name,
		})
	}
	context.JSON(http.StatusOK, rooms)

}
func (handler *Handler) GetClientsInRoom(context *gin.Context) {
	var clients []ClientResponse
	roomId := context.Param("roomId")
	if _, ok := handler.hub.Rooms[roomId]; !ok {
		clients = make([]ClientResponse, 0)
		context.JSON(http.StatusOK, clients)
	}

	for _, client := range handler.hub.Rooms[roomId].Clients {
		clients = append(clients, ClientResponse{
			ID:       client.ID,
			Username: client.Username,
		})
	}

	context.JSON(http.StatusOK, clients)
}
