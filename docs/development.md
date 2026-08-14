# Developer & Contribution Guide: Campus Portal

This guide outlines standards, coding conventions, architectural guidelines, and testing practices for developers contributing to **Campus Portal**.

---

## 1. Code Quality & Style Standards

### 1.1 Java Backend Standards
- **Java Version**: Java 17 LTS syntax (records, pattern matching, `var` where clarity permits).
- **Dependency Injection**:
  - Always use **Constructor Injection** for required dependencies.
  - Declare injected service fields as `private final`.
  - Avoid field-level `@Autowired` in production services and controllers.
- **Logging**:
  - Use SLF4J loggers (`LoggerFactory.getLogger(Class.class)`) or Lombok `@Slf4j`.
  - Never use `System.out.println` or `System.err.println`.
  - Prefix audit logs with standard category markers (e.g. `[PORTAL-AUDIT]`).
- **Validation**:
  - Annotate entity and DTO fields with Jakarta Bean Validation annotations (`@NotBlank`, `@Size`, `@Min`, `@NotNull`).
  - Annotate controller request body parameters with `@Valid`.
- **Naming Conventions**:
  - Packages: `com.saad.campusportal.*` (all lowercase).
  - Classes/Interfaces: PascalCase (`NoticeService`, `DatabaseConfig`).
  - Methods/Variables: camelCase (`getNoticeById`, `createdAt`).
  - Constants: UPPER_SNAKE_CASE (`API_BASE_URL`).

### 1.2 React Frontend Standards
- **React Hooks**: Use functional components with standard hooks (`useState`, `useEffect`, `useCallback`, `useMemo`).
- **State Immutability**: Always update state immutably (e.g. `setNotices(prev => [...prev, newNotice])`).
- **API Isolation**: Route all external HTTP requests through `client/src/services/api.js`. Never hardcode `fetch` URLs directly in UI components.
- **Styling**:
  - Use CSS custom properties defined in `:root` inside `App.css` for consistent design tokens.
  - Combine React-Bootstrap layout components (`Container`, `Row`, `Col`, `Card`) with semantic custom classes.

---

## 2. Testing Strategy

### 2.1 Backend Integration Tests
- Integration tests live under `server/src/test/java/com/saad/campusportal/`.
- Use `@SpringBootTest` paired with `@AutoConfigureMockMvc` for testing controller endpoints, status codes, and JSON serialization.
- Test assertions must verify both positive flows (`200 OK`, `201 Created`) and validation failure cases (`400 Bad Request`).
- Tests must run in-memory using H2 database profile (`server/src/test/resources/application.properties`).

### 2.2 Running Backend Tests
```bash
cd server
./mvnw clean test
```

### 2.3 Running Frontend Tests
```bash
cd client
npm test -- --watchAll=false
```

---

## 3. Git Workflow & Commit Rules

### 3.1 Branching Strategy
Create branches from `main` using descriptive category prefixes:

```
feature/<feature-name>       # New functionality
bugfix/<issue-description>   # Defect fixes
refactor/<component-name>    # Code restructuring without behavior changes
docs/<doc-name>              # Documentation improvements
test/<suite-name>            # Test coverage additions
chore/<task-name>            # Maintenance or dependency upgrades
```

### 3.2 Commit Standard — Conventional Commits
All commits must follow the [Conventional Commits v1.0.0](https://www.conventionalcommits.org/) format:

```
<type>(<optional scope>): <description>

[optional body]
```

#### Approved Types
- `feat`: A new user-facing feature.
- `fix`: A bug fix.
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `docs`: Documentation only changes.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting).
- `test`: Adding missing tests or correcting existing tests.
- `chore`: Changes to the build process or auxiliary tools.

*Example*: `feat(notice): add pagination support to notice feed`

---

## 4. Building Production Artifacts

### 4.1 Backend JAR Packaging
```bash
cd server
./mvnw clean package -DskipTests
```
*Produces executable JAR in `server/target/campusportal-0.0.1-SNAPSHOT.jar`.*

### 4.2 Frontend Static Bundle
```bash
cd client
npm run build
```
*Produces optimized static assets in `client/build/`.*
