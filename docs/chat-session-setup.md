# Chat session setup

## Architecture

- **One skill:** [spec/session-bootstrap.md](../spec/session-bootstrap.md) + [adapters/session/SKILL.md](../adapters/session/SKILL.md)
- **Many hosts:** thin files in [adapters/session/providers/](../adapters/session/providers/)
- **Same interactivity semantics:** [spec/interaction-contract.md](../spec/interaction-contract.md)
- **Host-specific packaging:** [spec/rendering-profiles.md](../spec/rendering-profiles.md)

## After first push to GitHub

Replace `{REPO_URL}` in [INSTALL-SKILL.md](../INSTALL-SKILL.md). No code changes required when the repo name is final.

## Fetch failures

If the model cannot read GitHub:

1. Paste contents of `adapters/session/SKILL.md`
2. Paste `branding/demo/tokens.json`
3. Paste the provider overlay from `adapters/session/providers/{id}.md`

## Persistent install (optional)

Upload the same files to a Claude Project / custom GPT / Gemini Gem knowledge base — still one spec, not per-provider copies.
