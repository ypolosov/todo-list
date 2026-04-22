---
name: decisions
type: decision-journal
project: todo-list
updated: 2026-04-22
---

# Журнал альтернатив и решений todo-list

Принцип 1: альтернативы всегда порождаются и фиксируются.

## 2026-04-19 10:00 — Масштаб проекта

- context: инициализация SDLC-каркаса; нужно зафиксировать уровень процесса.
- autonomy_mode: hitl
- phase: bootstrap
- role: product-owner
- alternatives:
  1. pet — минимальный процесс, один исполнитель, низкие риски.
  2. mid — небольшая команда, умеренный процесс, ощутимые риски качества.
  3. enterprise — кросс-функциональная команда, регуляторика, полный SDLC.
- choice: 1
- rationale: один исполнитель, учебный/pet-формат, минимум церемониала.
- traces_to: [`.claude/sdlc/profile.md`]

## 2026-04-19 10:01 — Активная роль

- context: роль пользователя влияет на предлагаемые фазы и вопросы.
- autonomy_mode: hitl
- phase: bootstrap
- role: product-owner
- alternatives:
  1. product-owner — фокус на ценности, требованиях, приоритетах.
  2. architect — фокус на значимых решениях и декомпозиции.
  3. developer — фокус на TDD и воплощении требований.
- choice: 1
- rationale: стартовая задача — определить ценность и границы продукта.
- traces_to: [`.claude/sdlc/roles.md`, `.claude/sdlc/profile.md`]

## 2026-04-19 10:02 — Целевая система

- context: граница системы определяется вниманием (принцип 7).
- autonomy_mode: hitl
- phase: bootstrap
- role: product-owner
- alternatives:
  1. Корень репозитория todo-list как единая система.
  2. Frontend-подсистема; backend — окружение.
  3. Backend-подсистема; UI — окружение.
- choice: 1
- rationale: на старте нет деления на подсистемы; целевая — всё приложение.
- traces_to: [`.claude/sdlc/system-context.md`]

## 2026-04-19 10:03 — State-артефакт для Work-альфы

- context: плагин не навязывает формат состояния (принцип 9).
- autonomy_mode: hitl
- phase: bootstrap
- role: product-owner
- alternatives:
  1. Каталог `.claude/sdlc/phases/` с файлами по фазам — гранулярность, git-дружественно.
  2. Одиночный файл `tasks.md` рядом с `alphas.md` — компактно, просто.
  3. GitHub Issues через MCP — командная работа, внешняя зависимость.
- choice: 2
- rationale: pet-масштаб; минимальные накладные расходы; offline-friendly.
- traces_to: [`.claude/sdlc/plugin-config.md`]

## 2026-04-19 10:10 — Следующий шаг после bootstrap

- context: bootstrap завершён; роль product-owner активна.
- autonomy_mode: hitl
- phase: cross-cutting
- role: product-owner
- alternatives:
  1. `/sdlc-phase vision` — продвинуть Opportunity от Identified, прояснить ценность.
  2. `/sdlc-phase requirements` — декомпозиция без Vision; риск: цели не зафиксированы.
  3. `/sdlc-focus` — уточнить границы системы до содержательных фаз.
- choice: 1
- rationale: Opportunity ещё Identified; Vision — штатный первый шаг для product-owner.
- traces_to: [`.claude/sdlc/alphas.md`, `.claude/sdlc/tasks.md`]

## 2026-04-19 10:20 — SME для фазы vision

- context: вход в фазу vision; выбрать уровень и форму артефакта.
- autonomy_mode: hitl
- phase: vision
- role: product-owner
- alternatives:
  1. pet + свободный `vision.md` — один экран, минимум структуры.
  2. pet + миссия продукта — одно ёмкое заявление о цели.
  3. mid + лифтовый питч по шаблону «для кого / что / зачем».
- choice: 2
- rationale: pet-масштаб; миссия даёт короткую якорную формулировку.
- traces_to: [`.claude/sdlc/phases/vision/vision.md`, `.claude/sdlc/profile.md`]

## 2026-04-19 10:21 — Содержание Vision

- context: зафиксировать проблему, стейкхолдера и горизонт.
- autonomy_mode: hitl
- phase: vision
- role: product-owner
- alternatives:
  1. Продуктовая ценность для широкой аудитории — облако, синхронизация.
  2. Локальный инструмент для личных задач — простота, own-your-data.
  3. Учебный полигон для SDLC — предмет вторичен, главное процесс.
