---
name: development
type: development
phase: development
sme_level: pet
method: Линейная история изменений в одной основной ветке
tool: Trunk-based на main + Conventional Commits + Semantic Versioning
alphas: [Software System, Work]
disciplines: [software-construction, tdd]
role: product-owner
traces_from: [phases/architecture/architecture.md, phases/testing/testing.md]
traces_to: []
system_of_attention: todo-list
created: 2026-04-23
updated: 2026-04-23
---

# Development проекта `todo-list`

## 1. Назначение

Реализовать US-01..US-06 и NFR-01..NFR-02 по TDD-циклу Red-Green-Refactor.
Продвинуть Work до `Started`; подготовить Software System к Demonstrable.

## 2. Привязка к фазе и методу

- **Фаза:** development.
- **Уровень SME:** pet.
- **Дисциплины:** software-construction, tdd.
- **Workflow:** Trunk-based на main + Conventional Commits + Semantic Versioning.
- **Автономность по фазе:** hootl.
- **Роль-автор:** product-owner (выступает также разработчиком).

## 3. Содержание

### 3.1. Технологический стек

| Компонент | Инструмент | Версия | Мотив |
|---|---|---|---|
| Язык | TypeScript | ^5.4 | статическая типизация |
| Runtime | React | ^18.3 | выбор пользователя; знакомый тулинг |
| Bundler / dev-server | Vite | ^5.2 | быстрый HMR, native ESM |
| Unit runner | Vitest | ^1.5 | Vite-native, v8 coverage |
| Component test | React Testing Library | ^15 | user-centric queries |
| DOM | jsdom | ^24 | через vitest environment |
| E2E | Playwright | ^1.44 | auto-waiting, trace viewer |
| Runtime-схема | zod | ^3.23 | композируемая валидация |
| Formatter | Prettier | ^3.2 | детерминированный (принцип 6) |
| Linter | ESLint + typescript-eslint + eslint-plugin-react + eslint-plugin-react-hooks | ^8.57 | статический анализ |
| Commits | Conventional Commits (вручную) | — | ясная история |
| Версия | Semantic Versioning в package.json | — | ясная эволюция |

### 3.2. Workflow разработки

- **Ветка:** `main` (trunk-based); feature-ветки не используются в pet-режиме.
- **Коммит:** `type(scope): subject`; типы `feat`, `fix`, `refactor`, `test`, `docs`, `chore`.
- **Частота:** один Red-Green-Refactor цикл = один или несколько последовательных коммитов.
- **Порядок коммитов в цикле:**
  1. `test: US-XX red — add failing test for <описание>` (RED).
  2. `feat: US-XX green — minimal implementation` (GREEN).
  3. `refactor: US-XX polish — extract/simplify` (REFACTOR, опционально).
- **Push:** вручную после прохождения unit + coverage gate локально.

### 3.3. TDD-цикл

Для каждой фичи по порядку из backlog:

1. **RED** — написать падающий тест в `tests/unit/...` по TDD-контракту из `testing.md`.
2. Запустить `npm test` — убедиться, что тест красный.
3. **GREEN** — минимальная реализация в `src/...`, достаточная для прохождения теста.
4. Запустить `npm test` — все тесты зелёные; coverage gate проходит.
5. **REFACTOR** — улучшить код без изменения поведения; тесты остаются зелёными.
6. Запустить `npm run lint && npm run format:check`.
7. Закоммитить цикл.

### 3.4. Порядок реализации (bottom-up)

