---
name: plugin-config
type: hooks-config
version: 1
updated: 2026-04-23
---

# Технический конфиг hooks

Читается скриптами и hooks плагина. Правится через skills фаз.

## state_artifact

```yaml
state_artifact:
  kind: file
  ref: .claude/sdlc/tasks.md
```

## tdd_scope

```yaml
tdd_scope:
  include: [src/domain/**, src/application/**, src/adapters/storage/**, src/adapters/ui/**]
  exclude: [src/main.tsx, src/adapters/ui/index.ts, src/domain/task-repository.ts]
```

`task-repository.ts` — port-интерфейс без runtime-поведения; пара-тест не требуется.
Flow-style обязателен: скрипт плагина парсит только `[...]` список.

Scope: TDD-пара обязательна для domain+application+adapters. Coverage-gate 100% только на domain+application (см. `phases/testing/testing.md`).

## tdd_pairs

```yaml
tdd_pairs:
  - source: 'src/domain/(.+)\.ts$'
    test:   'tests/unit/domain/\1.test.ts'
  - source: 'src/application/(.+)\.ts$'
    test:   'tests/unit/application/\1.test.ts'
  - source: 'src/adapters/storage/(.+)\.ts$'
    test:   'tests/unit/adapters/storage/\1.test.ts'
  - source: 'src/adapters/ui/(.+)\.tsx$'
    test:   'tests/unit/adapters/ui/\1.test.tsx'
```

Пары зафиксированы на фазах testing и development. Vitest-конвенция; co-located не используется.

## formatter

```yaml
formatter:
  command: npx prettier --check
  fix_command: npx prettier --write
  exit_code_ok: 0
  scope_globs: [src/**/*.ts, src/**/*.tsx, tests/**/*.ts, tests/**/*.tsx]
```

Зафиксировано на фазе development. Hook добавляет `<file>` в конце команды.

## linter

```yaml
linter:
  command: npx eslint
  exit_code_ok: 0
  scope_globs: [src/**/*.ts, src/**/*.tsx, tests/**/*.ts, tests/**/*.tsx]
```

Зафиксировано на фазе development.

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
