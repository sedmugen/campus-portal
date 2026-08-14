# Setup & Installation Guide: Campus Portal

This guide provides step-by-step instructions for configuring, installing, and running **Campus Portal** across local development environments.

---

## 1. System Requirements

Ensure the following tools and runtimes are installed on your workstation:

| Requirement | Minimum Version | Recommended | Notes |
| :--- | :--- | :--- | :--- |
| **Java JDK** | 17 LTS | Eclipse Temurin 17+ or Oracle JDK 17 | Required for Spring Boot backend |
| **Node.js** | 18.x | 20.x or 22.x LTS | Required for React client |
| **npm** | 9.x | 10.x+ | Node package manager |
| **MySQL (Optional)** | 8.0+ | 8.0+ | Optional for `dev` profile; test mode uses H2 |
| **Git** | 2.30+ | Latest | Version control |

---

## 2. Quickstart (Clone & Configure)

### Step 1: Clone the Repository
```bash
git clone https://github.com/sedmugen/campus-portal.git
cd campus-portal
```

### Step 2: Environment Configuration
Copy the sample environment file to create your local `.env`:
```bash
cp .env.example .env
```

Review and adjust variables in `.env` if necessary:
```env
# Frontend
REACT_APP_API_URL=http://localhost:8080/api

# Backend
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=dev
DB_URL=jdbc:mysql://localhost:3306/campus_portal_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

---

## 3. Backend Setup (`server/`)

The Spring Boot backend uses Maven Wrapper (`mvnw`), eliminating the need for a separate global Maven installation.

### Option A: Running with MySQL (Default `dev` profile)
1. Ensure MySQL server is running on port `3306`.
2. Start the Spring Boot application:

```bash
cd server

# Windows (PowerShell / Command Prompt)
.\mvnw.cmd spring-boot:run

# macOS / Linux
./mvnw spring-boot:run
```

*The server will start on port `8080` and automatically initialize database tables via Hibernate (`ddl-auto=update`).*

### Option B: Running with In-Memory Database (No MySQL required)
To run without a local MySQL server, pass the test in-memory configuration:

```bash
cd server
.\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=test
```

### Option C: Running Automated Tests
Execute the unit and integration test suite:

```bash
cd server
.\mvnw.cmd clean test
```

---

## 4. Frontend Setup (`client/`)

The frontend is a React Single Page Application located in `client/`.

### Step 1: Install Dependencies
```bash
cd client
npm install
```

### Step 2: Start Development Server
```bash
npm start
```
*The React development server launches on [http://localhost:3000](http://localhost:3000) and automatically opens in your default browser.*

### Step 3: Run Frontend Tests
```bash
npm test -- --watchAll=false
```

### Step 4: Build for Production
```bash
npm run build
```
*Creates an optimized production bundle in `client/build/`.*

---

## 5. Verifying Installation

Verify that the system is fully operational:

1. **Backend Health Check**: Open `http://localhost:8080/api/info` in your browser. You should receive a JSON response:
   ```json
   {
     "student": "Student Service Active",
     "course": "Course Service Active",
     "log": "Audit logging active"
   }
   ```
2. **Frontend UI**: Open `http://localhost:3000`. You should see the **Campus Portal** header, the active green health indicators for backend services, and the notice publishing form.
3. **End-to-End Test**:
   - Enter a test title (e.g. `System Setup Complete`) and message.
   - Click **Publish Notice**.
   - Verify the notice card appears immediately in the feed.
   - Click the delete button on the card and confirm deletion.

---

## 6. Troubleshooting

### Issue: Port 8080 or 3000 Already in Use
- **Backend**: Update `server.port` in `server/src/main/resources/application.properties` or set `SERVER_PORT=8081` in your environment.
- **Frontend**: Create a `.env` in `client/` containing `PORT=3001` and update `REACT_APP_API_URL`.

### Issue: MySQL Connection Refused
- Verify MySQL service is active: `mysqladmin -u root -p status`.
- Check credentials in `server/src/main/resources/application.properties` or override with `DB_USERNAME` and `DB_PASSWORD` environment variables.
- Alternatively, run with the in-memory profile.
