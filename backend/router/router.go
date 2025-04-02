package router

import (
	"chat_application/internal/users"

	"github.com/gin-gonic/gin"
)

var Engine *gin.Engine

func InitRouter(userhandler *users.Handler) {
	Engine = gin.Default()

	Engine.POST("/signup", userhandler.CreateNewUser)
	Engine.POST("/login", userhandler.Login)
	Engine.GET("logout", userhandler.Logout)
}

func Start(address string) error {
	return Engine.Run(address)
}
