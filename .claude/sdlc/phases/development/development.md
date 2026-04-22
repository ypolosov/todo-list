---
name: development
type: development
phase: development
sme_level: mid
method: Короткоживущие ветки с PR-review и автоматическими проверками кода
tool: GitHub Flow + PR review + Prettier + ESLint + Vite + Vitest + react-testing-library
alphas: [Software System, Work]
disciplines: [software-construction, tdd]
role: product-owner
traces_from:
  [.claude/sdlc/phases/testing/testing.md, .claude/sdlc/phases/architecture/architecture.md]
traces_to: [.claude/sdlc/phases/deployment/deployment.md]
system_of_attention: todo-list
created: 2026-04-22
updated: 2026-04-22
---

# Development: todo-list

## 1. Назначение

Артефакт продвигает альфы Software System и Work.
Реализация системы по TDD Red-Green-Refactor (принцип 5).

## 2. Привязка к фазе и методу

- Фаза: development.
- Уровень SME: mid (эскалация с pet из-за GitHub Flow + конфиги линтера).
- Дисциплины: software-construction, tdd.
- Инструменты: см. `.claude/sdlc/method-tool-extensions.md`.
- Автономность: hitl.

## 3. Содержание

### 3.1. Структура репозитория

```
src/
  domain/         инварианты: Task, TaskList, Filter, TaskId
  application/    use cases и port TaskRepository
  adapters/
    driven/       InMemoryTaskRepository, LocalStorageTaskRepository
    driving/react React UI
tests/
  unit/           Vitest: domain и application (покрытие 100%)
  e2e/            Playwright: smoke-сценарий add-toggle-remove
```

### 3.2. TDD-цикл

Red-Green-Refactor по фиче. Порядок:

1. Domain: `Task`, `TaskId`, `TaskList`, `Filter`.
2. Application: `TaskRepository` (порт), `AddTask`, `ToggleTask`, `RemoveTask`, `ListTasks`, `FilterTasks`.
3. Adapters: `InMemoryTaskRepository`, `LocalStorageTaskRepository`, React UI.
4. E2E: Playwright smoke, склейка слоёв.

На каждом шаге: сначала тест, затем минимальная реализация, затем рефакторинг.

### 3.3. Fitness-функции архитектуры

Автоматизируются через ESLint-правила:

- `no-restricted-imports` в `src/domain/**`: запрет импортов из `src/application/**`, `src/adapters/**`, `react`, `react-dom`.
- `no-restricted-imports` в `src/application/**`: запрет импортов из `src/adapters/**`.
- Принцип 4a: eslint-правило против одиночных и многострочных комментариев в `src/**`.

### 3.4. Команды

| Команда             | Назначение                               |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Vite dev server на http://localhost:5173 |
| `npm run build`     | production build в `dist/`               |
| `npm test`          | Vitest unit + coverage                   |
| `npm run test:e2e`  | Playwright smoke                         |
| `npm run lint`      | ESLint                                   |
| `npm run format`    | Prettier                                 |
| `npm run typecheck` | tsc --noEmit                             |

### 3.5. GitHub Flow

- Ветки feature/_, bugfix/_ отходят от main, короткоживущие.
- Каждое изменение — PR в main.
- PR обязателен даже для одиночного разработчика: self-review формализует принцип 1.
- Merge — squash или merge-commit, на усмотрение автора.

### 3.6. Хранение секретов

- Значения только в `.env`, без коммита.
- Шаблон без значений в `.env.example`.
- На данный момент секреты проекту не требуются.

## 4. Трассируемость

- `traces_from`: `.claude/sdlc/phases/testing/testing.md`, `.claude/sdlc/phases/architecture/architecture.md`.
- `traces_to`: будет заполнено в фазе deployment.
- tdd_pairs и coverage_gate — `.claude/sdlc/plugin-config.md`.
- Extensions матрицы — `.claude/sdlc/method-tool-extensions.md`.

## 5. Критерии готовности

- Артефакт проходит `validate-artifact.sh`.
- `npm test` успешен; coverage-gate из plugin-config.md удовлетворён.
- Vite build без ошибок.
- Линтер без ошибок; формат применён.
- Альфа Software System не ниже Demonstrable (тесты зелёные).
- Альфа Work не ниже Under Control (план по TDD выполняется).
- `check-cross-refs.sh` не находит осиротевших ссылок.
