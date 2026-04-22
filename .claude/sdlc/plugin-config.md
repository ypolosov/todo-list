---
name: plugin-config
type: hooks-config
version: 3
updated: 2026-04-22
---

# Конфигурация hooks плагина

Технический конфиг для hooks и скриптов плагина.
SME-решения пользователя — в `profile.md`.

## state_artifact

Где хранится состояние работ проекта (принцип 9).

```yaml
state_artifact:
  kind: file
  ref: .claude/sdlc/tasks.md
```

## tdd_scope

Пути, на которые распространяется TDD hook (принцип 5).

```yaml
tdd_scope:
  include: [src/domain/**, src/application/**]
  exclude: [src/**/index.ts, src/**/*.d.ts, src/adapters/driving/react/**, src/application/TaskRepository.ts]
```

## tdd_pairs

Регулярные выражения пар source↔test.

```yaml
tdd_pairs:
  - source: 'src/domain/(.+)\.ts$'
    test: 'tests/unit/domain/\1.test.ts'
  - source: 'src/application/(.+)\.ts$'
    test: 'tests/unit/application/\1.test.ts'
```

## formatter

Команда форматера. Обязательна после прохождения фазы development.

```yaml
formatter:
  command: npm run format
  exit_code_ok: 0
  scope_globs: [src/**, tests/**]
```

## linter

Команда линтера. Обязательна после прохождения фазы development.

```yaml
linter:
  command: npm run lint
  exit_code_ok: 0
  scope_globs: [src/**, tests/**]
```

## no_comments_whitelist

Whitelist технических директив для `enforce-no-comments.sh` (принцип 4a).

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

## coverage_gate

Пороги покрытия по областям (зафиксированы на фазе testing).
Проверяется командой тестирования на фазе development; блокирует сборку при несоответствии.

```yaml
coverage_gate:
  - path: src/domain/**
    min_percent: 100
    blocking: true
  - path: src/application/**
    min_percent: 100
    blocking: true
  - path: src/adapters/**
    min_percent: 0
    blocking: false
```

## system_readme_ttl_days

TTL описаний систем внимания (принцип 17).

```yaml
system_readme_ttl_days: 30
```
