# JobTrackr API

A RESTful API built using Node.js and Express.js to manage and track job applications. This project demonstrates CRUD operations, middleware, request validation, centralized error handling, and Node.js event loop behavior.

## 1. Project Overview

JobTrackr API helps users manage their job applications by storing information such as:

- Company name
- Job role
- Application status
- Location
- Application date

The application currently uses an in-memory JavaScript array for data storage instead of a database.

**Note:** Since the data is stored in memory, all changes are lost when the server restarts.

## 2. Features

- Retrieve all job applications.
- Filter applications by status.
- Search applications by company name.
- Retrieve a specific application using its ID.
- Create a new job application.
- Update existing application details.
- Delete a job application.
- Validate incoming request data.
- Handle errors using centralized error-handling middleware.
- Log incoming HTTP requests.
- Demonstrate non-blocking and blocking operations.
- Test APIs using Postman.

## 3. Technologies Used

- Node.js
- Express.js
- JavaScript (ES Modules)
- CORS
- dotenv
- Postman
- Git and GitHub

## 4. Project Structure

```text
job_tracker/
│
├── postman/
│   └── JobTracker.postman_collection.json
│
├── src/
│   ├── controllers/
│   │   └── applicationControllers.js
│   │
│   ├── data/
│   │   └── application.js
│   │
│   ├── Error/
│   │   └── ApiError.js
│   │
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── notFound.js
│   │   ├── requestLogger.js
│   │   └── validateApplication.js
│   │
│   ├── routes/
│   │   └── applicationRoutes.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 5. Installation and Setup

### Prerequisites

- Node.js installed
- npm installed
- Postman installed
- VS Code

### Step 1: Clone the repository

```bash
git clone <your-github-repository-url>
```

### Step 2: Navigate to the project directory

```bash
cd job_tracker
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Configure environment variables

Create a `.env` file in the root directory.

```env
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

The `.env.example` file provides the required environment variable names and example values.

### Step 5: Start the development server

```bash
npm run dev
```

### Step 6: Start the production server

```bash
npm start
```

The server runs at:

```text
http://localhost:3000
```

## 6. Environment Variables

| Variable | Description | Example |
|---|---|---|
| PORT | Server port number | 3000 |
| NODE_ENV | Application environment | development |
| CLIENT_URL | Allowed frontend origin | http://localhost:5173 |

Environment variables are managed using dotenv.

## 7. API Endpoints

Base URL:

```text
http://localhost:3000
```

### GET – Retrieve All Applications

**Endpoint:**

```http
GET /api/applications
```

Returns all job applications.

### GET – Filter Applications by Status

**Endpoint:**

```http
GET /api/applications?status=Interview
```

Returns applications matching the specified status.

### GET – Search Applications by Company

**Endpoint:**

```http
GET /api/applications?search=google
```

Searches applications using the company name.

### GET – Retrieve Application by ID

**Endpoint:**

```http
GET /api/applications/:id
```

Example:

```http
GET /api/applications/1
```

### POST – Create Application

**Endpoint:**

```http
POST /api/applications
```

Request body:

```json
{
  "company": "Amazon",
  "role": "AI Intern",
  "status": "Applied",
  "location": "Bangalore",
  "appliedDate": "2026-11-12"
}
```

Creates a new job application.

### PATCH – Update Application

**Endpoint:**

```http
PATCH /api/applications/:id
```

Example:

```http
PATCH /api/applications/1
```

Request body:

```json
{
  "status": "Interview"
}
```

Updates only the provided fields.

### DELETE – Delete Application

**Endpoint:**

```http
DELETE /api/applications/:id
```

Example:

```http
DELETE /api/applications/1
```

Deletes the application with the specified ID.

## 8. Application Validation

The API validates incoming application data.

Validation rules include:

- Company name is required.
- Job role is required.
- Status must be one of the following:
  - Applied
  - Interview
  - Selected
  - Rejected
- Location must be a string when provided.
- Application date must be a valid date when provided.

Invalid requests return:

**400 Bad Request**

## 9. Error Handling

The application uses centralized error-handling middleware.

All error responses follow this structure:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "company": "Company name is required"
  }
}
```

Common HTTP status codes:

| Status Code | Description |
|---|---|
| 200 | Successful request |
| 201 | Resource created |
| 204 | Resource deleted successfully |
| 400 | Validation error |
| 404 | Resource or route not found |
| 500 | Internal server error |

Stack traces are included only in the development environment.

## 10. Middleware

The application uses the following middleware:

- **CORS:** Controls which frontend origin can access the API.
- **express.json():** Parses incoming JSON request bodies.
- **Request Logger:** Logs HTTP methods, URLs and request timestamps.
- **Validation Middleware:** Checks incoming application data.
- **404 Middleware:** Handles unknown routes.
- **Error Handler:** Handles application errors centrally.

Middleware is registered in the correct order so that errors from routes and earlier middleware can reach the centralized error handler.

## 11. Node.js Event Loop Demonstration

This project demonstrates the difference between non-blocking and blocking operations.



