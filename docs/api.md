# REST API Specification: Campus Portal

All API endpoints are prefixed with `/api`. The server listens on port `8080` by default.

---

## 1. Notice Management API

### 1.1 Fetch All Notices
Retrieves all posted notices ordered chronologically by newest first.

- **Method**: `GET`
- **Path**: `/api/notice`
- **Response**: `200 OK`
- **Response Body**:
  ```json
  [
    {
      "id": 1,
      "title": "Semester Final Exam Schedule",
      "message": "The final exam timetable for Spring semester has been published.",
      "createdAt": "2026-08-15T10:30:00"
    },
    {
      "id": 2,
      "title": "Library Weekend Hours Extended",
      "message": "Central library will remain open until 11:00 PM during exam weeks.",
      "createdAt": "2026-08-14T14:15:00"
    }
  ]
  ```

---

### 1.2 Create New Notice
Validates and persists a new notice announcement.

- **Method**: `POST`
- **Path**: `/api/notice`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "title": "Campus Career Fair 2026",
    "message": "Over 40 tech companies will be hosting recruitment sessions in the main auditorium."
  }
  ```
- **Validation Rules**:
  - `title`: Required, non-blank, maximum 150 characters.
  - `message`: Required, non-blank, maximum 2000 characters.
- **Success Response**: `201 Created`
  ```json
  {
    "success": true,
    "message": "Notice added successfully",
    "notice": {
      "id": 3,
      "title": "Campus Career Fair 2026",
      "message": "Over 40 tech companies will be hosting recruitment sessions in the main auditorium.",
      "createdAt": "2026-08-15T15:45:00"
    }
  }
  ```
- **Error Response**: `400 Bad Request` (Validation Failure)

---

### 1.3 Delete Notice
Deletes a notice by its unique ID.

- **Method**: `DELETE`
- **Path**: `/api/notice/{id}`
- **Path Parameter**: `id` (Long, e.g. `3`)
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "message": "Notice deleted successfully"
  }
  ```

---

## 2. System Service & Health API

### 2.1 Fetch Service Health
Aggregates health and status signals across internal campus services.

- **Method**: `GET`
- **Path**: `/api/info`
- **Response**: `200 OK`
- **Response Body**:
  ```json
  {
    "student": "Student Service Active",
    "course": "Course Service Active",
    "log": "Audit logging active"
  }
  ```

---

## 3. Configuration & Profile API

### 3.1 Fetch Database Profile Configuration
Returns active Spring configuration profile and database dialect information.

- **Method**: `GET`
- **Path**: `/api/dbinfo`
- **Response**: `200 OK`
- **Response Body**:
  ```json
  {
    "activeProfile": "dev",
    "databaseConfig": "MySQL Database Configuration - Development Environment (Port: 3306)"
  }
  ```

---

## 4. Welcome & Dependency Injection API

### 4.1 Welcome Messages Multi-Injection Overview
- **Method**: `GET`
- **Path**: `/api/welcome`
- **Response**: `200 OK`
- **Response Body**:
  ```json
  {
    "fieldInjection": "Welcome Student to Campus Portal",
    "constructorInjection": "Welcome Admin to Campus Portal",
    "setterInjection": "Welcome Student to Campus Portal"
  }
  ```

### 4.2 Student Greeting
- **Method**: `GET`
- **Path**: `/api/welcome/student`
- **Response**: `200 OK` (Text)
  ```
  Welcome Student to Campus Portal
  ```

### 4.3 Admin Greeting
- **Method**: `GET`
- **Path**: `/api/welcome/admin`
- **Response**: `200 OK` (Text)
  ```
  Welcome Admin to Campus Portal
  ```
