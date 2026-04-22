---
name: profile
type: sdlc-profile
project: todo-list
created: 2026-04-22
updated: 2026-04-22

---

# SME-профиль проекта todo-list


Методологический слой решений пользователя.
Уровни и инструменты фаз заполняются через `/sdlc-phase`.

## Таблица SME по фазам

| Фаза | Уровень SME | Выбранный метод | Выбранный инструмент | default_autonomy |
|---|---|---|---|---|
| vision | pet | lean-canvas | md-lean-canvas | hitl |
| requirements | pet | flat-todo-list | md-flat-todo | hitl |
| architecture | pet | lightweight-architecture-sketch | md-architecture-sketch | hitl |
| development | pet | tdd-scaffolding | npm+tsx+prettier+eslint | hitl |
| testing | pet | unit-testing-with-mocks | vitest | hitl |
| deployment | pet | static-site-ci-cd | github-actions+github-pages | hitl |
| operations | pet | static-site-lightweight-ops | github-actions-runs+manual-check | hitl |

Конкретный метод и инструмент выбираются `sdlc-method-engineering` на фазе.

## Активная роль

- `architect` — см. `roles.md`.

## История изменений SME

| Дата | Фаза | Было | Стало | Мотив |
|---|---|---|---|---|
| 2026-04-22 | все | — | pet | Bootstrap: демо-проект по масштабу pet. |
| 2026-04-22 | vision | — | lean-canvas + md-lean-canvas | Метод-инжиниринг фазы vision в режиме HOOTL. |
| 2026-04-22 | requirements | — | flat-todo-list + md-flat-todo | Метод-инжиниринг фазы requirements в режиме HOOTL. |
| 2026-04-22 | architecture | — | lightweight-architecture-sketch + md-architecture-sketch | Метод-инжиниринг фазы architecture в режиме HOOTL. |
| 2026-04-22 | testing | — | unit-testing-with-mocks + vitest | Метод-инжиниринг фазы testing в режиме HOOTL. |
| 2026-04-22 | development | — | tdd-scaffolding + npm+tsx+prettier+eslint | Метод-инжиниринг фазы development в режиме HOOTL. |
| 2026-04-22 | deployment | — | static-site-ci-cd + github-actions+github-pages | Метод-инжиниринг фазы deployment в режиме HOOTL. |
| 2026-04-22 | operations | — | static-site-lightweight-ops + github-actions-runs+manual-check | Метод-инжиниринг фазы operations в режиме HOOTL. |