- choice: 3
- rationale: явно выбран пользователем; честно отражает мотивацию.
- traces_to: [`.claude/sdlc/phases/vision/vision.md`]

## 2026-04-19 10:30 — SME для фазы requirements

- context: вход в фазу requirements; выбор формы артефакта.
- autonomy_mode: hitl
- phase: requirements
- role: product-owner
- alternatives:
  1. pet + список фич с критериями — компактно, минимум формальности.
  2. mid + user stories с acceptance criteria — стандартный шаблон, больше структуры.
  3. mid + use cases — сценарии взаимодействия по шагам.
- choice: 1
- rationale: pet-масштаб; простой табличный формат соответствует нагрузке.
- traces_to: [`.claude/sdlc/phases/requirements/requirements.md`, `.claude/sdlc/profile.md`]

## 2026-04-19 10:31 — Объём MVP

- context: нужно зафиксировать границы MVP до архитектуры.
- autonomy_mode: hitl
- phase: requirements
- role: product-owner
- alternatives:
  1. CRUD-минимум — добавить / отметить выполненной / удалить.
  2. CRUD + фильтр по статусу (активные / выполненные / все).
  3. CRUD + фильтр + приоритет / дедлайн.
- choice: 2
- rationale: фильтр дёшев и добавляет ценность; приоритеты отложены.
- traces_to: [`.claude/sdlc/phases/requirements/requirements.md`]

## 2026-04-19 10:40 — Технологический стек

- context: выбор стека до архитектурной декомпозиции.
- autonomy_mode: hitl
- phase: architecture
- role: product-owner
- alternatives:
  1. CLI на Python — нулевой порог, JSON-хранилище.
  2. Web SPA (React + localStorage) — без бэкенда, браузер везде.
  3. CLI на Go — один бинарь, кросс-платформенно.
- choice: 2
- rationale: явный выбор пользователя; SPA даёт простую развёртку.
- traces_to: [`.claude/sdlc/phases/architecture/architecture.md`]

## 2026-04-19 10:41 — Архитектурный стиль

- context: определить стиль до реализации.
- autonomy_mode: hitl
- phase: architecture
- role: product-owner
- alternatives:
  1. Без стиля (вся логика в компонентах React).
  2. Слоистая архитектура (view/controller/data).
  3. Модульный монолит + hexagonal + DDD-lite.
- choice: 3
- rationale: явный выбор пользователя; чистые границы domain от UI и storage.
- traces_to: [`.claude/sdlc/phases/architecture/architecture.md`]

## 2026-04-19 10:42 — Качественные атрибуты

- context: критичные NFR для pet-приложения.
- autonomy_mode: hitl
- phase: architecture
- role: product-owner
- alternatives:
  1. Простота + целостность данных — основное для личного инструмента.
  2. Скорость и отклик — оптимизация под большие списки.
  3. Расширяемость — приоритет гибкости над простотой.
- choice: 1
- rationale: явный выбор пользователя; целостность блокирует потерю задач.
- traces_to: [`.claude/sdlc/phases/architecture/architecture.md`]

## 2026-04-19 10:50 — Смена роли для реализации

- context: архитектура готова; требуется роль для testing/development.
- autonomy_mode: hitl
- phase: cross-cutting
- role: product-owner
- alternatives:
  1. Добавить developer + tester, запустить `/sdlc-phase testing` (TDD-first).
  2. Добавить developer, сразу `/sdlc-phase development` (нарушает TDD-first).
  3. Остаться product-owner, `/sdlc-focus` на подсистему.
- choice: 1
- rationale: принцип 5 TDD-first; pet-масштаб допускает совмещение ролей.
- traces_to: [`.claude/sdlc/roles.md`]

## 2026-04-19 11:00 — Стратегия тестирования

- context: TDD-first вход; нужна пирамида тестов и инструменты.
- autonomy_mode: hitl
- phase: testing
- role: developer
- alternatives:
  1. Только unit на domain/application — быстро, но без UI-проверки.
  2. Domain unit + smoke E2E — баланс цены и доверия.
  3. Только E2E через браузер — дорого, медленно, слабая изоляция.
- choice: 2
- rationale: domain изолирован, E2E покрывает сквозной сценарий.
- traces_to: [`.claude/sdlc/phases/testing/testing.md`, `.claude/sdlc/plugin-config.md`]

## 2026-04-19 11:01 — Инструменты тестирования

- context: стек React+TS; выбор runner и E2E.
- autonomy_mode: hitl
- phase: testing
- role: developer
- alternatives:
  1. Vitest + React Testing Library + Playwright.
  2. Jest + React Testing Library + Cypress.
  3. Playwright component + E2E как единый инструмент.
