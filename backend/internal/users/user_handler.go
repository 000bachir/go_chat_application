package users

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	Service
}

// NewHandler initializes a new Handler instance with the provided Service.
// It returns a pointer to the newly created Handler.
func NewHandler(s Service) *Handler {
	return &Handler{
		Service: s, // Assigns the provided service to the Handler struct.
	}
}

// CreateNewUser handles the creation of a new user.
// It binds the incoming JSON request to a CreateUserRequest struct,
// calls the service layer to create a user, and returns the response.
func (handle *Handler) CreateNewUser(context *gin.Context) {
	var userRequest CreateUserRequest

	// Bind the incoming JSON request body to the userRequest struct.
	err := context.ShouldBindJSON(&userRequest)
	if err != nil {
		// If binding fails, return a 400 Bad Request response with the error message.
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Call the service layer to create a new user.
	response, err := handle.Service.CreateUser(context.Request.Context(), &userRequest)
	if err != nil {
		// If an error occurs while creating the user, return a 500 Internal Server Error response.
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Added return to prevent sending multiple responses.
	}

	// If successful, return a 200 OK response with the newly created user data.
	context.JSON(http.StatusOK, response)
}

func (h *Handler) Login(c *gin.Context) {
	var user LoginUserRequest
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u, err := h.Service.Login(c.Request.Context(), &user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.SetCookie("jwt", u.AccessToken, 60*60*24, "/", "localhost", false, true)
	c.JSON(http.StatusOK, u)
}

func (h *Handler) Logout(ctx *gin.Context) {
	ctx.SetCookie("jwt", "", -1, "", "", false, true)
	ctx.JSON(http.StatusOK, gin.H{"message": "logout successful"})
}
