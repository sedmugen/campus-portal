# Architecture Decision Records (ADRs): Campus Portal

This document records the architectural and technology decisions made for **Campus Portal**, detailing the context, evaluation, and rationale.

---

## ADR 001: Monorepo Architecture for Client and Server

- **Status**: Accepted
- **Context**: The project consists of a React frontend and a Spring Boot backend. Previously, many small full-stack projects split frontend and backend into separate repositories, creating maintenance overhead, disparate version histories, and difficult local setup.
- **Decision**: Consolidate both tiers into a single monorepo with `client/` and `server/` directories under a shared root.
- **Consequences**:
  - Simplified clone, setup, and end-to-end repository reviews.
  - Unified issue tracking and release versioning.
  - Independent build pipelines preserved in their respective subdirectories.

---

## ADR 002: Spring Boot 3.5.7 with Java 17 LTS

- **Status**: Accepted
- **Context**: Enterprise applications require a modern, robust, type-safe backend framework with robust ORM, validation, and containerization support.
- **Decision**: Standardize on Java 17 LTS and Spring Boot 3.5.7.
- **Consequences**:
  - Leverages modern Java language features (records, enhanced pattern matching).
  - Native Jakarta EE 10 namespace (`jakarta.persistence.*`, `jakarta.validation.*`).
  - First-class support for Spring Data JPA and Hibernate 6.

---

## ADR 003: Constructor-Based Dependency Injection Standard

- **Status**: Accepted
- **Context**: Spring Framework supports field injection (`@Autowired`), setter injection, and constructor injection. Field injection obscures dependencies, prevents immutability (`final`), and complicates standalone unit testing without reflection.
- **Decision**: Standardize on Constructor Injection for all production services and controllers.
- **Consequences**:
  - Explicit dependency graphs declared in constructors.
  - All dependencies are declared `final`.
  - Simplifies testing with mock instances without requiring Spring Test context instantiation.

---

## ADR 004: In-Memory H2 Database for Isolated Automated Testing

- **Status**: Accepted
- **Context**: Spring Boot integration tests require a database connection. Coupling automated tests to a running external MySQL instance causes build failures in clean environments and automated CI/CD runners.
- **Decision**: Introduce `com.h2database:h2` as a test-scope dependency with dedicated test properties (`application-test.properties`).
- **Consequences**:
  - Zero external database requirements to execute `./mvnw test`.
  - Ephemeral in-memory database initialized and torn down automatically during tests.
  - Production `application.properties` remains configured for MySQL/PostgreSQL.

---

## ADR 005: React 19 Single Page Application with React-Bootstrap

- **Status**: Accepted
- **Context**: The user interface needs to be clean, responsive, accessible, and quick to load while providing live state updates for notice feeds and health cards.
- **Decision**: Use React 19 with React-Bootstrap and CSS custom properties (variables) for theme tokens.
- **Consequences**:
  - Component-driven architecture with clean state hooks (`useState`, `useEffect`, `useCallback`).
  - Mobile-responsive grid layout out-of-the-box.
  - Consistent color palettes and typography.
