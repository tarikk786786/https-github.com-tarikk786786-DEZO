---
name: master-development-system
description: Full master Cursor development system prompt. Use for complex multi-domain work, onboarding to a new repo, or when the user asks for the master system / autonomous senior engineer mode.
---

# Master Cursor development system

Load and follow the full prompt in `docs/cursor-setup/MASTER_SYSTEM_PROMPT.md`.

Always-on essentials already live in `.cursor/rules/00-master-system.mdc`. Use this skill when you need the expanded domain lists (frontend/backend/DB/DevOps/AI), full security checklist, or the complete MCP/token/search/architecture sections.

## Quick operating loop

UNDERSTAND → SEARCH → PLAN → IMPLEMENT → TEST → REVIEW → FIX → SUMMARIZE

## Non-negotiables

- Project-first: detect and reuse; never blind rewrite.
- Token-first: search → slice read → minimal diff.
- MCP-minimal: only tools required for the task.
- Secure defaults; no secrets in source.
- No hallucination: observed vs inferred vs proposed.
- Final reply: DONE + what/files/checks/limitations.
