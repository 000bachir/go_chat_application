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
	response, err := handle.Service.CreateNewUser(context.Request.Context(), &userRequest)
	if err != nil {
		// If an error occurs while creating the user, return a 500 Internal Server Error response.
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return // Added return to prevent sending multiple responses.
	}

	// If successful, return a 200 OK response with the newly created user data.
	context.JSON(http.StatusOK, response)
}

// func (h *Handler) Login(ctx *gin.Context) {
// 	var reqUser LoginUserRequest

// 	// Bind JSON to request struct
// 	if err := ctx.ShouldBindJSON(&reqUser); err != nil {
// 		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// Authenticate user via service layer
// 	userResponse, err := h.Service.LoginUser(ctx.Request.Context(), &reqUser)
// 	if err != nil {
// 		// If login fails, use 401 if it's about bad credentials
// 		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// Set JWT as a cookie (24h, for localhost, httpOnly)
// 	ctx.SetCookie("jwt", userResponse.AccessToken, 60*60*24, "/", "localhost", false, true)

//		// Return the response struct (make sure it doesn't contain sensitive info)
//		ctx.JSON(http.StatusOK, userResponse)
//	}
func (h *Handler) Login(c *gin.Context) {
	var user LoginUserRequest
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	u, err := h.Service.LoginUser(c.Request.Context(), &user)
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
