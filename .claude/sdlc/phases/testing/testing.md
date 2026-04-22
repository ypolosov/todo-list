---
name: testing
type: testing
phase: testing
sme_level: mid
method: Пирамида автоматизированных тестов с покрытием как пороговым критерием
tool: Unit + Integration + E2E • Coverage gate
alphas: [Software System, Requirements, Work]
disciplines: [software-testing, tdd]
role: product-owner
traces_from: [phases/requirements/requirements.md, phases/architecture/architecture.md]
traces_to: []
system_of_attention: todo-list
created: 2026-04-22
updated: 2026-04-23
---

# Testing проекта `todo-list`

## 1. Назначение

Зафиксировать TDD-контракты для всех US/NFR до написания кода (принцип 5).
Продвинуть Requirements до `Acceptable` (критерии выражены исполнимо) и Work до `Prepared`.

## 2. Привязка к фазе и методу

- **Фаза:** testing.
- **Уровень SME:** mid (осознанный upgrade с pet ради учебной ценности).
- **Дисциплины:** software-testing, tdd.
- **Инструменты:** Vitest (unit) + Playwright (E2E) + v8 coverage gate.
- **Автономность по фазе:** hotl.
- **Роль-автор:** product-owner (выступает также тестировщиком на pet-проекте).

## 3. Содержание

### 3.1. Тестовая пирамида

| Уровень | Охват | Инструмент | Количество |
|---|---|---|---|
| Unit | `domain` и `application` слои | Vitest + v8 coverage | по одному файлу на исходник |
| Component | `adapters/ui` React-компоненты | Vitest + React Testing Library + jsdom | 1 тест на компонент |
| Integration | storage adapter с памятью | Vitest + jsdom localStorage | 1–2 теста на `LocalStorageTaskRepository` |
| E2E smoke | один сквозной сценарий | Playwright | 1 тест `add-toggle-remove` |

### 3.2. Политика coverage

- **Цель:** 100% line + branch на `src/domain/**` и `src/application/**`.
- **Исключения:** `src/adapters/**`, `src/main.ts`, `src/**/*.d.ts`.
- **Провайдер:** v8 (встроен в Vitest).
- **Gate:** команда `vitest run --coverage` должна выйти с code 0 при 100%.
- **CI:** на фазе deployment; сейчас проверка локально.

### 3.3. Структура тестов

```
tests/
├── unit/
│   ├── domain/
│   │   ├── task.test.ts
│   │   ├── task-id.test.ts
│   │   ├── filter.test.ts
│   │   └── todo-list.test.ts
│   ├── application/
│   │   ├── add-task.test.ts
│   │   ├── toggle-task.test.ts
│   │   ├── remove-task.test.ts
│   │   ├── change-filter.test.ts
│   │   └── list-tasks.test.ts
│   └── adapters/
│       ├── storage/
│       │   └── local-storage-repository.test.ts
│       └── ui/
│           ├── TaskInput.test.tsx
│           ├── TaskItem.test.tsx
│           ├── TaskList.test.tsx
│           ├── FilterBar.test.tsx
│           └── TodoApp.test.tsx
└── e2e/
    └── add-toggle-remove.spec.ts
```

### 3.4. TDD-контракты по требованиям

Каждый US/NFR превращается в минимум один исполнимый контракт.
Прозо-критерии из requirements.md становятся assertions.

#### US-01 — Добавить задачу

- **AddTaskUseCase**:
  - `addTask("buy milk")` создаёт Task со статусом `active`.
  - `addTask("")` бросает исключение (инвариант `title.length >= 1`).
  - `addTask` с title > 200 символов бросает исключение.
  - После `addTask` репозиторий получает вызов `save(tasks)` с новой задачей.

#### US-02 — Переключить статус

- **ToggleTaskUseCase**:
  - `toggle(id)` меняет active → completed.
  - `toggle(id)` повторно возвращает completed → active.
  - `toggle(unknownId)` бросает исключение `TaskNotFound`.
  - После `toggle` репозиторий получает `save` с обновлённой задачей.

#### US-03 — Удалить задачу

- **RemoveTaskUseCase**:
  - `remove(id)` удаляет задачу из aggregate.
  - `remove(unknownId)` бросает `TaskNotFound`.
  - После `remove` репозиторий получает `save` без удалённой задачи.

#### US-04/05/06 — Фильтры

- **Filter VO**:
  - `new Filter("active" | "completed" | "all")` — валидные значения.
  - `new Filter("foo")` бросает исключение.
  - Default = `all`.
