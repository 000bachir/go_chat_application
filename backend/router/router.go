package router

import (
	"chat_application/internal/users"
	"chat_application/internal/websocket"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var Engine *gin.Engine

func InitRouter(userhandler *users.Handler, websocketHandler *websocket.Handler) {
	Engine = gin.Default()

	Engine.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Content-Type"},
		ExposeHeaders:    []string{"Content-length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "http://localhost:3000"
		},
		MaxAge: 12 * time.Hour,
	}))

	Engine.POST("/signup", userhandler.CreateNewUser)
	Engine.POST("/login", userhandler.Login)
	Engine.GET("/logout", userhandler.Logout)

	Engine.POST("/ws/createRoom", websocketHandler.CreateNewRoom)
	Engine.GET("/ws/joinRoom/:roomId", websocketHandler.JoinRoom)
	Engine.GET("/ws/getRooms", websocketHandler.GetRooms)
	Engine.GET("/ws/getClients/:roomId", websocketHandler.GetClientsInRoom)
}

func Start(address string) error {
	return Engine.Run(address)
}
