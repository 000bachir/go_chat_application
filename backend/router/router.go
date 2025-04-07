package router

import (
	"chat_application/internal/users"
	"chat_application/internal/websocket"

	"github.com/gin-gonic/gin"
)

var Engine *gin.Engine

func InitRouter(userhandler *users.Handler, websocketHandler *websocket.Handler) {
	Engine = gin.Default()

	Engine.POST("/signup", userhandler.CreateNewUser)
	Engine.POST("/login", userhandler.Login)
	Engine.GET("/logout", userhandler.Logout)

	Engine.POST("/ws/createRoom", websocketHandler.CreateNewRoom)
	Engine.GET("/ws/joinRoom/:roomId", websocketHandler.JoinRoom)
}

func Start(address string) error {
	return Engine.Run(address)
}
