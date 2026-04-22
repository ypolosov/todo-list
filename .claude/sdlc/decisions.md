---
name: decisions
type: decision-journal
project: todo-list
updated: 2026-04-22
---

# Журнал альтернатив и решений

Каждая значимая правка артефакта имеет здесь запись.

## 2026-04-22 14:30 — Bootstrap целевого проекта

- context: первичная инициализация SDLC-каркаса для todo-list.
- autonomy_mode: hitl
- phase: bootstrap
- role: product-owner
- alternatives:
  1. pet-уровень по всем фазам — минимальный overhead, быстрый старт.
  2. mid по vision/requirements, pet по остальным — баланс качества и скорости.
  3. enterprise-уровень — избыточно для pet-проекта одного владельца.
- choice: 1
- rationale: проект демо-уровня, команда из одного человека, риски низкие.
- traces_to: [profile.md]

## 2026-04-22 14:31 — Выбор state-артефакта

- context: нужно место для отслеживания состояния работ (принцип 9).
- autonomy_mode: hitl
- phase: bootstrap
- role: product-owner
- alternatives:
  1. `file:.claude/sdlc/tasks.md` — плоский файл в каталоге SDLC.
  2. `dir:.claude/sdlc/tasks/` — каталог с отдельным файлом на задачу.
  3. `mcp:github-issues` — внешний трекер через GitHub MCP.
- choice: 1
- rationale: pet-уровень, локальная работа, нет команды; файл проще всего.
- traces_to: [plugin-config.md, tasks.md]

## 2026-04-22 14:32 — Активная роль и фокус системы

- context: определение исходной роли и целевой системы внимания.
- autonomy_mode: hitl
- phase: bootstrap
- role: product-owner
- alternatives:
  1. product-owner + корень репозитория — старт с выявления ценности.
  2. developer + корень — перейти сразу к разработке без vision.
  3. systems-thinker + корень — сквозная роль, но без фокуса на ценности.
- choice: 1
- rationale: перед разработкой нужно прояснить ценность и требования.
- traces_to: [roles.md, system-context.md]

## 2026-04-22 14:33 — Уровень автономности по умолчанию

- context: выбор default_autonomy для фаз.
- autonomy_mode: hitl
- phase: bootstrap
- role: product-owner
- alternatives:
  1. hitl — человек подтверждает каждое значимое решение.
  2. hotl — человек подтверждает только критические шаги.
  3. hootl — полная автономия плагина без подтверждений.
- choice: 1
- rationale: на старте нужен максимальный контроль над выбором инструментов.
- traces_to: [profile.md]

## 2026-04-22 15:00 — Выбор инструмента для фазы Vision

- context: инстанцирование артефакта фазы Vision на pet-уровне.
- autonomy_mode: hitl
- phase: vision
- role: product-owner
- alternatives:
  1. README-as-vision — раздел в sidecar README или отдельный vision.md, низкий overhead.
  2. Elevator Pitch (Geoffrey Moore) — шаблон на одну страницу с 5 слотами.
  3. Mission Statement — 2–4 предложения миссии, самый минималистичный формат.
- choice: 1
- rationale: sidecar README уже существует; vision.md рядом — естественная единица знаний.
- traces_to: [phases/vision/vision.md, profile.md]

## 2026-04-22 15:01 — Фиксация бенефициара и проблемы

- context: определение основного бенефициара и проблемы целевой системы.
- autonomy_mode: hitl
- phase: vision
- role: product-owner
- alternatives:
  1. автор-ученик SDLC + «теория не усваивается без практики».
  2. автор-пользователь TODO + «задачи теряются без трекера».
  3. двойная цель: учебная и утилитарная одновременно.
- choice: 1
- rationale: предмет вторичен; главное — прогон SDLC end-to-end на простом CRUD.
- traces_to: [phases/vision/vision.md, alphas.md]

## 2026-04-22 15:02 — Продвижение альф фазы Vision