| # | Feature | Тесты | Источник | Альфа |
|---|---|---|---|---|
| 1 | `Task` entity + invariants | `tests/unit/domain/task.test.ts` | US-01 | Software System |
| 2 | `TaskId` VO | `tests/unit/domain/task-id.test.ts` | US-01 | Software System |
| 3 | `Filter` VO | `tests/unit/domain/filter.test.ts` | US-04..US-06 | Software System |
| 4 | `TaskRepository` port | (интерфейс; тест через реализацию) | NFR-01 | Software System |
| 5 | `TodoList` aggregate | `tests/unit/domain/todo-list.test.ts` | US-01..US-03 | Software System |
| 6 | `AddTaskUseCase` | `tests/unit/application/add-task.test.ts` | US-01 | Software System |
| 7 | `ToggleTaskUseCase` | `tests/unit/application/toggle-task.test.ts` | US-02 | Software System |
| 8 | `RemoveTaskUseCase` | `tests/unit/application/remove-task.test.ts` | US-03 | Software System |
| 9 | `ChangeFilterUseCase` + `ListTasksQuery` | `change-filter.test.ts`, `list-tasks.test.ts` | US-04..US-06 | Software System |
| 10 | `LocalStorageTaskRepository` + schema | `tests/unit/adapters/storage/local-storage-repository.test.ts` | NFR-01 | Software System |
| 11 | React-компоненты UI | `tests/unit/adapters/ui/*.test.tsx` (RTL) | US-01..US-06 | Software System |
| 12 | `App.tsx` composition root | integration через RTL | US-01..US-06, NFR-01 | Software System |
| 13 | Playwright smoke | `tests/e2e/add-toggle-remove.spec.ts` | US-01..US-03, NFR-01 | Software System |

### 3.5. Форматер и линтер (принцип 6)

- **Prettier:** `prettier --check .` / `prettier --write .`
- **ESLint:** `eslint . --ext .ts,.tsx` с предустановками:
  - `@typescript-eslint/recommended`
  - `plugin:react/recommended`
  - `plugin:react-hooks/recommended`
- **Запуск:** перед каждым коммитом (локально).
- **Scope:** `src/**` и `tests/**`.

### 3.6. Запрет на комментарии (принцип 4a)

- В `src/**/*.ts(x)` — комментариев нет; код самодокументируемый.
- В `tests/**/*.ts(x)` — комментариев нет; `describe`/`it` говорят сами.
- Whitelist исключений — в `plugin-config.md.no_comments_whitelist`.

### 3.7. Команды npm scripts

| Скрипт | Команда | Назначение |
|---|---|---|
| `dev` | `vite` | dev-server |
| `build` | `tsc -b && vite build` | продакшн-бандл |
| `preview` | `vite preview` | превью бандла |
| `test` | `vitest run` | unit + component (jsdom) |
| `test:watch` | `vitest` | watch-режим TDD |
| `coverage` | `vitest run --coverage` | gate 100% на core |
| `test:e2e` | `playwright test` | E2E-smoke |
| `lint` | `eslint . --ext .ts,.tsx` | статический анализ |
| `format` | `prettier --write .` | автоформат |
| `format:check` | `prettier --check .` | проверка перед коммитом |
| `typecheck` | `tsc --noEmit` | проверка типов |

### 3.8. Запись TDD-циклов

Каждый завершённый цикл отражается в `tasks.md` как завершённая задача.
Фактические RED/GREEN/REFACTOR — шаги git-истории.

### 3.9. Отвергнутые альтернативы

- **GitHub Flow + PR review** — нет команды; одна ветка проще.
- **GitFlow/Release-flow** — избыточно для pet без релизных циклов.
- **Husky + lint-staged** — детерминированные hooks плагина покрывают кейсы pre-commit.
- **commitlint + CI-gate** — вручную читать Conventional Commits проще на pet.
- **Биомовский toolchain (Biome)** — единый инструмент, но экосистема менее зрелая; Prettier+ESLint дают больше плагинов.
- **Vitest co-located tests (`*.test.ts` рядом с исходником)** — отдельный `tests/` лучше держит pair-конвенцию для hook.

## 4. Трассируемость

- **traces_from:**
  - `phases/architecture/architecture.md` — слои, порты, React в adapters.
  - `phases/testing/testing.md` — TDD-контракты, структура тестов, coverage.
- **traces_to:** `phases/deployment/` (после Software System → Demonstrable).
- **Альфы:** Software System (в движении); Work → `Started`.

## 5. Критерии готовности фазы (этап setup)

- Артефакт валиден; все секции по мета-шаблону.
- Scaffolding инициализирован: `package.json`, конфиги, `index.html`, `src/main.tsx`.
- Хотя бы один TDD-цикл пройден полностью (RED→GREEN).
- `npm run test` проходит; `npm run lint` проходит; coverage-gate 100% на готовых файлах.
- `plugin-config.md` содержит команды `formatter` и `linter`.
- `tasks.md` содержит TDD-бэклог оставшихся циклов.
