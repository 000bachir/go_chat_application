package utils

//important note : te bycrypt still shows an error to be fixed the error is that the password does not match the one stored i nthe database need to fix it the problem is inn the login endpoint

import (
	_ "crypto/rand"
	"fmt"
	"log"

	_ "golang.org/x/crypto/argon2"

	"golang.org/x/crypto/bcrypt"
)

func HashingPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal(err)
		return "", fmt.Errorf("error failed to hash the password %w", err)
	}
	return string(bytes), nil
}

func CheckPassword(password string, hashedPassword string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		fmt.Println("Invalid password")
	} else {
		fmt.Println("Password matched!")
	}
	return err
}
