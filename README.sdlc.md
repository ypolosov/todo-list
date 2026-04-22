---
name: todo-list
type: system-readme
kind: materialized
role_vs_target: target
project: todo-list
last_focused_at: 2026-04-22
focus_count: 1
updated: 2026-04-22
---

# Система внимания: todo-list

Sidecar-описание целевой системы проекта todo-list.
Живёт рядом с корневым `README.md`; не заменяет его.

## 1. Назначение и границы

todo-list — учебное приложение для демо доклада «AI-driven SDLC».
Граница системы — корень репозитория: код, конфигурация, артефакты SDLC.
Запись в реестре: `system-context.md` (slug `todo-list`).

## 2. Текущий фокус

- role_vs_target: `target`.
- last_focused_at: 2026-04-22.
- focus_count: 1.

## 3. Состояние альф относительно системы

| Альфа | Состояние | Артефакт-свидетельство |
|---|---|---|
| Opportunity | — | — |
| Stakeholders | Recognized | `.claude/sdlc/roles.md` |
| Requirements | — | — |
| Software System | — | — |
| Work | — | — |
| Team | Seeded | `.claude/sdlc/roles.md` |
| Way of Working | Principles Established | `.claude/sdlc/plugin-config.md` |

Источник истины — агент `sdlc-alpha-tracker` (принцип 13).

## 4. Связанные артефакты SDLC

- `.claude/sdlc/profile.md` — SME-профиль фаз.
- `.claude/sdlc/plugin-config.md` — конфиг hooks.
- `.claude/sdlc/alphas.md` — состояние альф.
- `.claude/sdlc/decisions.md` — журнал альтернатив.
- `.claude/sdlc/tasks.md` — state-артефакт Work-альфы.

Артефакты фаз добавляются по ходу `/sdlc-phase`.

## 5. Роли, активные в системе

| Роль | Интересы |
|---|---|
| product-owner | ценность, стейкхолдеры, приоритеты фичей |

Каталог ролей — `catalogs/roles.md` плагина.