- context: Vision-артефакт даёт свидетельство для продвижения альф.
- autonomy_mode: hitl
- phase: vision
- role: product-owner
- alternatives:
  1. Opportunity: — → Value Established; Stakeholders: Recognized → Represented.
  2. Консервативно: Opportunity → Identified, Stakeholders без движения.
  3. Агрессивно: Opportunity → Viable без mid-артефактов.
- choice: 1
- rationale: pet-уровень позволяет skip промежуточных состояний при явном vision-артефакте.
- traces_to: [alphas.md, phases/vision/vision.md]

## 2026-04-22 15:20 — Выбор инструмента для фазы Requirements

- context: инстанцирование артефакта требований на pet-уровне.
- autonomy_mode: hitl
- phase: requirements
- role: product-owner
- alternatives:
  1. Freeform user stories — структурировано через «как роль, я хочу, чтобы».
  2. Плоский TODO-список с чекбоксами — минимальный оверхед.
  3. Бэклог заметок — максимальная гибкость, сложнее трассировать.
- choice: 1
- rationale: user stories легче трассируются к тестам и архитектуре на следующих фазах.
- traces_to: [phases/requirements/requirements.md, profile.md]

## 2026-04-22 15:21 — Объём MVP и уровень критериев приёмки

- context: определение скопа MVP и формата done-условий.
- autonomy_mode: hitl
- phase: requirements
- role: product-owner
- alternatives:
  1. CRUD + фильтр + localStorage; критерии — проза-скетч 1–2 строки.
  2. Только CRUD без фильтра и persistence; строго pet без критериев.
  3. Расширенный с edit/sort; Gherkin критерии (mid-уровень).
- choice: 1
- rationale: покрывает типовой TODO-сценарий; прозо-критерии превратятся в TDD-контракты.
- traces_to: [phases/requirements/requirements.md]

## 2026-04-22 15:22 — Локация backlog и связь с tasks.md

- context: разделение описания требований и исполнения.
- autonomy_mode: hitl
- phase: requirements
- role: product-owner
- alternatives:
  1. Отдельный requirements.md + ссылки из tasks.md.
  2. Всё в едином tasks.md: смешение «what vs work».
  3. Подкаталог stories/ с файлом на story: избыточно для 8 пунктов.
- choice: 1
- rationale: описание стабильно, задачи меняются чаще; разделение даёт чистоту слоёв.
- traces_to: [phases/requirements/requirements.md, tasks.md]

## 2026-04-22 15:23 — Продвижение альф фазы Requirements

- context: Requirements-артефакт даёт свидетельство для продвижения.
- autonomy_mode: hitl
- phase: requirements
- role: product-owner
- alternatives:
  1. Requirements: — → Bounded; Stakeholders: Represented → Involved.
  2. Консервативно: Requirements → Conceived, Stakeholders без движения.
  3. Агрессивно: Requirements → Coherent без mid-артефактов.
- choice: 1
- rationale: pet-уровень с явным артефактом оправдывает skip Conceived до Bounded.
- traces_to: [alphas.md, phases/requirements/requirements.md]

## 2026-04-22 15:40 — Выбор инструмента для фазы Architecture

- context: формат описания структуры системы на pet-уровне.
- autonomy_mode: hitl
- phase: architecture
- role: product-owner
- alternatives:
  1. Mermaid-диаграмма — код в markdown, версионируется в git.
  2. ASCII box-and-arrow — работает везде, сложнее поддерживать.
  3. draw.io sketch — красивее, но бинарный файл и плохой diff.
- choice: 1
- rationale: Mermaid как код даёт diff-friendly эволюцию архитектуры.
- traces_to: [phases/architecture/architecture.md, profile.md]

## 2026-04-22 15:41 — Выбор runtime SPA

- context: структурное решение границы adapters-слоя.
- autonomy_mode: hitl
- phase: architecture
- role: product-owner
- alternatives:
  1. Vanilla TypeScript + Vite — максимальная простота, чистый hexagonal.
  2. Лёгкий фреймворк (Preact/Alpine/Lit) — реактивность без React-экосистемы.
  3. Популярный фреймворк (React/Vue/Svelte) — богатый тулинг, затеняет hexagonal.
