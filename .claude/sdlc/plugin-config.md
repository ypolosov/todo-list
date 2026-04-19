---
name: plugin-config
type: hooks-config
version: 1
plugin_version: 0.2.1
updated: 2026-04-19
---

# Технический конфиг hooks для todo-list

Читается скриптами плагина.
SME-решения вынесены в `profile.md`.
Версия плагина (`plugin_version`) фиксируется только здесь.

## state_artifact

Состояние Work-альфы хранится в одиночном файле `tasks.md`.

```yaml
state_artifact:
  kind: file
  ref: .claude/sdlc/tasks.md
```

## tdd_scope

Область TDD — исходники приложения.
Исключаются типы и точка входа.

```yaml
tdd_scope:
  include: ['src/**']
  exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/*.d.ts', 'src/main.tsx', 'src/vite-env.d.ts', 'src/test-setup.ts']
```

## tdd_pairs

Пары source↔test: co-located в том же каталоге.

```yaml
tdd_pairs:
  - source: 'src/(.+)\.ts$'
    test:   'src/\1.test.ts'
  - source: 'src/(.+)\.tsx$'
    test:   'src/\1.test.tsx'
```

## formatter

Prettier как форматер для TS/TSX/CSS/MD.

```yaml
formatter:
  command: 'npx prettier --write'
  exit_code_ok: 0
  scope_globs: ['src/**/*.{ts,tsx,css}', '*.md', '.claude/sdlc/**/*.md']
```

## linter

ESLint с конфигом React + TS.

```yaml
linter:
  command: 'npx eslint'
  exit_code_ok: 0
  scope_globs: ['src/**/*.{ts,tsx}']
```

## coverage_gate

Порог 100 % только для domain и application слоёв.

```yaml
coverage_gate:
  command: 'npx vitest run --coverage'
  thresholds:
    'src/domain/**': 100
    'src/application/**': 100
  exit_code_ok: 0
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
- `plugin_version` — единственный источник истины; другие артефакты не дублируют.
- При апгрейде плагина обновить `plugin_version` и зафиксировать запись в `decisions.md`.
