---
name: plugin-config
type: hooks-config
version: 1
updated: 2026-04-22
---

# Конфиг hooks плагина ai-driven-sdlc

Технический слой для скриптов плагина.
SME-решения хранятся в `profile.md`.

## state_artifact

```yaml
state_artifact:
  kind: file
  ref: .claude/sdlc/tasks.md
```

## tdd_scope

```yaml
tdd_scope:
  include: [src/**]
  exclude: [src/**/*.d.ts, src/**/*.test.ts, src/**/*.contract.test.ts, src/**/*.smoke.test.ts, src/bootstrap.ts]
```

## tdd_pairs

```yaml
tdd_pairs:
  - source: 'src/(.+?)\.ts$'
    test:   'src/\1.test.ts'
  - source: 'src/(.+?)\.ts$'
    test:   'src/\1.contract.test.ts'
  - source: 'src/(.+?)\.ts$'
    test:   'src/\1.smoke.test.ts'
```

## formatter

```yaml
formatter:
  command: npx --no-install prettier --write --log-level silent
  exit_code_ok: 0
  scope_globs: [src/**]
```

## linter

```yaml
linter:
  command: npx --no-install eslint --fix
  exit_code_ok: 0
  scope_globs: [src/**]
```

## no_comments_whitelist

```yaml
no_comments_whitelist:
  - '^#!'
  - '^// SPDX-License-Identifier:'
  - '^/\*\* @'
  - '^# type: ignore'
  - '^//go:build'
  - '^# pylint: disable'
  - '^/// <reference'
```

## system_readme_ttl_days

```yaml
system_readme_ttl_days: 30
```