- choice: 1
- rationale: учебная цель — показать hexagonal без фреймворкового шума.
- traces_to: [phases/architecture/architecture.md]

## 2026-04-22 15:42 — Module layout в src/

- context: организация папок под hexagonal для одного bounded-контекста.
- autonomy_mode: hitl
- phase: architecture
- role: product-owner
- alternatives:
  1. Плоский src/{domain,application,adapters} — явная граница слоёв.
  2. Feature-sliced src/features/todo/... — избыточно для одного контекста.
  3. src/core + src/web — сливает domain и application в одну папку.
- choice: 1
- rationale: слоёвая группировка лучше подчёркивает правило зависимостей.
- traces_to: [phases/architecture/architecture.md]

## 2026-04-22 15:43 — Стратегия целостности данных

- context: валидация данных при чтении из localStorage.
- autonomy_mode: hitl
- phase: architecture
- role: product-owner
- alternatives:
  1. Инварианты в domain-конструкторах + runtime-схема в storage-адаптере.
  2. Только TypeScript-типы + unsafe cast — быстро, но хрупко.
  3. Полный DDD (Aggregate Events, CQRS) — педагогично, избыточно для pet.
- choice: 1
- rationale: двухслойная защита от повреждённых и устаревших снапшотов.
- traces_to: [phases/architecture/architecture.md]

## 2026-04-22 15:44 — Продвижение альф фазы Architecture

- context: Architecture-артефакт даёт свидетельство для продвижения.
- autonomy_mode: hitl
- phase: architecture
- role: product-owner
- alternatives:
  1. Software System: — → Architecture Selected; Requirements: Bounded → Coherent.
  2. Консервативно: Software System без движения, Requirements без изменений.
  3. Агрессивно: Software System → Demonstrable без кода.
- choice: 1
- rationale: архитектура зафиксирована; реализуемость всех US/NFR подтверждена.
- traces_to: [alphas.md, phases/architecture/architecture.md]

## 2026-04-22 16:00 — Уровень SME на фазе testing

- context: Vitest+Playwright+coverage 100% соответствует mid-ряду матрицы, не pet.
- autonomy_mode: hotl
- phase: testing
- role: product-owner
- alternatives:
  1. Пометить фазу testing как mid; честное соответствие инструментарию.
  2. Оставить pet-ярлык, зафиксировать отклонение в decisions.
  3. Упростить до pet: 1–2 unit-теста, ручной smoke; без coverage gate.
- choice: 1
- rationale: искренний уровень в profile.md помогает consistency-аудитору не флажить несоответствие.
- traces_to: [profile.md, phases/testing/testing.md]

## 2026-04-22 16:01 — Переключение автономности на HOTL для testing

- context: пользователь задал `автономность - hotl` в аргументах фазы.
- autonomy_mode: hitl (решение), hotl (применение)
- phase: testing
- role: product-owner
- alternatives:
  1. hotl — подтверждение только критических шагов; фиксируется в profile.md.
  2. hitl — опрос на каждом шаге; дефолт проекта.
  3. hootl — полная автономия; противоречит принципу 1 для SME-выборов.
- choice: 1
- rationale: тестовые контракты — детерминированная техническая работа, снижаем overhead опросов.
- traces_to: [profile.md]

## 2026-04-22 16:02 — Выбор unit-фреймворка

- context: юнит-тесты для domain и application слоёв.
- autonomy_mode: hotl
- phase: testing
- role: product-owner
- alternatives:
  1. Vitest — Vite-native runner, встроенный coverage через v8.
  2. Jest + ts-jest — медленнее, требует доп. конфиг ESM+TS.
  3. Node test runner + c8 — нулевые зависимости, не знает о Vite resolution.
- choice: 1
- rationale: zero-config с Vite; быстрый фидбэк; широкая экосистема matchers.
- traces_to: [phases/testing/testing.md]

## 2026-04-22 16:03 — Выбор E2E-фреймворка

