---
name: audit
type: audit-report
project: todo-list
run_at: 2026-04-22 15:12
auditor: sdlc-consistency-auditor
status: warn
issues_count: 7
---

# Audit: todo-list

## 1. Резюме

Аудит выполнен после прохождения всех 7 фаз SDLC (vision → operations) на SME-уровне `pet`.
Целевая система (статический веб-сайт на TypeScript) успешно собирается, выкатывается в production-среду GitHub Pages (`https://ypolosov.github.io/todo-list/`) и отвечает критериям приёмки фазы operations.

Детерминированные технические gates зелёные:

- `npx vitest run` — 15/15 тестов проходят (task-service 8, task-store contract 6, ui smoke 1).
- `npx vitest run --coverage` — `TaskService`: 100% statements/branches/functions/lines; `TaskStore`: 92.3% (branches 84.6%).
- `npx tsc --noEmit` — 0 ошибок.
- `npx eslint src/` — 0 нарушений.
- `check-system-readmes.sh` — exit 0 (нет устаревших system-readme; sidecar `README.sdlc.md` свеж).
- В `src/` нет комментариев (принцип 4а).

Методологические артефакты также в целом согласованы: все 7 фаз имеют артефакт с корректным frontmatter, `traces_from` указывают на существующие предыдущие артефакты, состояние альф в `alphas.md` отражает пройденные переходы.

Тем не менее выявлено 7 расхождений уровня `warn`: устаревший state-артефакт `tasks.md`, отсутствие обратных `traces_to` во всех фазах, локальные нарушения правила «≤15 слов» в `decisions.md`, неотражённый rationale «Architecture Selected → Demonstrable» в журнале альф и несколько мелких несоответствий между артефактом фазы и реальным артефактом репозитория. Ни один из найденных дефектов не является блокером — production работает, DoD требований выполнен, TDD-пары корректны. Итоговый статус — **warn**.

## 2. Проверки

| Проверка | Статус | Детали |
|---|---|---|
| Трассируемость фаз | warn | `traces_from` во всех 7 фазах корректны и разрешаются. `traces_to: []` во всех артефактах, хотя фазы пройдены и следующие артефакты существуют. |
| Соответствие уровню SME | pass | Все артефакты имеют `sme_level: pet` в profile.md и во frontmatter; объём и формат соответствуют ожиданиям pet. |
| Альфы ↔ артефакты | warn | Все продвижения в `alphas.md` имеют артефакт-свидетельство. Но переход `Software System: Architecture Selected → Demonstrable` помечен артефактом `phases/testing/plan.md` — семантика слабая (Demonstrable обычно требует исполняемого кода; код появился на development). Возможно, логичнее увязать Demonstrable с `phases/development/plan.md` + тестами. |
| System-context ↔ архитектура | warn | `system-context.md` содержит только `todo-list` как одну target-систему без подсистем. Архитектурный sketch также описывает одну систему с внутренней декомпозицией (TaskStore/TaskService/UI/AppBootstrap). Согласовано. Но `README.sdlc.md` (system-readme) показывает устаревшее состояние альф («Opportunity —», «Requirements —», «Software System —»), расходящееся с `alphas.md`. |
| Осиротевшие ссылки | pass | В `.claude/sdlc/**` нет markdown-ссылок формата `[…](…)`; все кросс-референсы — в frontmatter `traces_from` / `traces_to`. Все пути во frontmatter разрешаются (`README.md`, `README.sdlc.md`, файлы фаз, workflow-файлы). |
| TDD-семантика | warn | R1..R4 покрыты T1..T8; 15 тестов зелёные; TaskService 100% coverage. Однако coverage-gate в `vitest.config.ts` задан только для `src/task-service.ts`. Для `task-store.ts` порог не выставлен, строки 39-40 (`try/catch` парсинга) не покрыты. Заявлено «coverage-gate для TaskService = 100%» — это выполнено; расширение на TaskStore-контракт отсутствует. |
| Memom-консистентность (Волна 2) | n/a | `memom.md` в плагине отсутствует в пределах данной инсталляции (Волна 2 не активирована). |

Дополнительные наблюдения:

- В `decisions.md` для значимых решений альтернативы перечислены (принцип 1). Но в части записей нарушена норма «≤15 слов на утверждение».
- `tasks.md` (state-артефакт Work-альфы) хранит R1-R4 в статусе `backlog`, хотя все R1..R4 реализованы, задеплоены и подтверждены тестами + production URL.
- В `profile.md` в `Активная роль` указана только `architect`, но в `roles.md` → `active_roles: [product-owner, architect]`. Product-owner потребовался в фазе operations (запись в decisions.md 2026-04-22 15:45 создана под ролью `architect`, хотя обратная связь — интерес product-owner).

