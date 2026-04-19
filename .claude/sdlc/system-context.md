---
name: system-context
type: attention-context
project: todo-list
current_focus: todo-list
updated: 2026-04-19
---

# Фокус внимания на системах todo-list

Реестр систем, на которые пользователь переносил внимание.
Текущая целевая система — корень репозитория `todo-list`.

## Таблица систем внимания

| slug | role_vs_target | kind | last_focused_at | focus_count |
|---|---|---|---|---|
| todo-list | target | materialized | 2026-04-19 | 1 |
| user-product-owner | creation_system | logical | 2026-04-19 | 1 |
| ai-driven-sdlc | creation_system | logical | 2026-04-19 | 1 |

## Границы целевой системы

- **Целевая**: приложение `todo-list` как единая система.
- **Надсистема**: не определена на старте; уточняется в фазе vision.
- **Подсистемы**: не определены; уточняются в фазе architecture.
- **Окружение**: не определено; уточняется в фазе vision.
- **Системы создания**: пользователь (product-owner), плагин `ai-driven-sdlc`.

## Журнал фокусировок

### 2026-04-19 — Bootstrap
- Действие: focus.
- slug: todo-list.
- Мотив: корневая целевая система выбрана пользователем на старте.

## Правила

- Переход целевой смещает `current_focus`.
- Прежняя целевая получает иную роль (supersystem / in_environment).
- Для `kind=materialized` создаётся `<system-root>/README.sdlc.md` (Волна 2).
- Для `kind=logical` описание живёт в `external-systems/<slug>.md`.
