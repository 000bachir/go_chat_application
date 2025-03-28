package main

import (
	"chat_application/database"
	_ "fmt"
	"log"

	_ "github.com/lib/pq"
)

func main() {
	_, err := database.NewDatabaseConnection()
	if err != nil {
		log.Fatalf("could not initialize a connection to the database %s :", err)
	}
}
