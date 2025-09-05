# ADR 0001 — Architecture Decisions for Movie/TV Platform (repo artifacts)

Date: 2025-09-05
Status: Proposed
Authors: Hafeez Ahmed, Soban Ali, Ben Sutter
AI: GPT-5

## Context

This repository contains a small movie/TV management platform with two example application entrypoints (`artifacts/app/main.py` and `artifacts/app/main_in_memory.py`), SQL schema/seed files (`schema.sql`, `seed_data.sql`), some product artifacts and templates, and an example local SQLite DB (`artifacts/onboarding.db`). The code is written with FastAPI and SQLAlchemy for the persistent example and a minimal in-memory FastAPI example.

Several practical constraints and observations from the artifacts inform the decisions below:
- The app currently uses a local SQLite DB path hard-coded in the codebase.
- Seed data contains plaintext passwords.
- There is no authentication/authorization implemented in the examples.
- The code demonstrates common dev patterns (uvicorn dev server, reload, 0.0.0.0 binding in examples).
- BLOB/metadata columns exist for storing binary metadata in the DB.

## Decisions

1. Use FastAPI for the application framework

Decision
: Keep FastAPI as the primary web framework for API endpoints.

Rationale
: FastAPI is modern, well-supported, async-capable, and fits the project's sample code.

Consequences
: Use FastAPI idioms (Pydantic models, dependency injection). For production, integrate with ASGI servers (uvicorn/gunicorn) and add authentication middleware.

Alternatives considered
: Flask, Django REST Framework — rejected for more boilerplate and less async friendliness.

2. Local development DB: SQLite (artifacts/onboarding.db)

Decision
: Keep SQLite for local development and demos. For production, migrate to a managed RDBMS (Postgres, MySQL, or cloud-provided options).

Rationale
: Lightweight, zero-config for local development and demos. Matches current repo state.

Consequences
: Avoid committing DB files in VCS. Add an explicit `.gitignore` entry for `artifacts/onboarding.db` and move any production data out of the repo.

Alternatives considered
: Use Postgres for parity with production — viable but adds local setup friction. Consider a docker-compose profile for local Postgres if team prefers parity.

3. Credentials and sensitive data handling

Decision
: Do not store plaintext passwords or secrets in code/seed files. Switch to salted, memory-hard password hashing (Argon2 or bcrypt) and use environment variables or a secrets manager for configuration.

Rationale
: Security best practice and to prevent accidental leaks from VCS or backups.

Consequences
: Update the user creation workflow to hash passwords, remove/rotate credentials in seeds, and consider non-sensitive synthetic data for seeds. If secrets already leaked to git history, use scrub tools (BFG/git filter-repo).

Alternatives considered
: Keep plaintext seeds for quick demos — rejected for security risk.

4. Authentication & Authorization

Decision
: Implement OAuth2/JWT-based authentication for APIs and protect any endpoints that create/modify/delete user or sensitive data. Provide role-based access for admin operations.

Rationale
: Current artifacts expose endpoints without auth; protecting them is mandatory for real deployments.

Consequences
: Add token issuance endpoints, login with hashed password verification, and route protections. Add tests (happy path + unauthorized attempts).

Alternatives considered
: Session-based auth — viable, but JWT/OAuth2 is a more portable example for APIs.

5. Dev server & binding

Decision
: Keep reload-enabled, host=127.0.0.1 for local development; avoid binding dev server to 0.0.0.0 by default. Document and separate dev vs production run instructions.

Rationale
: Prevent accidental exposure of dev servers on developer machines and networks.

Consequences
: Update example startup scripts; add guidance for running behind a proper production server and enabling TLS.

6. Storage of large assets / metadata

Decision
: Do not store large binary assets directly in the relational DB for production. Use object storage (S3-compatible) and store references/URLs in the DB. Keep metadata columns for small binary blobs only with size limits.

Rationale
: Scalability, backup and performance considerations.

Consequences
: Implement upload validation, size limits, and scanning for content. Use signed URLs for client uploads/downloads when appropriate.

7. Line endings and repo hygiene for binary files (notebooks)

Decision
: Treat Jupyter notebooks as binary in `.gitattributes` to prevent LF/CRLF normalization issues. Example: `*.ipynb binary`.

Rationale
: Notebooks are JSON-like but best treated as binary to avoid churn from line ending normalization and merge conflicts.

Consequences
: Add `.gitattributes` and run a renormalize if required. Document line-ending policy for cross-platform contributors.

8. Testing and CI

Decision
: Use `pytest` for unit tests and add simple integration tests for main flows (user create, auth, create movie). Add a CI pipeline to run tests on PRs.

Rationale
: Fast feedback on regressions and security checks (e.g., secret scanning, linting).

Consequences
: Provide a `requirements-dev.txt` or extend `requirements.txt` with test deps. Add CI configuration (GitHub Actions) in a follow-up ADR or task.

9. Logging and PII

Decision
: Avoid logging sensitive fields (passwords, tokens, full email addresses where possible) and centralize logging configuration to scrub PII.

Rationale
: Reduce risk of data leakage in logs.

Consequences
: Add structured logging and a policy for scrubbing or redacting PII.

## Implementation notes / immediate actions

- Add `.gitignore` entry: `/artifacts/onboarding.db`.
- Add `.gitattributes` with `*.ipynb binary` and recommended `*.py text eol=lf` if team prefers LF.
- Replace plaintext passwords in `seed_data.sql` with hashed values OR remove them and provide a `seed_sample.sql` with synthetic non-sensitive data.
- Add a small example module `app/security.py` to demonstrate password hashing with `passlib` and a minimal OAuth2/JWT example (follow-up implementation).

## Alternatives and trade-offs

- Keeping the repo simple (SQLite + plaintext seeds) is fast for demos but unacceptable for production and risky in shared repos.
- Adding a local Postgres requirement increases local setup time but improves parity with production. A compromise is providing both SQLite for quick start and an optional docker-compose for Postgres.

## Decision log

- 2025-09-05: Initial ADR created covering framework, DB choice, secrets handling, auth, storage, logging, and developer hygiene.

---

For implementation help I can:
- Add the `.gitignore` and `.gitattributes` changes.
- Create a small `app/security.py` example that hashes passwords and demonstrates token issuance.
- Provide a `docker-compose.dev.yml` for optional Postgres local dev.

Indicate which follow-up you'd like and I'll implement it.
