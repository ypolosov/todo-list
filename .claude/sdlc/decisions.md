---
name: decisions
type: decision-journal
project: todo-list
updated: 2026-04-22
---

## 2026-04-22 15:15 — Deployment: среды, стратегия, rollback

- context: параметры CI/CD pipeline для todo-list.
- autonomy_mode: hitl
- phase: deployment
- role: architect
- alternatives:
  1. 1 среда (prod) + auto-deploy при merge в main + git revert для отката.
  2. 2 среды (preview+prod) + deploy по тегам v*; сложнее для pet.
  3. 3 среды (dev+staging+prod) + canary; избыточно.
- choice: 1
- rationale: pet-демо без backend; секреты не нужны; минимум шагов.
- ci_gates: tsc, eslint, prettier, vitest + coverage.
- deploy_target: GitHub Pages через actions/deploy-pages@v4.
- traces_to: [.claude/sdlc/phases/deployment/plan.md, .github/workflows/ci.yml, .github/workflows/deploy.yml]

## 2026-04-22 15:00 — Метод-инжиниринг: фаза deployment

- context: выбор метода и инструмента деплоя статического веб-артефакта todo-list.
- autonomy_mode: hootl (AskUserQuestion недоступен в subagent; auto mode).
- phase: deployment
- role: architect (devops не назначен; архитектор покрывает интерес)
- sme_level: pet
- alternatives:
  1. static-site-ci-cd + github-actions+github-pages — репозиторий на GitHub, нулевая стоимость, нативный workflow для `dist/`.
  2. static-site-ci-cd + netlify-cli+netlify — быстрый деплой с preview; внешний провайдер и аккаунт.
  3. static-site-ci-cd + manual-rsync+any-static-host — ручной upload через scp/rsync; минимум автоматизации, но ломает воспроизводимость.
- choice: 1
- rationale: pet-демо; репозиторий уже на GitHub; Pages + Actions дают воспроизводимый CI/CD без внешних провайдеров; артефакт `dist/` получается через `vite build`.
- pipeline_outline: push в main → actions build (vite) → upload-pages-artifact → deploy-pages.
- traces_to: [.claude/sdlc/profile.md, .claude/sdlc/phases/deployment/plan.md]

## 2026-04-22 14:30 — Development: git-модель и TDD-scope

- context: выбор git-workflow и области TDD-enforce для todo-list.
- autonomy_mode: hitl
- phase: development
- role: architect
- alternatives:
  1. GitHub Flow + TDD-scope src/** (кроме test/d.ts/bootstrap).
  2. Trunk-based + src/** кроме UI-слоя; ослабляет TDD-first.
  3. Прямо в main + TDD только для task-service/task-store.
- choice: 1
- rationale: CLAUDE.md фиксирует GitHub Flow; полный TDD-scope усиливает принцип 5.
- tdd_exclusions: bootstrap.ts (startup glue без бизнес-логики).
- traces_to: [.claude/sdlc/plugin-config.md, .claude/sdlc/phases/development/plan.md]

## 2026-04-22 14:45 — Development: разрешение конфликта Web + JSON-файл

- context: на Architecture пользователь выбрал web + JSON-файл FS; невозможно.
- autonomy_mode: hitl (эскалация с фазы architecture)
- phase: development
- role: architect
- alternatives:
  1. localStorage с JSON-форматом через LocalStorageTaskStore.
  2. IndexedDB для массивов; избыточно для 4 задач.
  3. Отказ от персистентности; конфликт с R4.
- choice: 1
- rationale: JSON-формат сохранён; FS заменён на браузерный storage.
- traces_to: [.claude/sdlc/phases/architecture/sketch.md, src/task-store.ts]

## 2026-04-22 13:30 — Development: роль developer

- context: фазе development нужна роль с интересом к реализации кода.
- autonomy_mode: hootl (AskUserQuestion недоступен в subagent; auto mode).
- phase: development
- role: architect (покрывает интерес на pet-масштабе)
- alternatives:
  1. Оставить architect активной ролью; developer не добавлять.
  2. Добавить developer; architect остаётся активной.
  3. Переключиться на developer; architect становится неактивной.
- choice: 1
- rationale: pet-демо, один человек; developer как отдельная роль избыточен.
- recommendation: пользователь может добавить developer командой `/sdlc-role add developer`.
- traces_to: [.claude/sdlc/roles.md]

## 2026-04-22 13:25 — Метод-инжиниринг: фаза development

- context: выбор метода и инструментов фазы development для todo-list.
- autonomy_mode: hootl (AskUserQuestion недоступен в subagent; auto mode).
- phase: development
- role: architect (developer не назначен; архитектор покрывает интерес)
- sme_level: pet
- alternatives:
  1. tdd-scaffolding + npm + tsx + prettier + eslint — нативный Node, минимум зависимостей, TS без сборки.
  2. tdd-scaffolding + pnpm + vite + biome — современный бандлер и единый линт/формат.
  3. tdd-scaffolding + yarn + esbuild + dprint + eslint — компактная связка без vite.
- choice: 1
- rationale: pet-масштаб; vitest уже выбран, он использует vite внутри для тестов; npm предустановлен; tsx даёт запуск TS без сборки; prettier+eslint — индустриальный стандарт.
- tdd_pairs: src/**/*.ts ↔ src/**/*.test.ts (принцип 5).
- traces_to: [.claude/sdlc/profile.md, .claude/sdlc/phases/development/plan.md, .claude/sdlc/plugin-config.md]

