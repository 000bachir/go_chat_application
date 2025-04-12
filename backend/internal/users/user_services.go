package users

import (
	"chat_application/utils"
	"context"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

// this for developeent purpose the real key is gonna be changed and added later on on build time
const secretKey string = "privateKey"

type service struct {
	Repository
	timeout time.Duration
}

func NewService(repository Repository) Service {
	return &service{
		repository,
		time.Duration(2) * time.Second,
	}
}
func (s *service) CreateNewUser(ctx context.Context, request *CreateUserRequest) (*CreateUserResponse, error) {
	ctx, cancel := context.WithTimeout(ctx, s.timeout)
	defer cancel()
	// hashing the password
	HashedPassword, err := utils.HashPassword(request.Password)
	if err != nil {
		return nil, err
	}
	// custom user struct received from the request
	user := &User{
		Username: request.Username,
		Email:    request.Email,
		Password: HashedPassword,
	}
	req, err := s.Repository.CreateNewUser(ctx, user)
	if err != nil {
		return nil, err
	}
	response := &CreateUserResponse{
		ID:       strconv.Itoa(int(req.ID)),
		Username: req.Username,
		Email:    req.Email,
	}
	return response, nil
}

type myClaims struct {
	ID       string `json:"id" db:"id"`
	Username string `json:"username" db:"username"`
	jwt.RegisteredClaims
}

func (s *service) LoginUser(ctx context.Context, request *LoginUserRequest) (*LoginUserResponse, error) {
	ctx, cancel := context.WithTimeout(ctx, s.timeout)
	defer cancel()
	userLoginRequest, err := s.Repository.GetUserByEmail(ctx, request.Email)
	if err != nil {
		return &LoginUserResponse{}, err
	}
	err = utils.CheckPassword(request.Password, userLoginRequest.Password)
	if err != nil {
		return &LoginUserResponse{}, err
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, myClaims{
		ID:       strconv.Itoa(int(userLoginRequest.ID)),
		Username: userLoginRequest.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    strconv.Itoa(int(userLoginRequest.ID)),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	})
	PrivateKey, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return &LoginUserResponse{}, err
	}
	return &LoginUserResponse{
		AccessToken: PrivateKey,
		Username:    userLoginRequest.Username,
		ID:          strconv.Itoa(int(userLoginRequest.ID)),
	}, nil
}
