---
name: decisions
type: decision-journal
project: todo-list
updated: 2026-04-22
---

# Журнал решений

Принцип 1: альтернативы порождаются и фиксируются для каждого значимого решения.

## 2026-04-22 14:00 — Bootstrap целевого проекта todo-list

- context: первичная инициализация SDLC-каркаса в репозитории `/home/ypolosov/DEV/GITS/todo-list`.
- autonomy_mode: hitl
- phase: cross-cutting (bootstrap)
- role: product-owner
- alternatives:
  1. Уровень SME=pet, одиночный разработчик, минимальные церемонии — быстрый старт, мало формализма.
  2. Уровень SME=mid, команда до 10, полный набор фаз — избыточно для учебного pet-проекта.
  3. Уровень SME=enterprise, регламенты и согласования — неприменимо к одиночному проекту.
- choice: 1
- rationale: проект учебный pet-масштаба, один разработчик, цель — пройти SDLC-каркас на простом домене.
- traces_to: [.claude/sdlc/profile.md]

## 2026-04-22 14:01 — Выбор state-артефакта

- context: принцип 9 требует явного места хранения состояния работ.
- autonomy_mode: hitl
- phase: cross-cutting (bootstrap)
- role: product-owner
- alternatives:
  1. kind=file, ref=.claude/sdlc/tasks.md — простая локальная таблица, без внешних зависимостей.
  2. kind=dir — каталог по задачам, оправдан при большом потоке задач, избыточен сейчас.
  3. kind=mcp — GitHub Issues через MCP, требует токен и публичный репозиторий.
- choice: 1
- rationale: pet-масштаб, одиночная работа; локальный файл даёт минимальную инфраструктуру.
- traces_to: [.claude/sdlc/plugin-config.md, .claude/sdlc/tasks.md]

## 2026-04-22 14:02 — Выбор активной роли

- context: необходимо зафиксировать роль, определяющую стартовую фазу SDLC.
- autonomy_mode: hitl
- phase: cross-cutting (bootstrap)
- role: product-owner
- alternatives:
  1. product-owner — начать с фазы vision, выявить ценность и стейкхолдеров.
  2. architect — начать с architecture, но vision/requirements ещё отсутствуют.
  3. developer — начать с development, но ни требований, ни архитектуры нет.
- choice: 1
- rationale: pet-проект без артефактов; естественный вход — vision через product-owner.
- traces_to: [.claude/sdlc/roles.md, .claude/sdlc/profile.md]

## 2026-04-22 14:03 — Целевая система и уровень автономности

- context: нужно задать границу внимания и режим принятия решений.
- autonomy_mode: hitl
- phase: cross-cutting (bootstrap)
- role: product-owner
- alternatives:
  1. target=корень репозитория, autonomy=hitl — пользователь одобряет каждый значимый шаг.
  2. target=подсистема `src/` — преждевременно: кода ещё нет.
  3. autonomy=hootl — автономные решения; небезопасно на старте обучения методу.
- choice: 1
- rationale: границы целевой — весь репозиторий; hitl обеспечивает обучение методу с участием пользователя.
- traces_to: [.claude/sdlc/system-context.md, README.sdlc.md, .claude/sdlc/profile.md]

## 2026-04-22 15:00 — Выбор инструмента фазы Vision

- context: начало фазы Vision; уровень SME=pet зафиксирован при bootstrap.
- autonomy_mode: hitl
- phase: vision
- role: product-owner
- alternatives:
  1. README-as-vision — одностраничное описание проблемы и цели; минимум формализма, один документ.
  2. Elevator Pitch — абзац по шаблону; сильный фокус на value proposition, меньше контекста.
  3. Mission Statement — одно предложение; слишком лаконично для учебной демонстрации SDLC.
- choice: 1
- rationale: учебный pet-проект требует связного текста с проблемой, решением, не-целями и стейкхолдерами на одной странице.
- traces_to: [.claude/sdlc/phases/vision/vision.md, .claude/sdlc/profile.md, .claude/sdlc/alphas.md]

## 2026-04-22 15:01 — Бенефициар, проблема и критерий успеха Vision

- context: уточнение ключевых элементов vision через SME-опрос.
- autonomy_mode: hitl
- phase: vision
- role: product-owner
- alternatives:
  1. Бенефициар=автор; проблема=нет примера SDLC; успех=все фазы закрыты артефактами.
  2. Бенефициар=читатель репозитория; проблема=дефицит примеров; успех=MVP TODO работает локально.
  3. Оба бенефициара, обе проблемы, оба критерия — шире, но размывает приоритет pet-проекта.
