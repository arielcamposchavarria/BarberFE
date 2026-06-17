# BarberFE

Nuxt 4 + Vue 3 app. Before treating any task as done, every change must pass the same gates enforced in CI (`.github/workflows/ci.yml` and `security.yml`):

```bash
npm run lint        # ESLint (@nuxt/eslint)
npm run typecheck   # nuxt typecheck (vue-tsc)
npm run test        # vitest run
npm run build       # nuxt build
```

Run all four after making code changes, and fix failures before reporting the work as complete — don't just describe what should pass.

## Rules

- Never weaken a check to make it pass: no disabling ESLint rules, no `// @ts-ignore` to silence typecheck, no skipping/deleting failing tests, no `--no-verify` on commits.
- New components/composables that affect rendering need a test under `tests/nuxt/` (Nuxt/DOM environment — see `tests/nuxt/app.test.ts`). Pure logic with no DOM/Nuxt context goes in `tests/`.
- Keep `package-lock.json` in sync — use `npm install`/`npm ci`, never hand-edit it.
- Don't touch `.github/workflows/*.yml`, `.github/dependabot.yml`, or pinned action SHAs unless explicitly asked.
- If a new dependency is added, prefer well-maintained packages — `npm audit` and the dependency-review workflow will block the PR on high/critical vulnerabilities.
