---
name: postgres
description: PostgreSQL via app config or Postgres MCP when DATABASE_URL is set.
---

# PostgreSQL

- Use parameterized queries / ORM bindings only.
- Prefer migrations over manual prod edits.
- Enable Postgres MCP only when `DATABASE_URL` is configured.
