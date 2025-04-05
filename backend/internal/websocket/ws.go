package websocket

// this file will cotain the strcts needed for the room creation

type CreateRoomRequest struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}
