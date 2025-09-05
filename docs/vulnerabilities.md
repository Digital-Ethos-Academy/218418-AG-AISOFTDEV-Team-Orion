## Security Vulnerabilities Assessment

Summary: This document lists security issues found in the project artifacts (app code and SQL) with evidence, impact, and recommended remediation.

---

### 1. Plaintext passwords in schema and seed data — Critical
- Evidence: `schema.sql` defines `password TEXT NOT NULL` (note: comment says passwords should be hashed). `seed_data.sql` inserts plaintext passwords like `password123`, `securepass456`.
- Impact: Credential compromise if DB/seed files are exposed; credential reuse risk.
- Remediation: Remove plaintext password seeds from the repo; store only hashed passwords (bcrypt/Argon2). Use a server-side password-hashing library (e.g., passlib, bcrypt). Revoke/rotate any credentials if used in real environments.

### 2. Local SQLite DB file and hard-coded DB path — High
- Evidence: `artifacts/app/main.py` uses `SQLALCHEMY_DATABASE_URL = "sqlite:///./artifacts/onboarding.db"`.
- Impact: Sensitive data stored in repository tree can be leaked; increases attack surface.
- Remediation: Move DB outside the repo, switch to an environment-configured DB URL, add DB files to `.gitignore`, use proper production DB with access controls.

### 3. Hard-coded configuration and secrets in code — Medium
- Evidence: Hard-coded DB path and seed data with emails/passwords.
- Impact: Secrets in VCS are hard to rotate and may be leaked.
- Remediation: Use environment variables or a secrets manager; remove secrets from VCS history (git filter-repo / BFG) if already committed.

### 4. No authentication/authorization on API endpoints — High
- Evidence: FastAPI endpoints in `main.py` and `main_in_memory.py` allow create/read/update/delete of users and data with no auth checks.
- Impact: Unauthenticated clients can modify user records and platform data.
- Remediation: Implement authentication (e.g., OAuth2 / JWT with FastAPI security utilities), require auth for sensitive endpoints, and add role-based access control and rate limiting.

### 5. Dev server binding and reload in examples — Medium
- Evidence: `main_in_memory.py` runs uvicorn with `host="0.0.0.0"`; `main.py` runs with reload when importable.
- Impact: Exposes dev server to networks and may leak debug info.
- Remediation: Default dev servers to `127.0.0.1`, disable reload in production, document secure deployment behind TLS and a reverse proxy.

### 6. Plaintext storage of sensitive data at runtime — Medium
- Evidence: `main_in_memory.py` stores user dicts with `password` in `users_db` list.
- Impact: Passwords can be exposed via logs, memory dumps, or debugging.
- Remediation: Never store raw passwords in memory or logs; store only hashes and scrub sensitive fields from logs and API responses.

### 7. Insufficient validation / potential XSS via free-text fields — Medium
- Evidence: Fields like `Ratings.review`, `Notifications.message`, `Movies.synopsis` are stored as TEXT with no sanitization.
- Impact: Stored XSS if frontend renders content unescaped.
- Remediation: Sanitize or escape output on the presentation layer; enforce input validation and content policy.

### 8. Unbounded BLOB fields for metadata — Low–Medium
- Evidence: `Movies.metadata` and `TV_Shows.metadata` stored as BLOB with no validation.
- Impact: Large uploads may cause DoS or store dangerous file types.
- Remediation: Enforce upload size/type limits, validate content, use object storage (S3) with scanning and signed URLs.

### 9. Realistic-looking seed data — Low
- Evidence: `seed_data.sql` includes names and real-looking emails.
- Impact: May contain realistic PII; risk when publicly shared.
- Remediation: Use synthetic, non-identifiable test data; remove PII from seeds.

### 10. Missing transport security guidance (no TLS) — Medium
- Evidence: Uvicorn runs are shown without TLS configuration.
- Impact: Credentials/tokens may be transmitted in cleartext if deployed insecurely.
- Remediation: Enforce HTTPS in production, use HSTS, and do not run production services without TLS.

---

## Quick prioritized action items
- Immediate (P0/P1):
  - Remove plaintext passwords from the repository and switch to salted, strong hashing (Argon2/bcrypt).
  - Stop tracking `artifacts/onboarding.db` in VCS; move DB out of repo and add to `.gitignore`.
  - Add authentication and protect sensitive endpoints.
- Short term (P2):
  - Use environment variables for configuration and secrets.
  - Limit dev server binding to localhost and document secure production deployment.
- Medium term (P3):
  - Sanitize free-text fields, validate inputs, and add file/blob size/type checks.