- context: один smoke-тест на сценарий add-toggle-remove.
- autonomy_mode: hotl
- phase: testing
- role: product-owner
- alternatives:
  1. Playwright — cross-browser, auto-waiting, trace viewer, MCP-интеграция.
  2. Cypress — хорошая DX, но тесты в iframe, DOM-изоляция сложнее.
  3. Puppeteer + ручные asserts — минимализм, но больше boilerplate.
- choice: 1
- rationale: надёжный auto-waiting устраняет flaky-тесты; trace viewer ускоряет debug.
- traces_to: [phases/testing/testing.md]

## 2026-04-22 16:04 — Политика coverage

- context: третий слой TDD (coverage gate по принципу 5).
- autonomy_mode: hotl
- phase: testing
- role: product-owner
- alternatives:
  1. 100% line+branch на domain+application; адаптеры исключены; E2E покрывает UI.
  2. 80% всюду без исключений — мягко, но допускает дыры в core-логике.
  3. 100% на весь src/ — полнота, но моки DOM хрупкие.
- choice: 1
- rationale: концентрирует строгость на чистой логике; адаптеры — интеграцией.
- traces_to: [phases/testing/testing.md, plugin-config.md]

## 2026-04-22 16:05 — Продвижение альф фазы Testing

- context: тест-план фиксирует критерии приёмки исполнимо до реализации.
- autonomy_mode: hotl
- phase: testing
- role: product-owner
- alternatives:
  1. Requirements: Coherent → Acceptable; Work: Initiated → Prepared.
  2. Консервативно: без движения — тесты не запущены против кода.
  3. Агрессивно: Software System → Demonstrable без кода.
- choice: 1
- rationale: TDD-контракты и структура тестов — измеримое свидетельство готовности к реализации.
- traces_to: [alphas.md, phases/testing/testing.md]

## 2026-04-23 10:00 — Переключение автономности на HOOTL для development

- context: пользователь задал `автономность - hootl` в аргументах фазы.
- autonomy_mode: hitl (мета-решение), hootl (применение)
- phase: development
- role: product-owner
- alternatives:
  1. hootl — альтернативы фиксируются автономно без опроса пользователя.
  2. hotl — подтверждение каждого значимого шага.
  3. hitl — полный опрос на каждом выборе.
- choice: 1
- rationale: plain development cycle TDD детерминирован; hootl снижает overhead.
- traces_to: [profile.md]

## 2026-04-23 10:01 — Ревизия архитектуры: Vanilla TS → React 18

- context: пользователь задал `стек - typescript, react, ...`; противоречит architecture.md.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. Обновить architecture.md: React в `adapters/ui`, domain/application неизменны.
  2. Отказать и настоять на Vanilla DOM, следуя исходной architecture.md.
  3. Переключить architecture на React целиком, включая domain (анти-hexagonal).
- choice: 1
- rationale: hexagonal-границы сохранены; React становится UI-адаптером; core-логика независима.
- traces_to: [phases/architecture/architecture.md, phases/development/development.md]

## 2026-04-23 10:02 — Выбор workflow для development на pet

- context: одноветочная стратегия для одного разработчика.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. Trunk-based на main + Conventional Commits + SemVer — pet-ряд матрицы.
  2. GitHub Flow + PR review — избыточно без команды.
  3. GitFlow/Release-flow — избыточно без релизных циклов.
- choice: 1
- rationale: pet-проект; нет ревьюера; конвенциональные коммиты дают ясную историю.
- traces_to: [phases/development/development.md, profile.md]

## 2026-04-23 10:03 — Выбор форматера и линтера

- context: принцип 6 требует детерминированных инструментов после development.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. Prettier + ESLint (flat config, v9) + typescript-eslint — фактически установлено.
  2. Biome (единый toolchain) — менее зрелая экосистема плагинов.
  3. Только Prettier, без линтера — нарушает принцип 6.
- choice: 1
- rationale: Prettier нормализует формат, ESLint ловит антипаттерны; оба установлены в node_modules.
- traces_to: [plugin-config.md, eslint.config.js, .prettierrc.json]