- choice: 1
- rationale: single-user и учебная цель совпадают; критерий «все 7 фаз» измерим по инвентарю `.claude/sdlc/phases/*`.
- traces_to: [.claude/sdlc/phases/vision/vision.md]

## 2026-04-22 16:00 — Выбор инструмента фазы Requirements

- context: начало фазы Requirements; pet-уровень, учебный single-user TODO.
- autonomy_mode: hitl
- phase: requirements
- role: product-owner
- alternatives:
  1. Плоский TODO-список — минимально для pet; чеклист R-/N- пунктов.
  2. Бэклог заметок — больше контекста на пункт; избыточно для чёткого CRUD.
  3. Freeform user stories — нарратив «As a...»; хорошо для демонстрации SDLC.
- choice: 1
- rationale: требования уже сформулированы императивно (CRUD, фильтры, localStorage); чеклист короче и ближе к TDD.
- traces_to: [.claude/sdlc/phases/requirements/requirements.md, .claude/sdlc/profile.md, .claude/sdlc/alphas.md]

## 2026-04-22 16:01 — Расположение backlog и уровень AC

- context: где держать требования и какую глубину критериев приёмки фиксировать.
- autonomy_mode: hitl
- phase: requirements
- role: product-owner
- alternatives:
  1. Один артефакт requirements.md; AC не пишутся; tasks.md — только work-state.
  2. Всё в tasks.md; смешивает спецификацию и task state.
  3. Разделить и связать id; требует схемы id, перегруз для pet.
- choice: 1
- rationale: на pet-уровне разделение «спецификация vs состояние» даёт чистую трассируемость без оверхеда.
- traces_to: [.claude/sdlc/phases/requirements/requirements.md, .claude/sdlc/tasks.md]

## 2026-04-22 17:00 — Выбор инструмента фазы Architecture

- context: нужно зафиксировать структуру SPA с hexagonal-слоями на pet-уровне.
- autonomy_mode: hitl
- phase: architecture
- role: product-owner
- alternatives:
  1. Mermaid-диаграмма — текстовый исходник, рендер в GitHub/IDE, хороша для слоёв.
  2. ASCII box-and-arrow — чистый markdown без рендера; визуально скуднее.
  3. draw.io sketch — гибче, но внешний файл и редактор.
- choice: 1
- rationale: Mermaid остаётся в markdown, диф-видим в git, не тянет внешних инструментов.
- traces_to: [.claude/sdlc/phases/architecture/architecture.md, .claude/sdlc/profile.md]

## 2026-04-22 17:01 — Стиль архитектуры и tech-стек

- context: выбрать стиль и конкретный стек под hexagonal SPA с localStorage.
- autonomy_mode: hitl
- phase: architecture
- role: product-owner
- alternatives:
  1. Hexagonal + TypeScript + React + Vite — строгий домен, компонентный UI, быстрый dev server.
  2. Hexagonal + vanilla TS + Vite без фреймворка — меньше зависимостей, но UI-код многословнее.
  3. Hexagonal + vanilla JS — без типов; риск для целостности domain высокий.
- choice: 1
- rationale: TS защищает domain-инварианты; React-адаптер изолирован; Vite даёт HMR и быстрый тестовый цикл.
- traces_to: [.claude/sdlc/phases/architecture/architecture.md, .claude/sdlc/plugin-config.md]

## 2026-04-22 17:02 — Фокус внимания: без подсистем

- context: hexagonal-слои domain/application/adapters — это подсистемы; нужно ли отдельный /sdlc-focus.
- autonomy_mode: hitl
- phase: architecture
- role: product-owner
- alternatives:
  1. Target=корень, подсистемы только в artefact architecture.md.
  2. Отдельная система внимания domain с README.sdlc.md.
  3. Три системы внимания: domain, application, adapters.
- choice: 1
- rationale: pet-масштаб; каждый дополнительный README.sdlc.md добавляет поддержку, а выигрыш минимален.
- traces_to: [.claude/sdlc/system-context.md, .claude/sdlc/phases/architecture/architecture.md]

## 2026-04-22 18:00 — Эскалация уровня SME фазы testing до mid

