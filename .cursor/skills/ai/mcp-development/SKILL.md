---
name: mcp-development
description: Building and configuring MCP servers/clients safely.
---

# MCP development

- Prefer official vendor MCP endpoints when available.
- Keep tool surface small; each tool costs context.
- Never embed long-lived secrets in committed `mcp.json`; use `${env:...}`.
- Disable unused servers.
