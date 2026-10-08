# Cursor MCP + Skills setup

This repository installs a **token-efficient core stack**, not every MCP/skill name from long internet checklists.

## Why not install 100+ MCPs?

Every MCP tool schema consumes context. A smaller, task-relevant set is faster and cheaper. Prefer enabling specialty servers only when a project needs them.

## Installed core MCPs (`.cursor/mcp.json`)

| Server | Source | Auth / env |
|--------|--------|------------|
| GitHub | `https://api.githubcopilot.com/mcp/` | OAuth in Cursor |
| Filesystem | `@modelcontextprotocol/server-filesystem` | Scoped to workspace |
| Git | `uvx mcp-server-git` | Needs `uv`/`uvx` on PATH |
| Context7 | `https://mcp.context7.com/mcp` | Optional API key for higher limits |
| Playwright | `@playwright/mcp` | First run may download browsers |
| Fetch | `uvx mcp-server-fetch` | Needs `uv`/`uvx` |
| Sequential Thinking | `@modelcontextprotocol/server-sequential-thinking` | None |
| Memory | `@modelcontextprotocol/server-memory` | None |
| PostgreSQL | `@modelcontextprotocol/server-postgres` | `DATABASE_URL` |
| MongoDB | `mongodb-mcp-server` | `MONGODB_URI` |
| Redis | `@modelcontextprotocol/server-redis` | `REDIS_URL` |
| Sentry | `@sentry/mcp-server` | `SENTRY_ACCESS_TOKEN` |
| Vercel | `https://mcp.vercel.com` | OAuth in Cursor |
| Cloudflare | `@cloudflare/mcp-server-cloudflare` | `CLOUDFLARE_API_TOKEN` |
| Supabase | `@supabase/mcp-server-supabase` | `SUPABASE_ACCESS_TOKEN` |
| Hugging Face | `https://huggingface.co/mcp` | `HF_TOKEN` |
| Figma | `https://mcp.figma.com/mcp` | OAuth in Cursor |

### Prerequisites

```bash
# uv/uvx for Python MCP servers (git, fetch)
curl -LsSf https://astral.sh/uv/install.sh | sh
# Playwright browsers (optional, when using Playwright MCP)
npx -y playwright install chromium
```

### Env vars (see also `.env.example`)

- `DATABASE_URL`, `MONGODB_URI`, `REDIS_URL`
- `SENTRY_ACCESS_TOKEN`, `CLOUDFLARE_API_TOKEN`, `SUPABASE_ACCESS_TOKEN`, `HF_TOKEN`

Servers that lack credentials will fail to connect until you set them — that is intentional.

## Intentionally NOT bulk-installed

Names like “OpenAI MCP”, “Angular Skill”, “Magento Skill”, etc. are often **wishlist labels**, not installable GitHub packages. Installing dozens of unused MCPs hurts agent quality.

Add specialty MCPs from:

- [MCP Registry](https://registry.modelcontextprotocol.io/)
- [Cursor Marketplace](https://cursor.com/marketplace)
- Official vendor docs (Stripe, Linear, Notion, Slack, AWS, …)

## Rules

Project rules live in `.cursor/rules/` (`00-core` … `15-review`), including always-on **token-saving** rules.

## Skills

Curated skills live in `.cursor/skills/<category>/<name>/SKILL.md` covering workflow, frontend, backend, database, devops, testing, security, git, architecture, AI, docs, product, and ecommerce.

For Cloud Agents: project skills in this repo are available automatically. Personal `~/.cursor/skills` require **Sync Skills for Cloud Agents** in Cursor Settings → Agents.

## Recommended workflow

Understand → Search → Plan → Implement → Test → Review → Commit
