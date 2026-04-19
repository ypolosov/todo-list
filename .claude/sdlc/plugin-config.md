---
name: plugin-config
type: hooks-config
version: 1
updated: 2026-04-19
---

# Технический конфиг hooks для todo-list

Читается скриптами плагина.
SME-решения вынесены в `profile.md`.

## state_artifact

Состояние Work-альфы хранится в одиночном файле `tasks.md`.

```yaml
state_artifact:
  kind: file
  ref: .claude/sdlc/tasks.md
```

## tdd_scope

Область TDD будет уточнена на фазе development.
На старте пустая: до выбора стека технологии неизвестны.

```yaml
tdd_scope:
  include: []
  exclude: []
```

## tdd_pairs

Пары source↔test определяются на фазе development.
До выбора стека TDD hook пропускает правки с предупреждением.

```yaml
tdd_pairs: []
```

## formatter

Команда форматера задаётся на фазе development.

```yaml
formatter:
  command: ""
  exit_code_ok: 0
  scope_globs: []
```

## linter

Команда линтера задаётся на фазе development.

```yaml
linter:
  command: ""
  exit_code_ok: 0
  scope_globs: []
```

## no_comments_whitelist

Стандартные технические директивы разрешены.

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

TTL для описаний систем внимания — 30 дней.

```yaml
system_readme_ttl_days: 30
```

## Правила

- Без formatter/linter после development — запись кода блокируется.
- Без tdd_pairs — TDD hook пропускает правки с предупреждением.
- Путь state-артефакта фиксируется здесь и агентом `sdlc-state-reader`.
