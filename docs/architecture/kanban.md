# Architecture Design Kanban -- Todo List

> Отслеживание прогресса проектирования архитектуры по ADD 3.0.
> Каждый driver перемещается по колонкам по мере проработки.

## Not Addressed

Драйверы, которые ещё не рассматривались в итерациях ADD.

| ID      | Тип        | Название                                      | Приоритет |
|---------|------------|-----------------------------------------------|-----------|
| _(пусто)_ | | | |

## Partially Addressed

Драйверы, которые частично проработаны (решение принято, но не полностью
реализовано в архитектурной модели).

| ID      | Тип        | Название                                       | Итерация | Примечание |
|---------|------------|------------------------------------------------|----------|------------|
| _(пусто)_ | | | | |

## Completely Addressed

Драйверы, полностью проработанные в архитектуре (решение принято,
отражено в C4-модели, зафиксировано в ADR).

| ID      | Тип        | Название                                          | Итерация | ADR     |
|---------|------------|---------------------------------------------------|----------|---------|
| CRN-001 | Concern    | React + бэкенд при оффлайн-режиме                | ITER-001 | ADR-001 |
| CON-002 | Constraint | Без аутентификации, однопользовательский режим     | ITER-001 | ADR-001 |
| CON-001 | Constraint | Только оффлайн, данные в localStorage             | ITER-002 | ADR-002, DD-002 |
| UC-001  | Use Case   | Управление задачами (CRUD)                        | ITER-002 | ADR-002 |
| UC-002  | Use Case   | Категоризация задач                               | ITER-002 | ADR-002 |
| UC-003  | Use Case   | Поиск и фильтрация задач                          | ITER-002 | ADR-002 |

---

## Quality Attributes Status

> Отслеживание проработки quality attribute scenarios в итерациях ADD.

| ID    | Scenario                                                       | Приоритет | Статус | Итерация | Примечание |
|-------|----------------------------------------------------------------|-----------|--------|----------|------------|
| QA-U1 | Создание задачи за 2 действия                                 | (H, L)   | Addressed | ITER-002 | TodoForm обеспечивает ввод + Enter |
| QA-R1 | Данные не теряются при перезагрузке                            | (H, L)   | Addressed | ITER-002 | useTodos сохраняет через TodoRepository при каждой мутации |
| QA-T1 | Бизнес-логика тестируется без DOM/localStorage                 | (M, M)   | Addressed | ITER-002 | Domain Layer -- pure functions, Repository pattern для DI |
| QA-M1 | Добавление поля задачи <= 3 модуля                            | (M, M)   | Addressed | ITER-002 | Todo model + TodoService + TodoForm |
| QA-R2 | Fallback при ошибке сериализации                              | (M, M)   | Addressed | ITER-002 | LocalStorageRepository обрабатывает parse errors |
| QA-M2 | Замена storage не затрагивает бизнес-логику                    | (L, M)   | Addressed | ITER-002 | TodoRepository interface абстрагирует storage (DD-002) |
| QA-U2 | Фильтрация < 100ms                                           | (M, L)   | Acknowledged | ITER-002 | Pure-функции в TodoService, конкретная оценка -- при реализации |
| QA-P1 | Загрузка < 2 секунды                                          | (M, L)   | Not Addressed | -- | Будет зависеть от bundle size и deployment |
| QA-P2 | 500 задач без лагов                                           | (L, L)   | Not Addressed | -- | Не критично для MVP |

---

## Iteration Log

| Итерация | Цель | Статус | Лог |
|----------|------|--------|-----|
| ITER-001 | Reference architecture: роль бэкенда, декомпозиция на контейнеры | Completed | [ITER-001](iterations/ITER-001.md) |
| ITER-002 | Компонентная декомпозиция frontend container | Completed | [ITER-002](iterations/ITER-002.md) |