## 2026-04-22 13:05 — Testing: стратегия и fitness

- context: пирамида тестов, coverage, contract-тесты, fitness-функции.
- autonomy_mode: hitl
- phase: testing
- role: architect
- alternatives:
  1. Unit TaskService 100% + smoke UI + contract TaskStore + формат/линт/зелёные.
  2. Только smoke всего кода; без coverage-порога.
  3. Полная пирамида unit + integration + E2E; избыточно для pet.
- choice: 1
- rationale: TDD-first; чистая логика покрывается полностью; UI — smoke.
- traces_to: [.claude/sdlc/phases/testing/plan.md, .claude/sdlc/alphas.md]

## 2026-04-22 13:00 — Метод-инжиниринг: фаза testing

- context: выбор метода и инструмента фазы testing для todo-list.
- autonomy_mode: hootl (AskUserQuestion недоступен в subagent; auto mode).
- phase: testing
- role: architect (tester не добавлен; архитектор покрывает интерес)
- sme_level: pet
- alternatives:
  1. unit-testing-with-mocks + vitest — zero-config TS, быстрый раннер, совместим с vanilla TS.
  2. unit-testing-with-mocks + jest+ts-jest — классика, требует больше конфигурации.
  3. unit-testing-with-mocks + node:test+tsx — встроенный раннер Node, минимум зависимостей.
- choice: 1
- rationale: pet-масштаб, TDD-first (принцип 5); vitest даёт TS без сборки и минимум церемоний.
- traces_to: [.claude/sdlc/profile.md, .claude/sdlc/phases/testing/plan.md]

## 2026-04-22 12:40 — Architecture: значимые решения

- context: выбор воплощения, языка и персистентности для todo-list.
- autonomy_mode: hitl
- phase: architecture
- role: architect
- alternatives:
  1. CLI + Python + JSON-файл — максимум простоты.
  2. Web-страница + TypeScript + localStorage (JSON) — наглядное демо.
  3. Клиент-сервер + TypeScript + SQLite — правдоподобнее, но раздутее.
- choice: 2
- rationale: выбор пользователя: веб-страница + TypeScript; JSON в localStorage.
- conflicts_resolved: веб vs. JSON-файл FS → localStorage с JSON-форматом.
- traces_to: [.claude/sdlc/phases/architecture/sketch.md, .claude/sdlc/alphas.md]

## 2026-04-22 12:35 — Architecture: смена активной роли

- context: фазу architecture ведёт роль architect; product-owner сохраняется.
- autonomy_mode: hitl
- phase: cross-cutting
- role: architect
- alternatives:
  1. Добавить architect к активным ролям; product-owner остаётся.
  2. Заменить product-owner на architect.
  3. Оставить product-owner; architect формально не назначать.
- choice: 1
- rationale: pet-проект; один человек играет обе роли.
- traces_to: [.claude/sdlc/roles.md]

## 2026-04-22 12:30 — Метод-инжиниринг: фаза architecture

- context: выбор метода и инструмента фазы architecture для todo-list.
- autonomy_mode: hootl (AskUserQuestion недоступен в subagent).
- phase: architecture
- role: architect
- sme_level: pet
- alternatives:
  1. lightweight-architecture-sketch + md-architecture-sketch — одностраничная схема компонентов и решений.
  2. c4-model-lite + md-c4-context — контекст и контейнеры по модели C4.
  3. adr-only + md-adr-log — только журнал архитектурных решений без общей схемы.
- choice: 1
- rationale: pet-демо; одностраничный sketch даёт структуру без накладных расходов.
- traces_to: [.claude/sdlc/profile.md, .claude/sdlc/phases/architecture/sketch.md]

## 2026-04-22 12:05 — Requirements: содержание и DoD

- context: определение MVP и DoD для фазы requirements todo-list.
- autonomy_mode: hitl
- phase: requirements
- role: product-owner
- alternatives:
  1. Создать/отметить/удалить + DoD «функция + тест»; backlog в tasks.md.
  2. Только create + list; минимум поведения; DoD без тестов.
  3. CRUD + приоритеты + дедлайны; полный DoD с документацией.
- choice: 1
- rationale: узнаваемый учебный сюжет, совместим с TDD-first (принцип 5).
- traces_to: [.claude/sdlc/phases/requirements/todo.md, .claude/sdlc/tasks.md, .claude/sdlc/alphas.md]

## 2026-04-22 12:00 — Метод-инжиниринг: фаза requirements

