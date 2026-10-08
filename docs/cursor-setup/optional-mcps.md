# Optional MCP servers (enable only when needed)

Copy entries into `.cursor/mcp.json` only for the project that needs them.

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "puppeteer-mcp-server"]
    },
    "kubernetes": {
      "command": "npx",
      "args": ["-y", "mcp-server-kubernetes"]
    },
    "openai": {
      "command": "npx",
      "args": ["-y", "openai-mcp"],
      "env": { "OPENAI_API_KEY": "${env:OPENAI_API_KEY}" }
    }
  }
}
```

Prefer official remote OAuth servers from vendors (Linear, Notion, Slack, Stripe, AWS) via Cursor Marketplace over random npm packages.