- context: выбранные инструменты и coverage 100% семантически соответствуют mid-уровню.
- autonomy_mode: hitl
- phase: testing
- role: product-owner
- alternatives:
  1. Эскалировать testing до mid; honest labelling; остальные фазы остаются pet.
  2. Оставить pet и добавить Vitest/Playwright как pet-инструменты — нечестный лейблинг.
  3. Упростить до 1-2 unit-тестов + ручной smoke; не соответствует намерению пользователя.
- choice: 1
- rationale: метод «пирамида автотестов с coverage gate» — определение mid-уровня по матрице плагина.
- traces_to: [.claude/sdlc/profile.md, .claude/sdlc/phases/testing/testing.md]

## 2026-04-22 18:01 — Регистрация Vitest и Playwright в extensions

- context: имена инструментов допускаются только в матрице или в пользовательских расширениях.
- autonomy_mode: hitl
- phase: testing
- role: product-owner
- alternatives:
  1. Добавить в `.claude/sdlc/method-tool-extensions.md` строку testing/mid с Vitest + Playwright.
  2. Редактировать catalogs/method-tool-matrix.md плагина — запрещено (чужой код).
  3. Хранить имена только в decisions.md — нарушает механизм SME-опроса.
- choice: 1
- rationale: extensions — штатный механизм плагина для дополнений без правки catalogs.
- traces_to: [.claude/sdlc/method-tool-extensions.md, .claude/sdlc/phases/testing/testing.md]

## 2026-04-22 18:02 — Настройка coverage-gate

- context: требование 100% покрытия только для слоёв с инвариантами.
- autonomy_mode: hitl
- phase: testing
- role: product-owner
- alternatives:
  1. 100% на domain + application, adapters без gate (покрываются E2E).
  2. 100% на весь src/ включая UI — дорого поддерживать для pet.
  3. 80% на весь src/ — мягче, но меньше запрошенного.
- choice: 1
- rationale: бизнес-логика критична для целостности данных; UI-код проверяется E2E-сценарием.
- traces_to: [.claude/sdlc/plugin-config.md, .claude/sdlc/phases/testing/testing.md]

## 2026-04-22 18:03 — Автономность фазы testing: hotl

- context: пользователь предпочёл human-on-the-loop для итераций тестирования.
- autonomy_mode: hitl
- phase: testing
- role: product-owner
- alternatives:
  1. hotl на всю фазу testing в profile.md — стабильный режим для будущих прогонов.
  2. Per-task ephemeral — менять режим каждый раз вручную.
- choice: 1
- rationale: на testing частые итерации; hotl ускоряет цикл без потери контроля.
- traces_to: [.claude/sdlc/profile.md]

## 2026-04-22 19:00 — Эскалация уровня SME фазы development до mid

- context: выбранные GitHub Flow + Prettier/ESLint с конфигом соответствуют mid-матрице.
- autonomy_mode: hitl
- phase: development
- role: product-owner
- alternatives:
  1. Эскалировать development до mid; честный лейблинг; остальные фазы — pet где были.
  2. Оставить pet + extensions — нечестный лейблинг практик mid.
  3. Упростить до trunk-based + prettier default — отказ от PR-review и конфиг-линтера.
- choice: 1
- rationale: GitHub Flow и линтер с правилами fitness-функций — явный mid-паттерн.
- traces_to: [.claude/sdlc/profile.md, .claude/sdlc/phases/development/development.md]

## 2026-04-22 19:01 — Выбор стека development

- context: TypeScript + React + Vite + Vitest + Playwright + RTL + localStorage.
- autonomy_mode: hitl
- phase: development
- role: product-owner
- alternatives:
  1. TS + React + Vite + Vitest + RTL — идиоматично; mid-матрица; TS защищает инварианты.
  2. Vanilla TS + Vite без React — меньше зависимостей; UI-код многословнее.
  3. Vanilla JS без TS — без типов; риск для domain высокий.
- choice: 1
- rationale: выбранный стек соответствует архитектуре (hexagonal+адаптер React) и testing-плану.
- traces_to: [.claude/sdlc/method-tool-extensions.md, .claude/sdlc/plugin-config.md, package.json]

## 2026-04-22 19:02 — Scaffold вручную, не через Vite CLI

- context: выбирали между `npm create vite@latest` и ручным scaffold.
- autonomy_mode: hitl
- phase: development
- role: product-owner
- alternatives:
  1. Ручной scaffold — полный контроль над hexagonal-структурой, без шаблонного шума.
  2. Vite CLI init + перестройка в hexagonal — дублирует работу, тянет примеры.
  3. pnpm + ручной scaffold — избыточно для pet.