## 3. Найденные расхождения

### I-1 (important). Пустые `traces_to` во всех артефактах фаз

- Локация: `phases/vision/lean-canvas.md`, `phases/requirements/todo.md`, `phases/architecture/sketch.md`, `phases/testing/plan.md`, `phases/development/plan.md`, `phases/deployment/plan.md`, `phases/operations/plan.md`.
- Описание: у всех семи артефактов `traces_to: []`, хотя фазы пройдены и артефакты следующих фаз существуют. Обратная трассируемость потеряна.

### I-2 (important). Устаревший state-артефакт `tasks.md`

- Локация: `.claude/sdlc/tasks.md`.
- Описание: задачи R1..R4 значатся в статусе `backlog` с датой `2026-04-22`. Фактически все реализованы, покрыты тестами T1..T8 и задеплоены в production. Журнал работ не отражает реальное состояние Work-альфы (`Under Control` со всеми задачами done).

### I-3 (important). Рассинхронизация `README.sdlc.md` с `alphas.md`

- Локация: `/home/ypolosov/DEV/GITS/todo-list/README.sdlc.md`.
- Описание: `README.sdlc.md` раздел «3. Состояние альф относительно системы» показывает `Opportunity —`, `Requirements —`, `Software System —`, `Work —`. В `alphas.md` эти альфы продвинуты до `Viable`, `Addressed`, `Operational`, `Under Control`. Sidecar устарел относительно журнала.

### I-4 (note). Нарушения правила «≤15 слов» в `decisions.md`

- Локация: `.claude/sdlc/decisions.md`, строки 31, 32, 35, 36, 67, 123, 127 (7 нарушений от 16 до 23 слов).
- Описание: CLAUDE.md проекта исключает из правила только `audit.md` и fenced-блоки. `decisions.md` подчинён общему правилу. Рекомендуется разбить длинные утверждения на короткие или перенести детали в artefact фазы.

### I-5 (note). Слабая семантика перехода `Software System: Architecture Selected → Demonstrable`

- Локация: `.claude/sdlc/alphas.md`, строка «2026-04-22 | Software System | Architecture Selected | Demonstrable | `phases/testing/plan.md`».
- Описание: Demonstrable традиционно требует «executable увидит stakeholder». Testing-plan — план тестов, не демонстрация. Код, подтверждающий Demonstrable, появляется на фазе development. Привязка к `phases/testing/plan.md` спорна.

### I-6 (note). Coverage-gate не покрывает `TaskStore`

- Локация: `/home/ypolosov/DEV/GITS/todo-list/vitest.config.ts`.
- Описание: `thresholds` задан только для `src/task-service.ts`. Для `src/task-store.ts` порог отсутствует; fallback-ветка `LocalStorageTaskStore.load()` (строки 39-40) без покрытия. `phases/testing/plan.md` заявляет «TaskStore (обе реализации) — контрактные тесты T7» без численного порога; формально не нарушено, но fitness-функция слабее, чем могла бы быть.

### I-7 (note). `profile.md` указывает одну активную роль, `roles.md` — две

- Локация: `.claude/sdlc/profile.md` «Активная роль» vs `.claude/sdlc/roles.md` «Текущая роль».
- Описание: `profile.md` декларирует активной только `architect`. `roles.md` помечает активными обе роли (`[product-owner, architect]`). Источник истины по активной роли не определён явно.

## 4. Предложенные фиксы

Для каждого расхождения приведены 2-3 альтернативы (принцип 1). Фиксы не применяются автоматически; выбор — за пользователем через `/sdlc-audit --apply`.

### Фикс I-1 (traces_to пустые)

1. Заполнить `traces_to` обратной цепочкой: `vision→requirements→architecture→{testing,development}→deployment→operations`, включая все фактические артефакты и ключевые файлы репозитория (workflow-файлы для deployment).
2. Оставить `traces_to: []` во всех фазах как сознательное решение для pet и зафиксировать это правило в `plugin-config.md`; добавить запись в `decisions.md` с обоснованием «для pet-масштаба достаточно forward-only трассировки».
3. Заполнить `traces_to` только у первых трёх фаз (vision/requirements/architecture), потому что далее идёт ветвление и обратная ссылка неоднозначна.

Рекомендация: вариант 1, так как стоит минимум усилий и восстанавливает обратную трассировку без изменений политики.

### Фикс I-2 (stale tasks.md)

1. Обновить R1..R4 до статуса `done`, добавить дату `2026-04-22`, поле `Артефакт-свидетельство` с путями `src/task-service.test.ts`, `src/ui.smoke.test.ts`, production URL. Журнал изменений пополнить переходом backlog → done.
2. Оставить R1..R4 как backlog, но добавить раздел «История реализованных требований» с прямыми ссылками на тесты и PR.
3. Мигрировать state-артефакт из плоского `tasks.md` в директорию `.claude/sdlc/tasks/` (один файл на задачу) с историей переходов — повысит аудируемость, но избыточно для pet.

