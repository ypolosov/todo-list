---
name: testing
type: testing
phase: testing
sme_level: mid
method: Пирамида автоматизированных тестов с покрытием как пороговым критерием
tool: Vitest (unit) + Playwright (E2E smoke)
alphas: [Software System, Requirements]
disciplines: [software-testing, tdd]
role: product-owner
traces_from:
  [
    .claude/sdlc/phases/requirements/requirements.md,
    .claude/sdlc/phases/architecture/architecture.md,
  ]
traces_to: [.claude/sdlc/phases/development/development.md]
system_of_attention: todo-list
created: 2026-04-22
updated: 2026-04-22
---

# Testing: todo-list

## 1. Назначение

Артефакт продвигает альфы Software System и Requirements.
Формулировка тестов как контрактов будущего поведения (TDD-first, принцип 5).

## 2. Привязка к фазе и методу

- Фаза: testing.
- Уровень SME: mid (эскалация от pet профиля из-за выбранных инструментов).
- Дисциплины: software-testing, tdd.
- Инструмент: Vitest + Playwright (см. `.claude/sdlc/method-tool-extensions.md`).
- Автономность фазы: hotl (human-on-the-loop).

## 3. Содержание

### 3.1. Пирамида тестов

| Уровень   | Инструмент | Объём                          | Где           |
| --------- | ---------- | ------------------------------ | ------------- |
| unit      | Vitest     | domain, application            | `tests/unit/` |
| e2e smoke | Playwright | сценарий add → toggle → remove | `tests/e2e/`  |

Интеграционных тестов нет на этом уровне. Склейка слоёв проверяется через E2E. Domain и application изолируются через `InMemoryTaskRepository`.

### 3.2. Coverage-gate

| Область              | Целевое покрытие | Блокирует сборку |
| -------------------- | ---------------- | ---------------- |
| `src/domain/**`      | 100%             | да               |
| `src/application/**` | 100%             | да               |
| `src/adapters/**`    | без gate         | нет              |
| `tests/**`           | исключено        | —                |

Конфигурация coverage-gate — в `.claude/sdlc/plugin-config.md`.

### 3.3. TDD-контракты (unit-тесты domain)

Тесты пишутся до реализации. Контракты именуются по требованиям R-\*.

| Тест-контракт                                              | Проверяет       | Требование |
| ---------------------------------------------------------- | --------------- | ---------- |
| `Task.create()` возвращает задачу со статусом active       | domain.Task     | R-1        |
| `Task.toggle()` переключает active↔completed               | domain.Task     | R-2        |
| `TaskList.add(task)` добавляет задачу; порядок сохраняется | domain.TaskList | R-1, R-4   |
| `TaskList.remove(id)` удаляет задачу по id                 | domain.TaskList | R-3        |
| `TaskList.filter('active')` возвращает только active       | domain.Filter   | R-5        |
| `TaskList.filter('completed')` возвращает только completed | domain.Filter   | R-6        |
| `TaskList.filter('all')` возвращает все                    | domain.Filter   | R-7        |

### 3.4. TDD-контракты (unit-тесты application)

| Тест-контракт                                              | Проверяет             | Требование |
| ---------------------------------------------------------- | --------------------- | ---------- |
| `AddTask` сохраняет задачу через TaskRepository            | use case              | R-1, R-8   |
| `ToggleTask` обновляет статус и сохраняет                  | use case              | R-2, R-8   |
| `RemoveTask` удаляет и сохраняет                           | use case              | R-3, R-8   |
| `ListTasks` возвращает задачи из repository                | use case              | R-4, R-9   |
| `FilterTasks` возвращает подмножество                      | use case              | R-5..R-7   |
| Все use cases работают с `InMemoryTaskRepository` в тестах | изоляция от адаптеров | N-2        |

### 3.5. E2E-сценарий (Playwright smoke)

Один сквозной сценарий, проверяет склейку всех слоёв через LocalStorage.

```
1. Открыть `/`
2. Ввести «купить хлеб», нажать Add → задача в списке active
3. Кликнуть checkbox → задача в completed
4. Перезагрузить страницу → состояние сохранилось (проверка R-8, R-9)
5. Нажать Remove → задача исчезла
6. Переключить фильтр all/active/completed → корректная выдача
```

Покрывает: R-1, R-2, R-3, R-5..R-9, N-3, N-4.

### 3.6. Fitness-функции архитектуры

| Функция                   | Проверка                                                                   | Реализация                          |
| ------------------------- | -------------------------------------------------------------------------- | ----------------------------------- |
| Direction of dependencies | `src/domain/**` не импортирует из `src/application/**` и `src/adapters/**` | lint-правило (выбор на development) |
| Adapter isolation         | `src/domain/**` не импортирует React/LocalStorage                          | lint-правило                        |
| Port contract             | `TaskRepository` имеет реализации: LocalStorage + InMemory                 | проверка экспортов                  |

Автоматизация fitness-функций — задача фазы development.

## 4. Трассируемость

- `traces_from`: `.claude/sdlc/phases/requirements/requirements.md`, `.claude/sdlc/phases/architecture/architecture.md`.
- `traces_to`: будет заполнено в фазе development.
- Матрица требование ↔ тест — таблицы 3.3, 3.4, 3.5.
- Состояние альф: `.claude/sdlc/alphas.md`.
- Расширения матрицы: `.claude/sdlc/method-tool-extensions.md`.

## 5. Критерии готовности

- Артефакт проходит `validate-artifact.sh`.
- Альфа Requirements не ниже Acceptable: критерии приёмки выведены как тест-контракты.
- Альфа Software System остаётся на Architecture Selected до запуска тестов на реальном коде.
- Каждое требование R-\* покрыто минимум одним тест-контрактом.
- Coverage-gate зафиксирован в plugin-config.md.
- `check-cross-refs.sh` не находит осиротевших ссылок.