- choice: 1
- rationale: на pet-масштабе ручной scaffold минимален и подчёркивает hexagonal-разрез.
- traces_to: [package.json, vite.config.ts, tsconfig.json, eslint.config.js]

## 2026-04-22 19:03 — Fitness-функции через no-restricted-imports

- context: автоматическая проверка направления зависимостей между слоями.
- autonomy_mode: hitl
- phase: development
- role: product-owner
- alternatives:
  1. ESLint `no-restricted-imports` на границах domain/application/adapters.
  2. Отдельный скрипт depcruise/madge — ещё один инструмент для pet.
  3. Только код-ревью — не детерминистично, не часть CI.
- choice: 1
- rationale: правила уже есть в ESLint-конфиге; запускаются вместе с обычным линтом.
- traces_to: [eslint.config.js, .claude/sdlc/phases/development/development.md]

## 2026-04-22 20:00 — Позиционирование GitHub Pages+Actions как pet-инструмента

- context: матрица плагина ставит GitHub Actions в mid; пользователь просил остаться на pet.
- autonomy_mode: hotl
- phase: deployment
- role: product-owner
- alternatives:
  1. Оставить pet + зарегистрировать «GitHub Pages + Actions» в extensions.md как pet.
  2. Эскалировать до mid для честного лейблинга.
  3. Откатиться к deploy.sh + rsync — не соответствует выбору хостинга.
- choice: 1
- rationale: по существу это один шаг публикации без staging/blue-green; семантика ближе к pet, чем к mid.
- traces_to: [.claude/sdlc/method-tool-extensions.md, .claude/sdlc/profile.md]

## 2026-04-22 20:01 — Триггеры workflow

- context: когда должен запускаться деплой.
- autonomy_mode: hotl
- phase: deployment
- role: product-owner
- alternatives:
  1. push в main + workflow_dispatch — автоматизация после PR merge + ручной rollback.
  2. Только workflow_dispatch — теряется автоматизация CI/CD.
  3. Только по тегу v* — ручной тег избыточен для pet.
- choice: 1
- rationale: естественный GitHub Flow + запасной ручной запуск для нештатных ситуаций.
- traces_to: [.github/workflows/deploy.yml]

## 2026-04-22 20:02 — Гейты verify в pipeline

- context: что должно проходить до публикации.
- autonomy_mode: hotl
- phase: deployment
- role: product-owner
- alternatives:
  1. typecheck + lint + unit + E2E до деплоя — полный контроль качества.
  2. Без E2E в CI — быстрее, но упускает регрессии UI.
  3. Без гейтов — публикация в любом случае, риск сломанного prod.
- choice: 1
- rationale: E2E в CI поднимает уверенность в Software System→Ready переходе.
- traces_to: [.github/workflows/deploy.yml, .claude/sdlc/phases/deployment/deployment.md]

## 2026-04-22 20:03 — Rollback через git revert + pipeline

- context: как откатывать неудачную публикацию.
- autonomy_mode: hotl
- phase: deployment
- role: product-owner
- alternatives:
  1. `git revert` → push → тот же pipeline публикует предыдущее состояние.
  2. workflow_dispatch с ref на предыдущий SHA — быстрее, но нет записи в main.
  3. Вручную скопировать старый dist/ на хостинг — не масштабируется.
- choice: 1
- rationale: единственная процедура изменений (PR → merge → deploy) применима и к откату.
- traces_to: [.claude/sdlc/phases/deployment/deployment.md]

## 2026-04-22 20:04 — Base path через VITE_BASE с дефолтом /todo-list/

- context: hexagonal SPA публикуется в подкаталог /todo-list/ на GitHub Pages.
- autonomy_mode: hotl
- phase: deployment
- role: product-owner
- alternatives:
  1. base='/todo-list/' по умолчанию + override VITE_BASE=/ для dev/preview/e2e.
  2. base='/' всегда — статика не загрузится из github.io/todo-list/.
  3. Условный base через функциональную форму defineConfig — работает, но конфликтует с mergeConfig в vitest.
- choice: 1
- rationale: один источник истины в vite.config.ts; dev-скрипты явно выставляют корневой base.
- traces_to: [vite.config.ts, package.json]
