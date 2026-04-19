---
name: roles
type: role-journal
project: todo-list
active_roles: [product-owner, developer, tester]
updated: 2026-04-19
---

# Роли пользователя в проекте todo-list

Журнал ролей; определения ролей — в `catalogs/roles.md` плагина.

## Таблица ролей

| slug | title | активна | last_played_at | phases | interests | alphas |
|---|---|---|---|---|---|---|
| product-owner | Владелец продукта | да | 2026-04-19 | [vision, requirements, operations] | [ценность, приоритеты, метрики] | [Opportunity, Stakeholders, Requirements] |
| developer | Разработчик | да | 2026-04-19 | [development, testing] | [сопровождаемость, скорость фидбэка, автоматизация] | [Software System, Work] |
| tester | Тестировщик | да | 2026-04-19 | [testing, development] | [покрытие поведения, устойчивость, регрессии] | [Software System, Requirements] |

## Текущая роль

Пользователь играет роли `product-owner`, `developer`, `tester`.
Pet-масштаб: один человек совмещает все роли проекта.
Активные фазы: vision, requirements, architecture, testing, development, operations.

## Журнал смены ролей

### 2026-04-19 — Bootstrap
- Действие: start.
- Роль: product-owner.
- Мотив: выбор пользователя при инициализации проекта.

### 2026-04-19 — Добавлены developer и tester
- Действие: start.
- Роли: developer, tester.
- Мотив: вход в TDD-first цикл; pet-масштаб; один исполнитель.

## Правила

- Активная роль сужает предложения `/sdlc-continue`.
- Одновременно активных ролей может быть несколько.
- Интересы роли влияют на вопросы `sdlc-method-engineering`.
- Расширение каталога ролей — в `catalogs/roles.md` плагина.
