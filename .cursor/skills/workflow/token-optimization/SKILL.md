---
name: token-optimization
description: Token and context optimization for Cursor agents. Use when minimizing context usage, planning edits, or avoiding broad repo reads.
---

# Token optimization

## Instructions
- Search first; open files second.
- Read slices, not whole trees.
- One logical change per iteration.
- Prefer patches over full-file rewrites in communication.
- Skip generated artifacts unless the bug is there.
- Prefer fewer, higher-signal MCP calls.

## Anti-patterns
- Dumping `node_modules` or lockfiles into context
- Re-printing entire files after editing
- Enabling dozens of MCPs for a single coding task
