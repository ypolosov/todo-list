---
name: plan
type: testing
phase: testing
sme_level: pet
method: unit-testing-with-mocks
tool: vitest
alphas: [Software System, Requirements]
disciplines: [software-testing, test-driven-development]
role: architect
traces_from: [.claude/sdlc/phases/requirements/todo.md, .claude/sdlc/phases/architecture/sketch.md]
traces_to: []
system_of_attention: todo-list
created: 2026-04-22
updated: 2026-04-22
---

# Test plan: todo-list

## 1. Назначение

Зафиксировать стратегию тестирования и контракты поведения до кода.
TDD-first (принцип 5): тесты пишутся до реализации.

## 2. Привязка к фазе и методу

- Фаза: testing.
- Уровень SME: pet.
- Метод: unit-testing-with-mocks.
- Инструмент: vitest (см. `decisions.md` 2026-04-22 13:00).
- Целевая система: `todo-list`.

## 3. Содержание

### Пирамида тестов

| Уровень | Объём | Инструмент |
|---|---|---|
| Unit | `TaskService` (логика) | vitest + in-memory mock `TaskStore` |
| Contract | Интерфейс `TaskStore` save/load | vitest через контракт mock ↔ real |
| Smoke UI | Один сквозной сценарий в DOM | vitest + happy-dom |

E2E с Playwright не применяется (избыточно для pet).

### Контракт TaskStore

```ts
interface TaskStore {
  save(tasks: Task[]): void;
  load(): Task[];
}
```

- `save(tasks)` сериализует массив в JSON.
- `load()` возвращает массив; пустой при отсутствии данных.
- Реализации: `LocalStorageTaskStore`, `InMemoryTaskStore` (для тестов).

### Тест-контракты (написать до кода)

| id | Требование | Ожидание | Файл теста |
|---|---|---|---|
| T1 | R1 | `TaskService.create(title)` добавляет задачу, возвращает id | `src/task-service.test.ts` |
| T2 | R1 | Созданная задача имеет `done=false` и непустой id | `src/task-service.test.ts` |
| T3 | R2 | `TaskService.toggle(id)` инвертирует флаг `done` | `src/task-service.test.ts` |
| T4 | R3 | `TaskService.remove(id)` удаляет задачу из списка | `src/task-service.test.ts` |
| T5 | R4 | `TaskService.list()` читает `TaskStore.load()` | `src/task-service.test.ts` |
| T6 | R4 | Изменения вызывают `TaskStore.save()` один раз | `src/task-service.test.ts` |
| T7 | contract | `InMemoryTaskStore` и `LocalStorageTaskStore` проходят общий набор | `src/task-store.contract.test.ts` |
| T8 | smoke | Пользователь создаёт, отмечает, удаляет задачу в DOM | `src/ui.smoke.test.ts` |

### Целевое покрытие

- `TaskService`: **100%** строк и ветвлений.
- `TaskStore` (обе реализации): контрактные тесты T7.
- `UI`, `AppBootstrap`: без числового порога; покрытие через T8.

### Fitness-функции (автоматические проверки)

| Проверка | Инструмент | Триггер |
|---|---|---|
| Зелёные тесты | vitest | `npm test` + CI-gate |
| Формат кода | Prettier | PreToolUse/PostToolUse hooks |
| Линт | ESLint | PreToolUse/PostToolUse hooks |
| TDD-пары | `enforce-tdd.sh` | hook на Write/Edit |

Настройка форматера/линтера — на фазе development (`plugin-config.md`).

## 4. Трассируемость

- traces_from: `phases/requirements/todo.md` (R1..R4), `phases/architecture/sketch.md` (компоненты).
- traces_to: заполняется на фазе development (реализующий код).
- Продвигаемые альфы: Software System → Demonstrable; Requirements → Acceptable.

## 5. Критерии готовности

- Тест-контракты T1..T8 описаны и привязаны к требованиям.
- Контракт `TaskStore` зафиксирован.
- Целевое покрытие и fitness-функции перечислены.
- `validate-artifact.sh` проходит.
- Продвижение Software System до Usable возможно только при зелёных тестах на фазе development.

## Замечания

- Роль `tester` не назначена; интерес тестирования несёт `architect`.
- При появлении выделенной роли — добавить в `roles.md` (separate decision).
