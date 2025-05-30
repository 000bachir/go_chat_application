package users

import (
	"context"
	"database/sql"
)

type DBTX interface {
	ExecContext(ctx context.Context, query string, args ...interface{}) (sql.Result, error)
	PrepareContext(context.Context, string) (*sql.Stmt, error)
	QueryContext(context.Context, string, ...interface{}) (*sql.Rows, error)
	QueryRowContext(context.Context, string, ...interface{}) *sql.Row
}

type repository struct {
	db DBTX
}

func NewRepository(db DBTX) Repository {
	return &repository{db: db}
}

func (r *repository) CreateUser(ctx context.Context, user *User) (*User, error) {
	var lastInsertedId int
	query := "INSERT INTO users(username, password, email) VALUES ($1, $2, $3) returning id"
	err := r.db.QueryRowContext(ctx, query, user.Username, user.Password, user.Email).Scan(&lastInsertedId)
	if err != nil {
		return &User{}, err
	}
	user.ID = int64(lastInsertedId)
	return user, nil

}

// where th login error was happening all along
func (r *repository) GetUserByEmail(ctx context.Context, email string) (*User, error) {
	// empty user struct init
	user := User{}
	query := "SELECT id, email, username, password FROM users WHERE email = $1"
	err := r.db.QueryRowContext(ctx, query, email).Scan(&user.ID, &user.Email, &user.Username, &user.Password)

	//! this is the old version i was returning an empty struct of the User that has an empty string as password and that is why bycrypt couldn't procced
	/*
		if err != nil {
			return &User{} , nil
		}
	*/

	if err != nil {
		return nil, err
	}

	return &user, nil
}
