package middleware

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func AuthRequired(c *gin.Context) {
	session := sessions.Default(c)
	userID := session.Get("user_id")
	if userID == nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error":   "пользователь не авторизован",
			"message": "Вы должны быть авторизованы для доступа к этому ресурсу",
		})
		c.Abort()
		return
	}

	c.Set("user_id", userID)
	c.Next()
}
