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

# Описание системы `todo-list`

Sidecar-описание целевой системы SDLC.
Не трогает существующий корневой `README.md`.

## 1. Назначение и границы

`todo-list` — pet-проект одного владельца.
Граница системы — корень репозитория.
Запись в реестре внимания: `system-context.md`.

## 2. Текущий фокус

- `role_vs_target`: target.
- `last_focused_at`: 2026-04-22.
- `focus_count`: 1.

## 3. Состояние альф относительно системы

Данные получаются через агента `sdlc-alpha-tracker`.

| Альфа | Состояние | Артефакт-свидетельство |
|---|---|---|
| Opportunity | — | — |
| Stakeholders | Recognized | `.claude/sdlc/roles.md` |
| Requirements | — | — |
| Software System | — | — |
| Work | Initiated | `.claude/sdlc/decisions.md` |
| Team | Formed | `.claude/sdlc/roles.md` |
| Way of Working | Foundation Established | `.claude/sdlc/profile.md`, `.claude/sdlc/plugin-config.md` |

## 4. Связанные артефакты SDLC

- `.claude/sdlc/profile.md` — SME-решения по фазам.
- `.claude/sdlc/plugin-config.md` — конфиг hooks.
- `.claude/sdlc/alphas.md` — журнал альф.
- `.claude/sdlc/roles.md` — играемые роли.
- `.claude/sdlc/decisions.md` — журнал альтернатив.
- `.claude/sdlc/tasks.md` — state-артефакт.

## 5. Роли, активные в системе

- `product-owner` — Владелец продукта.
  Интересы: ценность для пользователя, приоритеты, метрики успеха.
  Каталог: `catalogs/roles.md` плагина.
