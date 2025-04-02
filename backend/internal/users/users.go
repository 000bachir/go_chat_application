package users

import "context"

type User struct {
	ID       int64  `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type CreateUserRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
type CreateUserResponse struct {
	ID       string `json:"id"`
	Username string `json:"username" `
	Email    string `json:"email"`
}

type LoginUserRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
type LoginUserResponse struct {
	// not to be returned to the user
	accessToken string
	ID          string `json:"id" `
	Username    string `json:"username"`
}

// interfaces declarations

type Repository interface {
	CreateNewUser(ctx context.Context, user *User) (*User, error)
	GetUserByEmail(ctx context.Context, email string) (*User, error)
}

type Service interface {
	CreateNewUser(ctx context.Context, request *CreateUserRequest) (*CreateUserResponse, error)
	LoginUser(ctx context.Context, request *LoginUserRequest) (*LoginUserResponse, error)
}
