# CLAUDE.md

Project-specific instructions for Claude Code.

## Workflow

### Branching

Always create branches from GitHub issues using:

```bash
gh issue develop <issue-number> --checkout
```

This automatically creates a branch linked to the issue.

### Commits

Use conventional commits format:

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `style:` formatting, missing semicolons, etc.
- `refactor:` code restructuring without behavior change
- `test:` adding or updating tests
- `chore:` maintenance tasks

### Pull Requests

Always create PRs using:

```bash
gh pr create
```

Reference the issue in the PR body with `Closes #X` to auto-close the issue on merge.

### Example Workflow

```bash
# 1. Start work on issue #1
gh issue develop 1 --checkout

# 2. Make changes and commit
git add .
git commit -m "feat: add drag-and-drop image upload

Closes #1"

# 3. Push and create PR
git push -u origin HEAD
gh pr create
```

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **AI:** Claude API (Anthropic)
- **Hosting:** Vercel
- **Storage:** Vercel Blob
