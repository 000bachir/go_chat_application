package websocket

type Room struct {
	ID      string             `json:"id"`
	Name    string             `json:"name"`
	Clients map[string]*Client `json:"clients"`
}

type Hub struct {
	Rooms      map[string]*Room
	Register   chan *Client
	Unregister chan *Client
	Broadcast  chan *Message
}

// this is a constructor
// NewHub creates and returns a new Hub instance.
// It sets up the maps and channels needed for communication.
func NewHub() *Hub {
	return &Hub{
		Rooms:      make(map[string]*Room), // Room ID -> Room
		Register:   make(chan *Client),     // New clients joining
		Unregister: make(chan *Client),     // Clients leaving
		Broadcast:  make(chan *Message, 5), // Messages to broadcast
	}
}

// Run is the main loop of the Hub. It listens for events and handles them accordingly.
func (hub *Hub) Run() {
	for {
		select {
		// Handle new client registration
		case client := <-hub.Register:
			if _, ok := hub.Rooms[client.RoomId]; ok {
				room := hub.Rooms[client.RoomId]

				if _, ok := room.Clients[client.ID]; !ok {
					room.Clients[client.ID] = client
				}
			}
			// room, exists := hub.Rooms[client.RoomId]
			// if !exists {
			// 	// If the room doesn't exist, create it
			// 	room = &Room{Clients: make(map[string]*Client)}
			// 	hub.Rooms[client.RoomId] = room
			// }

			// // Add or update the client in the room
			// room.Clients[client.ID] = client

		// Handle client unregistration (leaving the room)
		case client := <-hub.Unregister:
			if _, ok := hub.Rooms[client.RoomId]; ok {
				if _, ok := hub.Rooms[client.RoomId].Clients[client.ID]; ok {
					if len(hub.Rooms[client.RoomId].Clients) != 0 {
						hub.Broadcast <- &Message{
							Content:  "user has left the chat",
							RoomId:   client.RoomId,
							Username: client.Username,
						}
					}

					delete(hub.Rooms[client.ID].Clients, client.ID)
					close(client.Message)
				}
			}

		// Handle broadcasting messages to all clients in a room
		case message := <-hub.Broadcast:
			if _, ok := hub.Rooms[message.RoomId]; ok {
				for _, client := range hub.Rooms[message.RoomId].Clients {
					client.Message <- message
				}
			}
		}
	}
}
