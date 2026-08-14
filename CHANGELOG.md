# Changelog

All notable changes to **Campus Portal** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-08-15

### Added
- **Notice Management**: Full RESTful CRUD operations (`POST`, `GET`, `DELETE`) for campus announcements with Jakarta Bean Validation.
- **System Health Monitor**: Live multi-service dashboard tracking `StudentService`, `CourseService`, and `LoggerService`.
- **Frontend SPA**: React 19 single-page interface styled with React-Bootstrap and custom CSS variables.
- **Notice Deletion UI**: Interactive deletion controls with confirmation dialogs and immediate local state synchronization.
- **Multi-Profile Configuration**: Dynamic database profiles for local MySQL (`dev`), production PostgreSQL (`prod`), and in-memory H2 (`test`).
- **Comprehensive Documentation**: Complete system architecture, REST API specification, ADRs, and visual mockups.
- **Automated Integration Testing**: MockMvc test suite verifying HTTP endpoints and entity validation rules using in-memory H2 database.

### Security
- Parameterized database credentials with environment variable defaults (`${DB_USERNAME}`, `${DB_PASSWORD}`).
- Configured global CORS filter for client origin segregation.