Рекомендация: вариант 1 — минимальный и семантически корректный.

### Фикс I-3 (README.sdlc.md устарел)

1. Синхронизировать таблицу «Состояние альф» в `README.sdlc.md` с `alphas.md` (через `sdlc-alpha-tracker`) и пометить updated-дату текущей.
2. Удалить таблицу из `README.sdlc.md`, оставить ссылку «см. `.claude/sdlc/alphas.md`» — избегает дублирования источников истины.
3. Сохранить текущее состояние и ввести TTL-флаг через `system_readme_ttl_days` (уже 30 в `plugin-config.md`) — но TTL не истёк, значит это не сработает автоматически.

Рекомендация: вариант 2 — минимизирует риск рассинхрона в будущем.

### Фикс I-4 (15-словный порог в decisions.md)

1. Разбить длинные утверждения на последовательность коротких: один rationale → несколько bullet-пунктов по ≤15 слов.
2. Перенести длинные rationale в артефакты соответствующих фаз, оставив в `decisions.md` краткую ссылку.
3. Явно исключить `decisions.md` из правила в `CLAUDE.md` (наравне с `audit.md`), обосновав «журнал альтернатив требует свободных формулировок».

Рекомендация: вариант 1 — соблюдает букву правила без исключений.

### Фикс I-5 (Demonstrable ↔ testing/plan.md)

1. Перенести переход `Software System: Architecture Selected → Demonstrable` на артефакт `phases/development/plan.md` (когда код стал зелёным), убрать его из привязки к testing-plan; для testing оставить переход `Requirements: Coherent → Acceptable`.
2. Оставить как есть, добавив в `alphas.md` примечание «Demonstrable = тест-контракты описаны; Usable = код реализован» — это отступление от канонической семантики OMG Essence.
3. Ввести промежуточную альфа-веху `Tests Contracted` между Architecture Selected и Demonstrable и привязать именно её к testing/plan.md; Demonstrable перенести на development.

Рекомендация: вариант 1 — возвращает каноническую семантику без изменения словаря альф.

### Фикс I-6 (coverage-gate TaskStore)

1. Добавить в `vitest.config.ts` порог для `src/task-store.ts` (например, 90/80/100/90) и покрыть catch-ветку `LocalStorageTaskStore.load()` тестом «некорректный JSON → пустой массив».
2. Исключить `task-store.ts` из `coverage.include`, потому что его покрытие обеспечивается contract-тестами, а порог — заявленный gate для чистой логики.
3. Оставить как есть, но явно зафиксировать в `phases/testing/plan.md` формулировку «для TaskStore — contract-тесты без численного порога; fallback-ветка acceptance-риска».

Рекомендация: вариант 1 — повышает уровень fitness-функции при малых затратах.

### Фикс I-7 (одна vs две активные роли)

1. Обновить `profile.md` → «Активная роль: product-owner и architect» и добавить запись в журнал изменений.
2. Удалить секцию «Активная роль» из `profile.md`, оставить единственный источник истины в `roles.md` (ссылкой).
3. Переименовать `product-owner` в `architect` как единственную активную и задокументировать, что architect покрывает интерес product-owner на pet-масштабе (уже встречается в decisions.md; но противоречит фактической записи 2026-04-22 12:35).

Рекомендация: вариант 2 — устраняет дублирование без потери информации.

## 5. Привязка к альфам

Состояние альф на момент аудита (источник — `sdlc-alpha-tracker`, отражено в `alphas.md`):

| Альфа | Состояние | Артефакт-свидетельство |
|---|---|---|
| Opportunity | Viable | `phases/operations/plan.md` + production URL |
| Stakeholders | Involved | `phases/requirements/todo.md` |
| Requirements | Addressed | `phases/testing/plan.md` |
| Software System | Operational | `phases/operations/plan.md` + `.github/workflows/deploy.yml` |
| Work | Under Control | `phases/development/plan.md` |
| Team | Seeded | `roles.md` |
| Way of Working | Principles Established | `plugin-config.md` |

Все альфы продвинуты до целевых pet-состояний. Замечания по переходам — в I-5 (Demonstrable ↔ testing) и косвенно I-2 (Work: состояние Under Control не сопровождено переходом R1..R4 в `done`).

## Статус

**warn** — 0 blocker, 3 important, 4 note. Production и fitness-функции зелёные. Расхождения носят методологический характер и не блокируют merge в main; устранение рекомендуется перед выпуском следующей итерации или перед демо-докладом.
