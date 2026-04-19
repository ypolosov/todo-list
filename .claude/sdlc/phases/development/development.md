---
name: development
type: development
phase: development
sme_level: pet
method: software-construction
tool: tdd-first-react-spa
alphas: [Software System, Work]
disciplines: [software-construction, test-driven-development]
role: developer
traces_from: [.claude/sdlc/phases/architecture/architecture.md, .claude/sdlc/phases/testing/testing.md]
traces_to: []
system_of_attention: todo-list
created: 2026-04-19
updated: 2026-04-19
---

# Development проекта todo-list

## 1. Назначение

Продвигает Software System от Architecture Selected до Usable.
Продвигает Work от Initiated до Under Control.
Метод — software-construction + TDD; стек — Vite + React + TS + Vitest.

## 2. Привязка к фазе и методу

- Фаза: development.
- Уровень SME: pet.
- Дисциплина: software-construction, TDD.
- Инструмент: TDD-first SPA на React/TS.
- Роль: developer.

## 3. Содержание

### Стек и конфигурация

- Bundler: Vite.
- Язык: TypeScript (strict).
- UI: React 18.
- Unit/integration: Vitest + React Testing Library + jsdom.
- E2E: Playwright.
- Форматер: Prettier.
- Линтер: ESLint 9 flat-config (react, react-hooks, @typescript-eslint).
- Package manager: npm.

### Модульная структура

```
src/
  domain/                     чистый domain, без зависимостей
    task.ts, task.test.ts
    task-id.ts, task-id.test.ts
    task-status.ts, task-status.test.ts
  application/                use cases поверх порта TaskRepository
    task-repository.ts            (интерфейс)
    in-memory-task-repository.ts  (для тестов)
    add-task.ts, complete-task.ts, delete-task.ts
    list-tasks.ts, filter-tasks.ts
    + парные *.test.ts
  adapters/
    storage/
      local-storage-task-repository.ts
    ui/
      use-tasks.ts            (React-хук)
      task-form.tsx, task-item.tsx, filter-bar.tsx, app.tsx
      + парные *.test.tsx
  main.tsx                    composition root (исключён из TDD)
  styles.css                  глобальные стили
  test-setup.ts               jest-dom matchers (исключён из TDD)
e2e/
  todo.spec.ts                Playwright smoke
```

### Направление зависимостей

- Domain не импортирует из application или adapters.
- Application импортирует только domain.
- Adapters импортируют domain и application.
- Composition root (`main.tsx`) собирает adapters.

### TDD-протокол (Red-Green-Refactor)

- Каждая production-функция создавалась в паре с `*.test.ts(x)` до неё.
- TDD hook `enforce-tdd.sh` проверяет наличие пары перед записью.
- `tdd_pairs` в `plugin-config.md`: `src/(.+)\.ts$` ↔ `src/\1.test.ts`.

### Метрики пробега

- Тестов: 62 (16 файлов), все зелёные.
- Покрытие `src/domain/**`: 100 %.
- Покрытие `src/application/**`: 100 %.
- TypeScript: `tsc --noEmit` без ошибок.
- ESLint: без ошибок.
- Prettier: без расхождений.

### Правила по коду (принцип 4a)

- Комментарии в коде не пишутся.
- Документация живёт в markdown-артефактах SDLC.
- Разрешены: shebang, license header, pragma, `/// <reference>`.

### GitHub Flow

- Работа в feature-ветках; merge в main через PR.
- Коммиты и push выполняет пользователь.
- Плагин не коммитит самостоятельно.

## 4. Трассируемость

- traces_from: [`.claude/sdlc/phases/architecture/architecture.md`, `.claude/sdlc/phases/testing/testing.md`].
- traces_to: будут добавлены после фаз deployment и operations.
- Продвижение альф: `.claude/sdlc/alphas.md`.

## 5. Критерии готовности

- Все 5 фич (F-01…F-05) покрыты тестами.
- Все acceptance-контракты из testing-артефакта зелёные.
- `npm run test` возвращает 0 (62/62 passed).
- Coverage-gate по domain/application — 100 %.
- `npm run lint` и `npm run format:check` возвращают 0.
- `tsc --noEmit` без ошибок.
- Alpha Software System = Demonstrable (UI есть, e2e подготовлено).
- Alpha Work = Under Control.