- context: выбор метода и инструмента фазы requirements для todo-list.
- autonomy_mode: hootl (AskUserQuestion недоступен в subagent).
- phase: requirements
- role: product-owner
- sme_level: pet
- alternatives:
  1. flat-todo-list + md-flat-todo — плоский список желаемого поведения.
  2. freeform-user-stories + md-user-stories — свободные истории без AC.
  3. note-backlog + md-backlog — бэклог заметок в одном файле.
- choice: 1
- rationale: pet-демо; плоский список минимизирует накладные расходы.
- traces_to: [.claude/sdlc/profile.md, .claude/sdlc/phases/requirements/todo.md]

## 2026-04-22 11:25 — Vision: содержание Lean Canvas

- context: наполнение ключевых блоков Lean Canvas для todo-list.
- autonomy_mode: hitl
- phase: vision
- role: product-owner
- alternatives:
  1. Бенефициар = докладчик + аудитория; проблема = живое демо AI-SDLC.
  2. Бенефициар = конечный пользователь todo; продуктовый фокус.
  3. Бенефициар = сообщество плагина; эталонный пример метода.
- choice: 1
- rationale: README фиксирует todo-list как учебное демо для доклада.
- traces_to: [.claude/sdlc/phases/vision/lean-canvas.md, .claude/sdlc/alphas.md]

## 2026-04-22 11:20 — Метод-инжиниринг: фаза vision

- context: выбор метода и инструмента фазы vision для todo-list.
- autonomy_mode: hootl (auto-режим; интерактив не доступен).
- phase: vision
- role: product-owner
- sme_level: pet
- alternatives:
  1. lean-canvas + md-lean-canvas — одностраничник ценности и сегментов.
  2. opportunity-canvas + md-opportunity-canvas — фокус на проблеме и решении.
  3. elevator-pitch + md-elevator-pitch — минимальный pitch идеи.
- choice: 1
- rationale: демо-проект; Lean Canvas балансирует полноту и лаконичность.
- traces_to: [.claude/sdlc/profile.md, .claude/sdlc/phases/vision/lean-canvas.md]

## 2026-04-22 11:10 — Continue: следующая фаза SDLC

- context: post-bootstrap выбор фазы для роли product-owner.
- autonomy_mode: hitl
- phase: cross-cutting
- role: product-owner
- alternatives:
  1. /sdlc-phase vision — продвинуть Opportunity и Stakeholders.
  2. /sdlc-phase requirements — напрямую к требованиям без Vision.
  3. /sdlc-focus на подсистему — сменить целевую до фазы.
- choice: 1
- rationale: Opportunity в начальном состоянии; логичный старт pet-проекта.
- traces_to: [.claude/sdlc/phases/vision]

# Журнал решений todo-list

Журнал альтернатив и принятых решений (принцип 1).
Запись создаётся на каждое значимое решение SDLC.

## 2026-04-22 11:00 — Bootstrap: масштаб проекта

- context: выбор уровня формализма для todo-list при `/sdlc-init`.
- autonomy_mode: hitl
- phase: bootstrap
- role: product-owner
- alternatives:
  1. pet — минимум формализма; подходит для учебного/личного проекта.
  2. mid — умеренная формализация; подходит командам 3–10 человек.
  3. enterprise — полный набор артефактов; регуляторика и аудируемость.
- choice: 1
- rationale: README описывает todo-list как учебное демо для доклада.
- traces_to: [.claude/sdlc/profile.md]

## 2026-04-22 11:01 — Bootstrap: активная роль

- context: кто ведёт проект на старте bootstrap.
- autonomy_mode: hitl
- phase: bootstrap
- role: (выбирается)
- alternatives:
  1. product-owner — старт с фазы vision; ценность и стейкхолдеры.
  2. architect — требует готовых vision и requirements.
  3. developer — требует готовой архитектуры.
  4. method-engineer — сквозная роль эволюции практик.
- choice: 1
- rationale: логичный старт pet-проекта — ценность и требования.
- traces_to: [.claude/sdlc/roles.md]

## 2026-04-22 11:02 — Bootstrap: целевая система

- context: какая система считается целевой на старте.
- autonomy_mode: hitl
- phase: bootstrap
- role: product-owner
- alternatives:
  1. todo-list (корень репозитория) — стандарт монорепо.
  2. todo-list/backend — если ожидается клиент-сервер.
  3. todo-list/cli — если сразу ясно, что это CLI-утилита.
- choice: 1
- rationale: на старте архитектура неизвестна; корень — безопасный default.
- traces_to: [.claude/sdlc/system-context.md, README.sdlc.md]

## 2026-04-22 11:03 — Bootstrap: state-артефакт

- context: где хранить состояние работ (Work-альфа, принцип 9).
- autonomy_mode: hitl
- phase: bootstrap
- role: product-owner
- alternatives:
  1. file: `.claude/sdlc/tasks.md` — одиночный markdown-файл.
  2. dir: `.claude/sdlc/tasks/` — каталог с файлом на задачу.
  3. mcp: GitHub Issues — задачи в трекере через MCP.
- choice: 1
- rationale: pet-проект; объём задач небольшой, плоский файл удобнее.
- traces_to: [.claude/sdlc/plugin-config.md, .claude/sdlc/tasks.md]
