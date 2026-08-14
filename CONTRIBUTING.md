# Contributing to Campus Portal

Thank you for your interest in contributing to **Campus Portal**! Follow the guidelines below to maintain code quality, consistency, and clear git history.

---

## Git Workflow

### Branch Naming Conventions
Always create feature branches off `main` using descriptive category prefixes:

```
<category>/<short-description>
```

- `feature/` — New functionality or UI components
- `bugfix/` — Fixing defects or UI glitches
- `refactor/` — Code restructuring without behavior change
- `docs/` — Documentation updates or guides
- `test/` — Adding or updating test suites
- `chore/` — Build config, dependency updates, or maintenance

*Example*: `feature/notice-category-filter` or `bugfix/cors-origin-fix`

---

## Commit Guidelines — Conventional Commits

Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(optional-scope): <imperative description>
```

- **Types**: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`, `perf`, `build`, `ci`
- **Rules**:
  - Write description in imperative mood (e.g. `add notice deletion endpoint`, not `added` or `adds`).
  - Keep the first line concise (under 72 characters).
  - Group one logical atomic change per commit.

---

## Development Setup

1. **Backend (`server/`)**:
   ```bash
   cd server
   ./mvnw clean test
   ./mvnw spring-boot:run
   ```

2. **Frontend (`client/`)**:
   ```bash
   cd client
   npm install
   npm test
   npm start
   ```

---

## Pull Request Checklist

Before submitting a PR:
- [ ] Code builds without errors or warnings.
- [ ] Backend tests pass via `./mvnw test`.
- [ ] Frontend tests pass via `npm test -- --watchAll=false`.
- [ ] No secrets or hardcoded credentials are committed.
- [ ] Commits adhere to Conventional Commits.
