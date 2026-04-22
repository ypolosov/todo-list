---
name: plan
type: development
phase: development
sme_level: pet
method: tdd-scaffolding
tool: npm+tsx+prettier+eslint
alphas: [Software System, Work]
disciplines: [software-construction, test-driven-development]
role: architect
traces_from: [.claude/sdlc/phases/architecture/sketch.md, .claude/sdlc/phases/testing/plan.md]
traces_to: []
system_of_attention: todo-list
created: 2026-04-22
updated: 2026-04-22
---

# Development plan: todo-list

## 1. Назначение

Реализация компонентов архитектуры по TDD-first (принцип 5).
Форматер и линтер активны на каждый Write/Edit (принцип 6).

## 2. Привязка к фазе и методу

- Фаза: development.
- Уровень SME: pet.
- Метод: tdd-scaffolding.
- Инструменты: npm + tsx + prettier + eslint + vitest + vite.

## 3. Содержание

### Git-модель

GitHub Flow: feature-ветка → PR → review → merge в `main`.
Коммиты и push выполняет пользователь (CLAUDE.md).

### Стек и структура

| Файл | Роль |
|---|---|
| `package.json` | Зависимости и npm-скрипты (`test`, `lint`, `format`, `dev`). |
| `tsconfig.json` | TS-настройки: strict, target ES2022, module ESNext. |
| `vitest.config.ts` | Test runner с happy-dom и coverage-порогом для TaskService. |
| `eslint.config.js` | Flat config на базе typescript-eslint/recommended. |
| `.prettierrc.json` | Стилевые правила форматера. |
| `index.html` | Точка входа браузера; `<script type="module" src="/src/bootstrap.ts">`. |
| `src/task-store.ts` | `TaskStore` + `InMemoryTaskStore` + `LocalStorageTaskStore`. |
| `src/task-service.ts` | Бизнес-правила create/toggle/remove/list. |
| `src/ui.ts` | `mountUI(root, service)` — DOM-рендер и события. |
| `src/bootstrap.ts` | Сборка компонентов и старт приложения. |

### TDD-последовательность

1. Пишем `src/*.test.ts` по контрактам T1..T8 (красные).
2. Реализуем `src/*.ts` до зелёных тестов.
3. Hook `enforce-tdd.sh` блокирует Write в `src/*.ts` без парного теста.

### Hooks и fitness

| Hook | Триггер | Проверка |
|---|---|---|
| `enforce-tdd.sh` | PreToolUse Write/Edit | Пара `src/X.ts` ↔ тест существует. |
| `enforce-format-lint.sh` | PostToolUse Write/Edit | `prettier --write` + `eslint --fix`. |
| `enforce-no-comments.sh` | PostToolUse Write/Edit | Нет `//`, `#`, `/*` вне whitelist. |
| `validate-artifact.sh` | PostToolUse на `.claude/sdlc/**` | Валидность frontmatter и структуры. |

### Достигнутые результаты

- 15/15 тестов зелёные (`npx vitest run`).
- `TaskService`: 100% statements/branches/functions/lines.
- `TaskStore`: 92.3% (покрыт контрактными тестами T7).
- `tsc --noEmit`: 0 ошибок.
- `eslint src/`: 0 нарушений.
- `prettier --check src/`: все файлы отформатированы.

## 4. Трассируемость

- traces_from: `phases/architecture/sketch.md` (компоненты), `phases/testing/plan.md` (тест-контракты).
- traces_to: фаза deployment (артефакты сборки).
- Продвигаемые альфы: Software System → Usable; Work → Under Control.

## 5. Критерии готовности

- Все тесты T1..T8 (и T-extra, T3b) зелёные.
- Coverage для TaskService = 100%.
- Линтер и форматер проходят на всех файлах в `src/`.
- Hooks настроены и проверены на реальных правках.
- `validate-artifact.sh` на этом артефакте — OK.

## Не-цели

- Нет CI/CD в этой фазе (фаза deployment).
- Нет мониторинга и алертов (фаза operations).
- Нет мультиплеера, синхронизации, сервера.
