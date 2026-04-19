---
name: roles
type: role-journal
project: todo-list
active_roles: [product-owner]
updated: 2026-04-19
---

# Роли пользователя в проекте todo-list

Журнал ролей; определения ролей — в `catalogs/roles.md` плагина.

## Таблица ролей

| slug | title | активна | last_played_at | phases | interests | alphas |
|---|---|---|---|---|---|---|
| product-owner | Владелец продукта | да | 2026-04-19 | [vision, requirements, operations] | [ценность, приоритеты, метрики] | [Opportunity, Stakeholders, Requirements] |

## Текущая роль

Пользователь играет роль `product-owner`.
Интересы: ценность для пользователя, приоритеты фичей, метрики успеха.
Активные фазы по роли: vision, requirements, operations.

## Журнал смены ролей

### 2026-04-19 — Bootstrap
- Действие: start.
- Роль: product-owner.
- Мотив: выбор пользователя при инициализации проекта.

## Правила

- Активная роль сужает предложения `/sdlc-continue`.
- Одновременно активных ролей может быть несколько.
- Интересы роли влияют на вопросы `sdlc-method-engineering`.
- Расширение каталога ролей — в `catalogs/roles.md` плагина.
