# User Access Management System

## Project Demonstration
[![YouTube Logo](https://img.shields.io/badge/-YouTube-FF0000?style=flat&logo=youtube&logoColor=white)](https://youtu.be/yl4nzFbocLo)


## Introduction

The User Access Management System is a full-stack web application developed. The system enables user registration, JWT-based authentication, software access requests, and managerial approvals, catering to three user roles: Employee, Manager, and Admin.

## Purpose

This application fulfills the following objectives:

* **User Registration:** Allow users to sign up with a default Employee role.
* **Authentication:** Secure login using JWT (JSON Web Tokens).
* **Software Management:** Enable Admins to create and list software.
* **Access Requests:** Allow Employees to request software access.
* **Approvals:** Enable Managers to approve or reject requests.

## Tech Stack

* **Backend:** Node.js, Express.js, TypeORM, PostgreSQL, JWT, bcrypt, dotenv, nodemon.
* **Frontend:** React, React Router, Axios, Tailwind CSS.
* **Database:** PostgreSQL with TypeORM.
* **Tooling:** TypeScript.

## Implementation Overview

The development process followed a structured approach ensuring all requirements were met. Below is a detailed account of how I implemented the system from start to finish:

### 1. Planning and Design

* **Requirement Analysis:** Reviewed the assignment to identify core features: user authentication, role-based access, software management, and request handling.
* **System Design:**
    * **Backend:** Designed RESTful API endpoints (`/api/auth`, `/api/software`, `/api/requests`) and TypeORM entities (`User`, `Software`, `Request`).
    * **Frontend:** Planned React routes (`/signup`, `/login`, `/create-software`, `/request-access`, `/pending-requests`) with role-based restrictions.
    * **Database:** Defined schema with relations (e.g., `Request` links to `User` and `Software` via `@ManyToOne`).
    * **Security:** Planned JWT for authentication, bcrypt for password hashing, and role-based middleware.

### 2. Backend Development

* **Setup:** Initialized a Node.js project with Express, TypeORM, and PostgreSQL.
* **Entities:** Created `User.ts`, `Software.ts`, and `Request.ts` to match the specified schema, ensuring proper columns and relations.
* **Authentication:**
    * Implemented `auth.ts` for `POST /api/auth/signup` (default role: Employee) and `POST /api/auth/login`, generating JWTs with `{ userId, role }` payload.
    * Used `bcrypt` for password hashing and `jsonwebtoken` for JWT creation/verification.
* **Middleware:** Developed `authMiddleware.ts` to verify JWTs and enforce role-based access (e.g., Admin for `/api/software`, Manager for `/api/requests/pending`).
* **Routes:**
    * `software.ts`: Added `POST /api/software` (create software) and `GET /api/software` (list software).
    * `requests.ts`: Added `POST /api/requests` (submit request), `GET /api/requests/pending` (list pending), and `PATCH /api/requests/:id` (approve/reject).
* **Database:** Configured `data-source.ts` with TypeORM.

### 3. Frontend Development

* **Setup:** Initialized a React project with TypeScript and Tailwind CSS.
* **Authentication Pages:**
    * `Signup.tsx`: Form for username, password, and optional role, calling `/api/auth/signup` and storing JWT/role in `sessionStorage`.
    * `Login.tsx`: Form for username and password, calling `/api/auth/login` with similar storage and redirection.
* **Role-Based Pages:**
    * `CreateSoftware.tsx`: Admin-only form for software creation (name, description, access levels).
    * `RequestAccess.tsx`: Employee-only form for access requests (software dropdown, access type, reason).
    * `PendingRequests.tsx`: Manager-only page to list and approve/reject requests.
* **Components:**
    * `ProtectedRoute.tsx`: Restricts page access based on role from `sessionStorage`.
    * `Navbar.tsx`: Displays role-based navigation links (e.g., “Create Software” for Admin).
* **API Client:** Implemented `api.ts` with Axios, adding a JWT interceptor to include `Authorization: Bearer <token>` in requests.

### 4. Database Integration

* Used TypeORM to define entities and relations.
* Added a migration to create users, software, and request tables with foreign keys.

---

## Setup Instructions

### Prerequisites

* **Node.js:** v16 or higher
* **PostgreSQL:** v13 or higher
* **npm:** v8 or higher (or yarn)
* **Git:** For cloning the repository
* **Postman:** For API testing (optional)

### Backend Setup

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Tejakrishna2003/User-Access-Management-System.git

    cd User-Access_Management-System

    cd backend

    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Configure PostgreSQL:**
    * Create a database:
        ```sql
        psql -U <username>
        CREATE DATABASE user_access_db;
        ```
    * Verify PostgreSQL is running on `localhost:5432` or update the connection URL.
4.  **Set Up Environment Variables:**
    * Create a `.env` file in `backend/`:
        ```
        PORT=5000
        DATABASE_URL=postgres://<username>:<password>@localhost:5432/user_access_db
        JWT_SECRET=your_jwt_secret_key
        ```
    * Replace `<username>`, `<password>`, and `your_jwt_secret_key` with secure values (e.g., generate a random `JWT_SECRET`).
    * 
5.  **Start the Backend:**
    ```bash
    npm run dev
    ```
    *The server runs on `http://localhost:5000`.*

### Frontend Setup

1.  **Navigate to Frontend Directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Start the Frontend:**
    ```bash
    npm start
    ```
    *The app runs on `http://localhost:5173`.*

---

## API Documentation

### Authentication

* **`POST /api/auth/signup`**
    * **Body:** `{ "username": string, "password": string, "role"?: "Employee" | "Manager" | "Admin" }`
    * **Response:** `{ "token": string, "role": string }`
    * *Note: Default role is "Employee".*
* **`POST /api/auth/login`**
    * **Body:** `{ "username": string, "password": string }`
    * **Response:** `{ "token": string, "role": string }`

### Software Management (Admin)

* **`POST /api/software`**
    * **Headers:** `Authorization: Bearer <token>`
    * **Body:** `{ "name": string, "description": string, "accessLevels": string[] }`
    * **Response:** `{ id: number, name: string, description: string, accessLevels: string[] }`
* **`GET /api/software`**
    * **Response:** `[{ id: number, name: string, description: string, accessLevels: string[] }, ...]`

### Access Requests (Employee)

* **`POST /api/requests`**
    * **Headers:** `Authorization: Bearer <token>`
    * **Body:** `{ "softwareId": number, "accessType": "Read" | "Write" | "Admin", "reason": string }`
    * **Response:** `{ id: number, user: User, software: Software, accessType: string, reason: string, status: string }`

### Request Approvals (Manager)

* **`GET /api/requests/pending`**
    * **Headers:** `Authorization: Bearer <token>`
    * **Response:** `[{ id: number, user: User, software: Software, accessType: string, reason: string, status: string }, ...]`
* **`PATCH /api/requests/:id`**
    * **Headers:** `Authorization: Bearer <token>`
    * **Body:** `{ "status": "Approved" | "Rejected" }`
    * **Response:** Updated request object

---
