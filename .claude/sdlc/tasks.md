---
name: tasks
type: state-artifact
project: todo-list
kind: file
updated: 2026-04-23T12:00
---

# Состояние работ

State-артефакт проекта (принцип 9). Читается агентом `sdlc-state-reader`.
Активные задачи ссылаются на истории из `phases/requirements/requirements.md`
и порядок реализации из `phases/development/development.md`.

## Активные задачи

Core-ядро (domain + application) собрано и покрыто на 100%.
Ожидает коммита пользователя; после коммита — T-INFRA-01 (npm install) и T-DEV-11 (storage-адаптер).

## TDD backlog (development)

| # | Task ID | Файлы | Источник | Статус |
|---|---|---|---|---|
| 1 | T-DEV-01 | `tests/unit/domain/task-id.test.ts` + `src/domain/task-id.ts` | US-01 | done 2026-04-23 |
| 2 | T-DEV-02 | `tests/unit/domain/task.test.ts` + `src/domain/task.ts` | US-01 | done 2026-04-23 |
| 3 | T-DEV-03 | `tests/unit/domain/filter.test.ts` + `src/domain/filter.ts` | US-04..US-06 | done 2026-04-23 |
| 4 | T-DEV-04 | `src/domain/task-repository.ts` (port-интерфейс, без пары) | NFR-01 | done 2026-04-23 |
| 5 | T-DEV-05 | `tests/unit/domain/todo-list.test.ts` + `src/domain/todo-list.ts` | US-01..US-03 | done 2026-04-23 |
| 6 | T-DEV-06 | `tests/unit/application/add-task.test.ts` + `src/application/add-task.ts` | US-01 | done 2026-04-23 |
| 7 | T-DEV-07 | `tests/unit/application/toggle-task.test.ts` + `src/application/toggle-task.ts` | US-02 | done 2026-04-23 |
| 8 | T-DEV-08 | `tests/unit/application/remove-task.test.ts` + `src/application/remove-task.ts` | US-03 | done 2026-04-23 |
| 9 | T-DEV-09 | `tests/unit/application/change-filter.test.ts` + `src/application/change-filter.ts` | US-04..US-06 | done 2026-04-23 |
| 10 | T-DEV-10 | `tests/unit/application/list-tasks.test.ts` + `src/application/list-tasks.ts` | US-04..US-06 | done 2026-04-23 |
| 11 | T-DEV-11 | `tests/unit/adapters/storage/local-storage-repository.test.ts` + `src/adapters/storage/local-storage-repository.ts` + `src/adapters/storage/task-schema.ts` | NFR-01 | pending (блок: нужны `zod`, `jsdom`) |
| 12 | T-DEV-12 | `tests/unit/adapters/ui/*.test.tsx` + `src/adapters/ui/*.tsx` | US-01..US-06 | pending (блок: React, RTL, @vitejs/plugin-react, jsdom) |
| 13 | T-DEV-13 | `src/main.tsx` + `src/adapters/ui/App.tsx` | US-01..US-06 | pending |
| 14 | T-DEV-14 | `tests/e2e/add-toggle-remove.spec.ts` + `playwright install` | US-01..US-03, NFR-01 | pending |

## Инфраструктурные задачи

| ID | Задача | Статус |
|---|---|---|
| T-INFRA-01 | `npm install` (актуализация `node_modules` под `package.json`) | pending |
| T-INFRA-02 | `npx playwright install chromium` | pending |
| T-INFRA-03 | Вернуть `environment: 'jsdom'` в `vitest.config.ts` после установки jsdom | pending |
| T-INFRA-04 | Вернуть `setupFiles: ['./tests/setup.ts']` после установки `@testing-library/jest-dom` | pending |
| T-INFRA-05 | Добавить `@vitejs/plugin-react` обратно в `vitest.config.ts` при первом UI-тесте | pending |
| T-INFRA-06 | Добавить `eslint-plugin-react-hooks` в flat config при первом UI-коде | pending |

## Журнал завершённых задач

| Дата | Задача | Результат |
|---|---|---|
| 2026-04-22 | bootstrap SDLC-каркаса | создан `.claude/sdlc/` |
| 2026-04-22 | фаза Vision | `phases/vision/vision.md` |
| 2026-04-22 | фаза Requirements | `phases/requirements/requirements.md` |
| 2026-04-22 | фаза Architecture | `phases/architecture/architecture.md` |
| 2026-04-22 | фаза Testing | `phases/testing/testing.md` |
| 2026-04-23 | фаза Development (setup) | `phases/development/development.md`, scaffolding проекта |
| 2026-04-23 | Архитектурная ревизия | Vanilla TS → React 18 в `adapters/ui` |
| 2026-04-23 | T-DEV-01 TaskId VO | TDD red→green; 5 тестов pass; 100% coverage |
| 2026-04-23 | T-DEV-02 Task entity | TDD red→green; 7 тестов pass; 100% coverage |
| 2026-04-23 | T-DEV-03 Filter VO | TDD red→green; 8 тестов pass; 100% coverage |
| 2026-04-23 | T-DEV-04 TaskRepository port | интерфейс-файл; добавлен в tdd_scope exclude |
| 2026-04-23 | T-DEV-05 TodoList aggregate | TDD red→green; 11 тестов pass; 100% coverage |
| 2026-04-23 | T-DEV-06 AddTaskUseCase | TDD red→green; 4 теста pass; 100% coverage |
| 2026-04-23 | T-DEV-07 ToggleTaskUseCase | TDD red→green; 3 теста pass; 100% coverage |
| 2026-04-23 | T-DEV-08 RemoveTaskUseCase | TDD red→green; 2 теста pass; 100% coverage |
| 2026-04-23 | T-DEV-09 ChangeFilterUseCase | TDD red→green; 2 теста pass; 100% coverage |
| 2026-04-23 | T-DEV-10 ListTasksQuery | TDD red→green; 4 теста pass; 100% coverage |
| 2026-04-23 | Core ready for commit | 46 тестов pass; 100% coverage на domain+application |
