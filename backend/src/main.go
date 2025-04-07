package main

import (
	"chat_application/database"
	"chat_application/internal/users"
	"chat_application/internal/websocket"
	"chat_application/router"
	_ "fmt"
	"log"

	_ "github.com/lib/pq"
)

func main() {
	DatabaseConnetion, err := database.NewDatabaseConnection()
	if err != nil {
		log.Fatalf("could not initialize a connection to the database %s :", err)
	}

	userRepo := users.NewRepository(DatabaseConnetion.GetDatabase())
	userService := users.NewService(userRepo)
	userHandler := users.NewHandler(userService)

	// INITIATE THE WEBSOCKET
	hub := websocket.NewHub()
	websocketHandler := websocket.NewHandler(hub)

	go hub.Run()

	router.InitRouter(userHandler, websocketHandler)
	router.Start("0.0.0.0:8080")

}