- choice: 1
- rationale: Vitest нативен для Vite-стека; быстрый запуск.
- traces_to: [`.claude/sdlc/phases/testing/testing.md`, `.claude/sdlc/plugin-config.md`]

## 2026-04-19 11:02 — Coverage-gate

- context: гранулярность порога покрытия.
- autonomy_mode: hitl
- phase: testing
- role: developer
- alternatives:
  1. Нет порога — метрика только для сведения.
  2. Domain/application 100 %; адаптеры без порога.
  3. Весь проект ≥ 80 %.
- choice: 2
- rationale: domain и application чисто тестируются; UI/storage — интеграционно.
- traces_to: [`.claude/sdlc/plugin-config.md`]

## 2026-04-19 11:30 — Bundler и package manager

- context: нужны build-tool и менеджер пакетов.
- autonomy_mode: hitl
- phase: development
- role: developer
- alternatives:
  1. Vite + npm — современный, нативен для Vitest.
  2. CRA + npm — устаревший и деприкацирован.
  3. Next.js + npm — избыточно для статичной SPA.
- choice: 1
- rationale: явный выбор пользователя; Vite + Vitest дают единый stack.
- traces_to: [`package.json`, `vite.config.ts`]

## 2026-04-19 11:31 — TDD-цикл

- context: как организовать прогон тесты→код.
- autonomy_mode: hitl
- phase: development
- role: developer
- alternatives:
  1. Red-Green-Refactor по фиче — канонический TDD.
  2. Test-first по слою — все тесты слоя, затем весь код слоя.
  3. Batch: все тесты → весь код.
- choice: 1
- rationale: явный выбор пользователя; короткие циклы дают быструю обратную связь.
- traces_to: [`.claude/sdlc/phases/development/development.md`]

## 2026-04-19 11:45 — Следующий шаг после development

- context: код написан, тесты зелёные; нужен путь до Usable.
- autonomy_mode: hitl
- phase: cross-cutting
- role: developer
- alternatives:
  1. `/sdlc-phase deployment` — сборка, запуск, публикация.
  2. `/sdlc-audit` — проверить консистентность до развёртывания.
  3. `/sdlc-phase operations` — сразу к эксплуатации (пропуск deployment).
- choice: 1
- rationale: естественный порядок; Software System требует среды для запуска.
- traces_to: [`.claude/sdlc/tasks.md`]

## 2026-04-19 12:00 — Хостинг и CI/CD

- context: статичная SPA; нужна бесплатная среда и автоматизация.
- autonomy_mode: hitl
- phase: deployment
- role: developer
- alternatives:
  1. GitHub Pages + GitHub Actions — бесплатно, уже в экосистеме GitHub Flow.
  2. Netlify / Vercel / Cloudflare Pages — PaaS с preview-URL, требует учётки.
  3. Только локальный запуск — без хостинга.
- choice: 1
- rationale: явный выбор пользователя; минимум внешних зависимостей.
- traces_to: [`.github/workflows/ci.yml`, `.github/workflows/deploy.yml`]

## 2026-04-19 12:01 — Стратегия отката

- context: как возвращать предыдущую версию при инциденте.
- autonomy_mode: hitl
- phase: deployment
- role: developer
- alternatives:
  1. `git revert` + автодеплой — идёт через обычный pipeline.
  2. Ручной redeploy старого sha через workflow_dispatch.
  3. Без rollback — fix forward.
- choice: 1
- rationale: явный выбор пользователя; обратимо, ~2 минуты до выката.
- traces_to: [`.claude/sdlc/phases/deployment/deployment.md`]

## 2026-04-19 12:20 — Наблюдаемость и обратная связь

- context: продукт в Operational; нужна минимальная ops-модель.
- autonomy_mode: hitl
- phase: operations
- role: developer
- alternatives:
  1. Ручная проверка URL + GitHub Issues как канал обратной связи.
  2. UptimeRobot / cron-ping + email alert.
  3. Pingdom + аналитика (Plausible/GA) + дашборд.
- choice: 1
- rationale: явный выбор пользователя; нет внешних зависимостей; pet-масштаб.
- traces_to: [`.claude/sdlc/phases/operations/operations.md`]

## 2026-04-19 12:21 — Реакция на инциденты