- **ListTasksQuery**:
  - `list(Filter.active)` возвращает только active задачи.
  - `list(Filter.completed)` возвращает только completed.
  - `list(Filter.all)` возвращает все задачи.
- **ChangeFilterUseCase**:
  - `change("active")` обновляет текущий фильтр.
  - Инвалидный фильтр отклонён.

#### NFR-01 — Persistence через localStorage

- **LocalStorageTaskRepository** (integration):
  - `save(tasks); load()` возвращает эквивалентный массив.
  - `load()` из пустого хранилища возвращает `[]`.
  - `load()` из повреждённого JSON возвращает `[]` и логирует ошибку.
  - `load()` из снапшота с неизвестной версией возвращает `[]`.

#### NFR-02 — Без регистрации

- Покрывается отсутствием модулей auth/user.
- Проверяется lint-правилом или архитектурным тестом на import-граф (опционально).

### 3.5. E2E smoke: add-toggle-remove

Один Playwright-тест поверх реального браузера и реального localStorage.

```
tests/e2e/add-toggle-remove.spec.ts:
1. Открыть SPA на локальном dev-сервере.
2. Ввести "buy milk" и подтвердить — задача появляется в списке.
3. Кликнуть на задачу — она отмечается выполненной.
4. Кликнуть "удалить" — задача исчезает.
5. Перезагрузить страницу — список остаётся пустым (persistence).
```

### 3.6. Конфигурация TDD hook (принцип 5)

Будет записана в `plugin-config.md`:

- **tdd_scope.include:** `src/domain/**`, `src/application/**`.
- **tdd_scope.exclude:** `src/adapters/**`, `src/main.ts`, `src/**/*.d.ts`.
- **tdd_pairs:**
  - `src/domain/(.+)\.ts$` ↔ `tests/unit/domain/\1.test.ts`.
  - `src/application/(.+)\.ts$` ↔ `tests/unit/application/\1.test.ts`.
- **Второй слой:** LLM-аудитор проверяет, что assertions соответствуют diff.
- **Третий слой:** coverage-gate 100% на domain+application.

### 3.7. Test doubles

- **`FakeTaskRepository`** в памяти — для unit-тестов application-слоя.
- **`LocalStorageMock`** (jsdom встроенный) — для integration storage-теста.
- **RTL `render` + `screen`** — для тестов React-компонентов adapters/ui.
- **Фейковые use cases через context/props** — изолируют React-компоненты от логики.
- **Реальный localStorage** — только в Playwright E2E.
- **Запрет:** моки для domain-сущностей (тестируются напрямую).

### 3.8. Отвергнутые альтернативы

- **Jest** — требует доп. конфига ESM+TS, медленнее на Vite-проекте.
- **Node test runner** — скудный тулинг, не знает о Vite resolution.
- **Cypress** — тесты в iframe браузера, сложнее с DOM-изоляцией.
- **Coverage 100% на весь src/** — моки DOM делают тесты хрупкими.
- **Coverage 80% без исключений** — пропускает дыры в key-логике.

## 4. Трассируемость

- **traces_from:**
  - `phases/requirements/requirements.md` — US/NFR как источник контрактов.
  - `phases/architecture/architecture.md` — порты и слои для изоляции тестов.
- **traces_to:** `phases/development/` (реализация по TDD-циклу).
- **Альфы:** Requirements → `Acceptable`; Work → `Prepared`.

### Матрица требование ↔ тест

| Требование | Тест-файл |
|---|---|
| US-01 add | `tests/unit/application/add-task.test.ts` + `tests/unit/domain/task.test.ts` |
| US-02 toggle | `tests/unit/application/toggle-task.test.ts` + `tests/unit/domain/todo-list.test.ts` |
| US-03 remove | `tests/unit/application/remove-task.test.ts` |
| US-04..US-06 | `tests/unit/application/change-filter.test.ts` + `list-tasks.test.ts` + `domain/filter.test.ts` |
| NFR-01 | `tests/unit/adapters/storage/local-storage-repository.test.ts` + `tests/e2e/add-toggle-remove.spec.ts` |
| NFR-02 | отсутствие auth-модуля; архитектурная проверка |

## 5. Критерии готовности

- Артефакт валиден; frontmatter и секции по мета-шаблону.
- Все US/NFR имеют минимум один TDD-контракт.
- Структура тестов зафиксирована (`tests/` дерево).
- Политика coverage явная и измеримая.
- `plugin-config.md` обновлён: `tdd_scope`, `tdd_pairs`.
- `traces_from` указывает на requirements и architecture.
- Отвергнутые альтернативы зафиксированы с мотивом.
