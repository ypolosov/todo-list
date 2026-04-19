---
name: tasks
type: work-state
project: todo-list
updated: 2026-04-19
---

# Состояние задач Work-альфы todo-list

State-артефакт для Work-альфы (принцип 9).
Читается агентом `sdlc-state-reader`.

## Активные задачи

_пока нет_

## Ожидающие задачи

- Запустить фазу `requirements` через `/sdlc-phase requirements`.
  - Альфы: Requirements, Stakeholders.
  - Роль: product-owner.

## Завершённые задачи

### 2026-04-19 — Bootstrap SDLC-каркаса
- Создан `.claude/sdlc/` с обязательными артефактами.
- Зафиксирован SME-уровень pet и роль product-owner.
- Выбран state-артефакт: файл `tasks.md`.

### 2026-04-19 — Фаза Vision
- Артефакт: `.claude/sdlc/phases/vision/vision.md`.
- Opportunity: Identified → Value Established.
- Stakeholders: Recognized → Represented.
- Метод: product-discovery + mission-statement.

## Правила

- Новая задача — запись со ссылкой на продвигаемую альфу.
- Завершение задачи требует артефакта-свидетельства.
- Аудит сверяет задачи с журналом альф.
