package database

import (
	"database/sql"
	_ "log"
	_ "os"

	_ "github.com/joho/godotenv"
)

type Database struct {
	db *sql.DB
}

// err := godotenv.Load()
//
//	if err != nil {
//		log.Println("Warning: No .env file found, using system environment variables")
//	}
//
// env variables (am not gonna use them by now but the moment i make the repo pblic i need to change those value)
// dbUser := os.Getenv("DATABASE_USERNAME")
// dbPassword := os.Getenv("DATABASE_PASSWORD")
// dbName := os.Getenv("DATABASE_NAME")
// dbPort := os.Getenv("DB_PORT")
func NewDatabaseConnection() (*Database, error) {

	db, err := sql.Open("postgres", "postgresql://admin:password@localhost:5433/go-chat-app?sslmode=disable")
	if err != nil {
		return nil, err
	}

	return &Database{db: db}, nil
}

func (database *Database) GetDatabase() *sql.DB {
	return database.db
}

func (database *Database) CloseDatabse() {
	database.db.Close()
}
