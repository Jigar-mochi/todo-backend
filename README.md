# User API Documentation

## Overview
This API provides functionality for user authentication and management, including user registration, login, and fetching the current authenticated user.

## Base URL
`/api/users`

---

## Endpoints

### 1. `GET /currentUser`
**Description**: Fetches the currently authenticated user's details.

**Headers**:
- `Authorization`: Bearer token (required)

**Response**:
- **200 OK**:
  ```json
  {
    "userName": "johndoe",
    "email": "johndoe@example.com",
    "id": "64a9a8e2c84a1a9e9f3b7c19"
  }
  ```
- **401 Unauthorized**:
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

### 2. `POST /register`
**Description**: Registers a new user.

**Request Body**:
```json
{
  "fullName": "John Doe",
  "userName": "johndoe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response**:
- **201 Created**:
  ```json
  {
    "success": true,
    "message": "User registered successfully"
  }
  ```
- **400 Bad Request**:
  ```json
  {
    "success": false,
    "message": "User already registered."
  }
  ```
  or
  ```json
  {
    "success": false,
    "errors": [
      "Email is required",
      "Password must be at least 8 characters"
    ]
  }
  ```

---

### 3. `POST /login`
**Description**: Authenticates a user and provides an access token.

**Request Body**:
```json
{
  "userName": "johndoe",
  "password": "password123"
}
```

**Response**:
- **200 OK**:
  ```json
  {
    "success": true,
    "message": "User logged in successfully.",
    "data": {
      "authToken": "eyJhbGciOiJIUzI1NiIsInR5..."
    }
  }
  ```
- **400 Bad Request**:
  ```json
  {
    "success": false,
    "message": "Email or password is wrong"
  }
  ```
  or
  ```json
  {
    "success": false,
    "message": "Required data is missing."
  }
  ```

---

## Middleware

### `validateTokenHandler`
- Verifies the validity of the JWT token provided in the `Authorization` header.
- If the token is invalid or absent, the server responds with `401 Unauthorized`.

---

## Models

### User Schema (`authSchema`)
| Field      | Type   | Required | Description                  |
|------------|--------|----------|------------------------------|
| `fullName` | String | Yes      | Full name of the user.       |
| `userName` | String | Yes      | Unique username for the user.|
| `email`    | String | Yes      | Unique email of the user.    |
| `password` | String | Yes      | Hashed password of the user. |
