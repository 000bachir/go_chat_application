package main

import (
	"chat_application/database"
	"chat_application/internal/users"
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

	router.InitRouter(userHandler)
	router.Start("0.0.0.0:8080")

}