## 2026-04-23 10:04 — Миграция на flat config ESLint

- context: в node_modules установлен ESLint 9, не поддерживающий legacy `.eslintrc`.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. Flat config `eslint.config.js` (ESLint 9) — принять текущее окружение.
  2. Pin `eslint@^8` и вернуться к `.eslintrc.cjs` — требует `npm install`.
  3. Оставить оба формата — не поддерживается ESLint 9.
- choice: 1
- rationale: не создавать зависимости от внешних операций npm; flat config — современный стандарт.
- traces_to: [eslint.config.js, package.json]

## 2026-04-23 10:05 — Исправление YAML-quoting в plugin-config

- context: hook падал: bash трактовал `'npx prettier --check'` как имя программы с пробелами.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. Убрать кавычки из YAML-значений `command` и `scope_globs`.
  2. Патчить плагинный скрипт enforce-format-lint.sh — выходит за границу целевого.
  3. Записать команды в отдельный shell-скрипт и ссылаться на него.
- choice: 1
- rationale: минимальная и точечная правка целевого конфига; скрипты плагина не трогаются.
- traces_to: [plugin-config.md]

## 2026-04-23 10:06 — Выбор environment для vitest на domain-фазе

- context: jsdom не установлен в текущем node_modules; setupFiles импортирует пакеты UI.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. Временно `environment: 'node'` без setupFiles — domain/application не требуют DOM.
  2. Требовать `npm install jsdom @testing-library/jest-dom` немедленно.
  3. Пропустить coverage gate до установки зависимостей — ослабляет принцип 5.
- choice: 1
- rationale: unit-тесты domain не зависят от DOM; UI-тесты добавятся после `npm install`.
- traces_to: [vitest.config.ts, tasks.md (T-INFRA-03..05)]

## 2026-04-23 10:07 — Первый TDD-цикл (TaskId + Task)

- context: стартовый Red-Green-Refactor цикл по bottom-up порядку из development.md.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. TaskId → Task как первый цикл; 100% coverage на обоих.
  2. Начать с `TodoList` aggregate для демонстрации сразу use case.
  3. Начать с use case `AddTaskUseCase` через TDD outside-in.
- choice: 1
- rationale: bottom-up проще; domain-примитивы не имеют внешних зависимостей; быстрый фидбэк.
- traces_to: [src/domain/task-id.ts, src/domain/task.ts, tests/unit/domain/task-id.test.ts, tests/unit/domain/task.test.ts]

## 2026-04-23 10:08 — Продвижение альфы Work до Started

- context: реализация начата; первый TDD-цикл завершён с 100% coverage.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. Work: Prepared → Started; Software System удерживается на Architecture Selected.
  2. Также продвинуть Software System → Demonstrable.
  3. Удержать Work на Prepared до полного MVP.
- choice: 1
- rationale: сквозного сценария пока нет; Software System ждёт end-to-end работы.
- traces_to: [alphas.md]

## 2026-04-23 11:30 — Исправление YAML-quoting в tdd_scope

- context: hook enforce-tdd.sh парсит scope только во flow-style.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. Перевести tdd_scope.include и exclude во flow-style `[...]`.
  2. Патчить скрипт плагина.
  3. Игнорировать исключения и писать trivial тесты для port-интерфейсов.
- choice: 1
- rationale: точечная правка конфига целевого; скрипты плагина не трогаются.
- traces_to: [plugin-config.md]

## 2026-04-23 11:31 — Тесты application через FakeRepo и injected id-factory

- context: тестируемость application-слоя без реального storage.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. FakeRepo (in-memory) + inject idFactory в AddTaskUseCase.
  2. Мокать TaskRepository через vi.fn() — связывает тесты с Vitest API.
  3. Реальный LocalStorageTaskRepository с jsdom — требует установки jsdom.
