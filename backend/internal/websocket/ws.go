package websocket

// this file will cotain the strcts needed for the room creation

type CreateRoomRequest struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// when a user request for rooms
type RoomsRequestResponse struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}
type ClientResponse struct {
	ID       string `json:"id"`
	Username string `json:"username"`
}
