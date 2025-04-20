package utils

import (
	"fmt"
	"testing"

	"golang.org/x/crypto/bcrypt"
)

// HashPassword takes a plain password and returns a bcrypt hash
func HashedPassword(password string) (string, error) {
	// Hash password with bcrypt
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

// ComparePassword compares a plain password with a bcrypt hashed password
func ComparePassword(hashedPassword, plainPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plainPassword))
}

func Try(test *testing.T) {
	plainPassword := "password"
	hashedPassword, err := HashPassword(plainPassword)
	if err != nil {
		test.Fatalf("error hashing the password %v", err)

	}

	err = ComparePassword(hashedPassword, plainPassword)
	if err != nil {
		test.Fatalf("password comparison failed %v", err)

	} else {
		fmt.Println("password verified correctly")
	}

	incorrectPassword := "wrongPassword"
	err = ComparePassword(hashedPassword, incorrectPassword)
	if err == nil {
		test.Fatalf("password comparison should have failed for incorrect password")
	}

}