- context: нужен процесс отката и фиксации инцидентов.
- autonomy_mode: hitl
- phase: operations
- role: developer
- alternatives:
  1. Revert + 1-строчный postmortem в `decisions.md`.
  2. Отдельный артефакт на каждый инцидент (timeline, 5-whys).
  3. Fix-forward без записей.
- choice: 1
- rationale: явный выбор пользователя; лёгкая трассируемость без формализма.
- traces_to: [`.claude/sdlc/phases/operations/operations.md`]

## 2026-04-19 13:45 — Применение фиксов аудита

- context: `/sdlc-audit` обнаружил 4 расхождения (2 important, 2 note).
- autonomy_mode: hitl
- phase: cross-cutting
- role: developer
- alternatives:
  1. Применить все 4 фикса по рекомендации аудитора (альтернатива 1 каждый).
  2. Применить только important (I-01, I-02); два note отложить.
  3. Оставить отчёт без изменений.
- choice: 1
- rationale: фиксы локальные, метаданные, повышают согласованность каркаса.
- traces_to: [все `phases/*/*.md`, `system-context.md`, `roles.md`, `audit.md`]

## 2026-04-19 14:30 — Актуализация под плагин 0.2.1

- context: апгрейд `ai-driven-sdlc` 0.2.0 → 0.2.1; механизма миграций нет.
- autonomy_mode: hitl
- phase: cross-cutting
- role: developer
- changes_in_plugin:
  - `.mcp.json`: убран `context7` (конфликт с dedicated плагином).
  - `.github/ISSUE_TEMPLATE/work-unit.yml`: новый шаблон для Work-альфы.
  - README, CHANGELOG: документационные обновления.
  - skills/catalogs/agents/hooks/scripts: без изменений.
- alternatives:
  1. Скопировать `work-unit.yml` в проект; зафиксировать апгрейд.
  2. Только зафиксировать апгрейд; шаблон не копировать.
  3. Игнорировать апгрейд до накопления значимых изменений.
- choice: 1
- rationale: шаблон согласован с operations.md (GitHub Issues как канал feedback).
- traces_to: [`.github/ISSUE_TEMPLATE/work-unit.yml`, `.claude/sdlc/tasks.md`]

## 2026-04-19 14:31 — Не вендорить плагинный .mcp.json

- context: 0.2.1 убрал `context7` из `.mcp.json` плагина; конфликт с dedicated.
- autonomy_mode: hitl
- phase: cross-cutting
- role: developer
- alternatives:
  1. Не вендорить `.mcp.json` в проект; полагаться на user-scope плагины.
  2. Скопировать обновлённый `.mcp.json` в корень проекта.
  3. Создать собственный `.mcp.json` с подмножеством серверов.
- choice: 1
- rationale: `context7@claude-plugins-official` уже установлен user-scope; дублирование не нужно.
- traces_to: []
- evidence: отсутствие `.mcp.json` в корне проекта подтверждает решение.

## 2026-04-19 14:50 — Источник истины для plugin_version

- context: аудит I-05/I-06 — версия плагина рассинхронизирована между CLAUDE.md и журналами.
- autonomy_mode: hitl
- phase: cross-cutting
- role: developer
- alternatives:
  1. `plugin-config.md` — отделить версию плагина от схемы конфига; единый источник.
  2. `CLAUDE.md` — конституция как декларативный носитель версии.
  3. Не фиксировать; принять статус warn.
- choice: 1
- rationale: `plugin-config.md` уже точка интеграции с hooks; ниже риск дрейфа.
- traces_to: [`.claude/sdlc/plugin-config.md`, `.claude/CLAUDE.md`, `.claude/sdlc/audit.md`]
- evidence: убрано поле `plugin_version` из CLAUDE.md, decisions.md, tasks.md.

## 2026-04-19 14:51 — Связность задачи актуализации

- context: аудит I-07 — циркулярная ссылка в 14:31 + отсутствие `traces_from` в задаче.
- autonomy_mode: hitl
- phase: cross-cutting
- role: developer
- alternatives:
  1. Добавить `traces_from` в задачу; убрать циркулярную ссылку (заменить на `[]`).
  2. Только текстовая пометка без поля.
  3. Не трогать; формат `tasks.md` исторически без обратных следов.
- choice: 1
- rationale: формализация связки ускоряет impact-анализ; затраты минимальны.
- traces_to: [`.claude/sdlc/tasks.md`, `.claude/sdlc/decisions.md`]

## 2026-04-22 11:20 — Аудит I-01: рассинхронизация Stakeholders в external-system