- choice: 1
- rationale: чистая изоляция; быстрые тесты; pet-уровень простоты.
- traces_to: [tests/helpers/fake-repo.ts, tests/unit/application/*]

## 2026-04-23 11:32 — Завершение core-слоя (domain + application)

- context: все 8 US/NFR покрыты use case'ами и запросами; coverage gate 100%.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. Продолжить TDD на UI+storage без коммита — рискуем потерять прогресс.
  2. Остановиться и запросить коммит у пользователя.
  3. Сделать коммит автоматически — противоречит feedback-правилу.
- choice: 2
- rationale: ядро самодостаточно; разделение на коммиты даёт чистую историю.
- traces_to: [tasks.md]

## 2026-04-23 11:33 — Продвижение Software System до Demonstrable

- context: hexagonal-ядро демонстрирует ключевые архитектурные характеристики исполнимо.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. Architecture Selected → Demonstrable: ядро работает через use cases.
  2. Удержать на Architecture Selected до первой UI-сборки.
  3. Переход сразу в Usable — преждевременно, нет UI.
- choice: 1
- rationale: инварианты, порт, слои и сценарии add/toggle/remove/filter исполнимы.
- traces_to: [alphas.md, phases/development/development.md]

## 2026-04-23 16:00 — Разблокировка инфраструктуры

- context: npm install, playwright install, возврат jsdom/RTL/React-plugin.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. Выполнить npm install и playwright install; восстановить vitest config.
  2. Изолировать UI-разработку в другом репозитории без установки локально.
  3. Отказаться от Playwright и ограничиться RTL-тестами.
- choice: 1
- rationale: локальная инфра обязательна для сквозного TDD-цикла UI+E2E.
- traces_to: [package.json, vitest.config.ts, eslint.config.js, node_modules/]

## 2026-04-23 16:30 — TDD для LocalStorageTaskRepository

- context: port-адаптер persistence через Web Storage API.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. Zod-схема + безопасный parse + fallback на пустой массив при повреждении.
  2. JSON.parse без валидации — быстро, но ломается при повреждении или миграции.
  3. Собственные парсеры без zod — переизобретение с меньшим покрытием кейсов.
- choice: 1
- rationale: двухслойная защита (JSON.parse + schema) соответствует architecture §3.6.
- traces_to: [src/adapters/storage/*, tests/unit/adapters/storage/*]

## 2026-04-23 17:00 — TDD UI через React Testing Library

- context: user-centric тесты компонентов и контейнера.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. RTL с user-event v14 — имитация реального взаимодействия.
  2. Enzyme с shallow rendering — устарел, не рекомендуется для React 18.
  3. Без тестов на UI, полагаться на E2E — нарушает coverage-план.
- choice: 1
- rationale: RTL фокусируется на поведении, не на реализации; подходит DDD/hexagonal.
- traces_to: [tests/unit/adapters/ui/*, src/adapters/ui/*]

## 2026-04-23 17:15 — Паттерн force-refresh в TodoApp

- context: use cases мутируют репо; React не знает о новом состоянии без сигнала.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. useState-счётчик version, bump() после каждой мутации; listQ.execute на каждом рендере.
  2. Event bus / Observable repo — оверинжиниринг для pet.
  3. useSyncExternalStore — требует реализации subscribe в репозитории, избыточно.
- choice: 1
- rationale: минимальная пара строк; соответствует pet-уровню простоты.
- traces_to: [src/adapters/ui/TodoApp.tsx]

## 2026-04-23 17:30 — Playwright E2E с webServer: build+preview

- context: E2E должно работать против продакшн-бандла.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. webServer `npm run build && npm run preview` на порту 4173.
  2. webServer `npm run dev` (Vite dev-server) — не тестирует бандл.
  3. Отдельный docker контейнер с nginx — оверхед для pet.
- choice: 1
- rationale: E2E ближе к реальному деплою; bundle отличается от dev-кода.
- traces_to: [playwright.config.ts, tests/e2e/add-toggle-remove.spec.ts]

## 2026-04-23 17:45 — Продвижение Software System до Usable

- context: сквозной сценарий работает в реальном браузере с persistence.
- autonomy_mode: hootl
- phase: development
- role: product-owner
- alternatives:
  1. Demonstrable → Usable: пользователь может реально использовать приложение.
  2. Удержать на Demonstrable до первого внешнего пользователя.
  3. Сразу Ready — требует deployment, пока не пройдено.
- choice: 1
- rationale: UI + E2E + persistence закрывают все US/NFR; Ready ждёт deployment.
- traces_to: [alphas.md, phases/development/development.md, src/adapters/ui/*]

## 2026-04-23 18:00 — Уровень SME на фазе deployment

- context: GitHub Actions + Pages = mid-ряд матрицы (не pet `deploy.sh`).
- autonomy_mode: hotl
- phase: deployment
- role: product-owner
- alternatives:
  1. Пометить deployment как mid (честно).
  2. Оставить pet, задокументировать отклонение.
  3. Упростить до pet: локальный `deploy.sh` без CI.
- choice: 1
- rationale: искренний уровень улучшает consistency-аудит; CI-опыт важен для learning.
- traces_to: [profile.md, phases/deployment/deployment.md]

## 2026-04-23 18:01 — Триггер workflow

- context: как запускать деплой.
- autonomy_mode: hotl
- phase: deployment
- role: product-owner
- alternatives:
  1. push в main (авто) + workflow_dispatch (ручной rollback/повтор).
  2. Только workflow_dispatch — нет continuous delivery.
  3. push тега v* — требует дисциплины тегирования.
- choice: 1
- rationale: continuous deployment из trunk; ручной вариант — страховка.
- traces_to: [.github/workflows/deploy.yml]

## 2026-04-23 18:02 — Стратегия rollback

- context: как откатывать сломанную версию.
- autonomy_mode: hotl
- phase: deployment
- role: product-owner
- alternatives:
  1. git revert + push — тот же pipeline редеплоит предыдущий код.
  2. workflow_dispatch с input ref (SHA) — быстрее, но вне git-истории.
  3. UI GitHub Pages rollback — непрозрачно, вне git.
- choice: 1
- rationale: git — единственный источник правды; прозрачная история.
- traces_to: [phases/deployment/deployment.md]

## 2026-04-23 18:03 — CI gate перед деплоем

- context: что проверять перед публикацией артефакта.
- autonomy_mode: hotl
- phase: deployment
- role: product-owner
- alternatives:
  1. lint + typecheck + unit + coverage + build; E2E отдельный workflow.
  2. Всё включая E2E в одном pipeline — доп. время на установку chromium.
  3. Только build — риск отправить сломанный код.
- choice: 1
- rationale: быстрая обратная связь на деплой; E2E параллельно не блокирует.
- traces_to: [.github/workflows/deploy.yml, .github/workflows/e2e.yml]

## 2026-04-23 18:04 — Добавление base-пути в vite.config.ts

- context: GitHub Pages размещает проект по `/todo-list/`.
- autonomy_mode: hotl
- phase: deployment
- role: product-owner
- alternatives:
  1. `base: '/todo-list/'` в vite.config.ts + обновить playwright baseURL.
  2. Custom domain `CNAME` + root base `'/'` — требует домена.
  3. Хардкодить через env-переменную — оверхед для pet.
- choice: 1
- rationale: минимальная правка; соответствует URL-схеме GitHub Pages.
- traces_to: [vite.config.ts, playwright.config.ts, phases/architecture/architecture.md]

## 2026-04-23 18:05 — Продвижение альф фазы Deployment

- context: pipeline зафиксирован и локально верифицирован.
- autonomy_mode: hotl
- phase: deployment
- role: product-owner
- alternatives:
  1. Software System: Usable → Ready; Work: Started → Under Control.
  2. Удержать Software System на Usable до первого успешного run в CI.
  3. Software System → Operational — преждевременно; нет факта прода.
- choice: 1
- rationale: pipeline валиден и воспроизводим локально; Operational ждёт реального run.
- traces_to: [alphas.md, phases/deployment/deployment.md]
