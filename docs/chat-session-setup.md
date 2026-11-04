# Chat session setup

## Architecture

- **One skill:** [spec/session-config.json](../spec/session-config.json) + [spec/session-bootstrap.md](../spec/session-bootstrap.md) + [adapters/session/SKILL.md](../adapters/session/SKILL.md)
- **Many hosts:** thin files in [adapters/session/providers/](../adapters/session/providers/)
- **Same interactivity semantics:** [spec/interaction-contract.md](../spec/interaction-contract.md)
- **Host-specific packaging:** [spec/rendering-profiles.md](../spec/rendering-profiles.md)

## After first push to GitHub

Replace `{REPO_URL}` in [INSTALL-SKILL.md](../INSTALL-SKILL.md). No code changes required when the repo name is final.

## Fetch failures

If the model cannot read GitHub (see [LIMITATIONS L13](LIMITATIONS-AND-CAUSES.md)):

1. Make sure the install message contains the **raw** SESSION-INSTALL URL, not only the repo URL ([INSTALL-SKILL.md](../INSTALL-SKILL.md)).
2. Stale copy (wrong `installVersion`)? Use a commit-pinned raw URL.
3. Still blocked? Paste [PASTE-BUNDLE.md](../adapters/session/PASTE-BUNDLE.md) — it is self-contained (tokens, overlays, reference layout inlined).

## Persistent install (optional)

- **Claude web:** upload [adapters/claude-skill/genui.zip](../adapters/claude-skill/genui.zip) as a Skill (Settings → Capabilities → Skills).
- **Others:** upload `SESSION-INSTALL.md` to a Claude Project / custom GPT / Gemini Gem knowledge base — still one spec, not per-provider copies.