- context: `/sdlc-audit --apply` — I-01 important. Локальная таблица `external-systems/user-product-owner.md` рапортовала `Stakeholders = Recognized`, трекер — `Involved`.
- autonomy_mode: hitl
- phase: cross-cutting
- role: product-owner
- alternatives:
  1. Обновить локальную таблицу: `Stakeholders = Involved`, свидетельство `requirements.md`.
  2. Убрать состояния из external-system, оставить только ссылку на `alphas.md`.
  3. Пометить как автогенерируемое и добавить задачу в backlog.
- choice: 1
- rationale: минимальная правка, синхронизирует с трекером, сохраняет локальный быстрый обзор.
- traces_to: [`.claude/sdlc/external-systems/user-product-owner.md`, `.claude/sdlc/audit.md`]
- evidence: `external-systems/user-product-owner.md` строка 30 — `Involved`; `updated: 2026-04-22`.

## 2026-04-22 11:21 — Аудит I-02: устаревшее поле updated в tasks.md

- context: `/sdlc-audit --apply` — I-02 important. `tasks.md.updated: 2026-04-19`, но записи 14:50/14:51 в `decisions.md` правили `tasks.md`.
- autonomy_mode: hitl
- phase: cross-cutting
- role: product-owner
- alternatives:
  1. Обновить `updated: 2026-04-22` вручную; зафиксировать sync metadata после аудита.
  2. Автоматизировать через hook, подбивающий `updated` по `git log -1 --format=%cs`.
  3. Оставить как есть, полагаясь на git-историю.
- choice: 1
- rationale: минимальная правка сейчас; автоматизацию — в backlog.
- traces_to: [`.claude/sdlc/tasks.md`, `.claude/sdlc/audit.md`]
- evidence: `tasks.md` frontmatter `updated: 2026-04-22`.

## 2026-04-22 11:22 — Аудит N-01: 15-word false positive на заголовках

- context: `/sdlc-audit --apply` — N-01 note. `validate-artifact.sh` трактует длинные заголовки как утверждения.
- autonomy_mode: hitl
- phase: cross-cutting
- role: product-owner
- alternatives:
  1. Оставить как есть; false positive задокументирован в `audit.md`.
  2. Добавить `exempt_patterns` локально для трёх файлов.
  3. Переформулировать заголовки короче.
- choice: 1
- rationale: исправление скрипта — задача плагина, не target-проекта. Локальные исключения добавят шум.
- traces_to: [`.claude/sdlc/audit.md`]
- evidence: статус `note`, нет изменений в артефактах.

## 2026-04-22 11:23 — Аудит N-02: traces_to в operations.md

- context: `/sdlc-audit --apply` — N-02 note. Пустой `traces_to` при описании feedback-цикла в тексте.
- autonomy_mode: hitl
- phase: cross-cutting
- role: product-owner
- alternatives:
  1. Добавить в `traces_to` путь к `vision.md` с пометкой feedback cycle.
  2. Ввести отдельное поле `traces_feedback`; требует правки мета-шаблона плагина.
  3. Оставить как есть; считать комментарий в тексте достаточным.
- choice: 1
- rationale: формализует обратный поток без модификации мета-шаблона плагина.
- traces_to: [`.claude/sdlc/phases/operations/operations.md`, `.claude/sdlc/audit.md`]
- evidence: `operations.md` — `traces_to: [.claude/sdlc/phases/vision/vision.md]`.

## 2026-04-22 11:24 — Аудит N-03: version_source в ai-driven-sdlc.md

- context: `/sdlc-audit --apply` — N-03 note. External-system без привязки к версии плагина; при апгрейде не подсвечивается в impact-анализе.
- autonomy_mode: hitl
- phase: cross-cutting
- role: product-owner
- alternatives:
  1. Добавить `version_source: .claude/sdlc/plugin-config.md` в frontmatter + упоминание в секции 1.
  2. Жёстко прописать `plugin_version: 0.2.1` (противоречит 14:50 от 2026-04-19).
  3. Оставить без изменений.
- choice: 1
- rationale: ссылка на источник без дублирования значения; соблюдает контракт 14:50.
- traces_to: [`.claude/sdlc/external-systems/ai-driven-sdlc.md`, `.claude/sdlc/audit.md`]
- evidence: `ai-driven-sdlc.md` frontmatter — `version_source: .claude/sdlc/plugin-config.md`.

## Правила

- Минимум 2 альтернативы; оптимально 3.
- HITL/HOTL — запись после подтверждения пользователя.
- HOOTL — запись автономно до действия.
- Задним числом выбор не переписывается; только новая запись.
