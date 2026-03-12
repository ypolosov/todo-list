# Todo List -- Architecture Documentation

| Параметр          | Значение                                    |
|-------------------|---------------------------------------------|
| Проект            | Todo List                                   |
| Цель дизайна      | Production development                      |
| Контекст системы  | Greenfield (mature domain)                  |
| Методология       | ADD 3.0 (Attribute-Driven Design)           |
| Статус            | Initialized                                 |
| Дата создания     | 2026-03-12                                  |

## Project Context

Личный однопользовательский инструмент для управления задачами (todo list).
Работает полностью оффлайн в браузере, данные хранятся в localStorage.
Аутентификация отсутствует. Планов на дальнейшее развитие нет -- только MVP.

Технический стек: React (frontend), localStorage (persistence).
Роль бэкенда -- открытый вопрос (CRN-001).

## Architecture Drivers

### Use Cases (Функциональные требования)

| ID     | Название                    | Приоритет |
|--------|-----------------------------|-----------|
| UC-001 | Управление задачами (CRUD)  | High      |
| UC-002 | Категоризация задач         | Medium    |
| UC-003 | Поиск и фильтрация задач   | Medium    |

### Constraints (Ограничения)

| ID      | Название                                       | Статус   |
|---------|------------------------------------------------|----------|
| CON-001 | Только оффлайн, данные в localStorage          | Accepted |
| CON-002 | Без аутентификации, однопользовательский режим  | Accepted |

### Concerns (Архитектурные вопросы)

| ID      | Название                                | Статус |
|---------|-----------------------------------------|--------|
| CRN-001 | React + бэкенд при оффлайн-режиме      | Open   |

## Design Goals

**Production development** -- полная архитектура, достаточная для реализации
командой разработчиков. Включает:

- C4-модель (System Context, Container, Component)
- ADR для каждого значимого решения
- Utility tree с приоритизацией quality attributes
- Deployment view

**Greenfield (mature domain)** -- todo list является хорошо изученным доменом.
Существуют проверенные паттерны и reference architectures, которые можно
использовать как отправную точку.

## Document Map

| Артефакт                | Расположение                              |
|-------------------------|-------------------------------------------|
| Этот документ           | `docs/architecture/README.md`             |
| Kanban-доска            | `docs/architecture/kanban.md`             |
| Utility tree            | `docs/architecture/utility-tree.md`       |
| Architecture Drivers    | `docs/architecture/drivers/`              |
| ADRs (MADR v3)         | `docs/architecture/adrs/`                 |
| Design Decisions        | `docs/architecture/decisions/`            |
| C4 Model (LikeC4)      | `docs/architecture/c4/src/`               |
| Views (экспортированные)| `docs/architecture/views/`                |
| Iteration Logs          | `docs/architecture/iterations/`           |
| Требования              | `docs/requirements/`                      |

## ADD 3.0 Iteration Roadmap

Итерации ещё не начаты. Предварительный план:

1. **Iteration 1** -- Общая структура системы: разрешение CRN-001,
   выбор reference architecture, определение контейнеров
2. **Iteration 2** -- Декомпозиция frontend: компонентная модель React,
   state management, persistence layer
3. **Iteration 3** -- Детализация: UX-flows для UC-001/002/003,
   deployment strategy
