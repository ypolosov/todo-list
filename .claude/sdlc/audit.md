---
name: audit
type: audit-report
project: todo-list
run_at: 2026-04-19 13:15
auditor: sdlc-consistency-auditor
status: warn
issues_count: 4
applied_at: 2026-04-19 13:45
applied_count: 4
applied_status: fixed
---

# Сквозной аудит консистентности todo-list

## 1. Резюме

Итог: **warn** — найдены 4 расхождения, ни одно не блокирует merge.

Все 7 фаз SDLC (vision → requirements → architecture → testing → development → deployment → operations) пройдены. Трассируемость `traces_from` согласована по всей цепочке фаз. Все 5 фич (F-01…F-05) имеют acceptance-контракты в testing.md и реализацию в `src/` с парными тестами (62 теста зелёные, coverage domain/application = 100%). Все продвижения альф имеют артефакты-свидетельства. Все 23 записи в `decisions.md` содержат по 3 альтернативы (требование принципа 1 выполнено с запасом). SME-уровень `pet` согласован между `profile.md` и frontmatter всех фаз.

Найденные расхождения носят характер незавершённой обратной связи: `traces_to` везде пустые, `roles.md` не зеркалит все фазы, `system-context.md` не дозаписал подсистемы после фазы architecture. Ни одно не нарушает принципов и не требует отката альф.

## 2. Проверки

| Проверка | Статус | Детали |
|---|---|---|
| Трассируемость фаз | warn | Все `traces_from` корректны; но `traces_to` пустые во всех 7 фазах, хотя последующие фазы существуют. |
| Соответствие уровню SME | pass | Все 7 фаз — `sme_level: pet`, согласован с `profile.md`. |
| Альфы ↔ артефакты | pass | Каждое продвижение имеет артефакт; Production-прогон подкреплён GitHub Actions run 24626510735. |
| System-context ↔ архитектура | warn | `system-context.md` ещё пишет «Подсистемы: не определены», а `architecture.md` их определил (domain, application, inbound/outbound adapters). |
| Осиротевшие ссылки | pass | Все ссылки на `.claude/sdlc/**/*.md` разрешаются в существующие файлы. |
| TDD-семантика | pass | F-01…F-05 покрыты unit+component+E2E; пары source↔test существуют; код реализует acceptance-контракты из `testing.md`. |
| Memom-консистентность (Волна 2) | n/a | Волна 2 не активирована в проекте; `memom.md` плагина не отслеживается на pet-масштабе. |

Дополнительно (не входит в обязательный набор):

| Проверка | Статус | Детали |
|---|---|---|
| Roles ↔ phase assignments | warn | `roles.md` для `product-owner` перечисляет `[vision, requirements, operations]`, но фаза `architecture` также назначает `role: product-owner`. |
| Decisions — покрытие значимых выборов | pass | 23 записи охватывают все значимые выборы фаз; минимум 2 альтернативы выдержан во всех. |

## 3. Найденные расхождения

### I-01 — Пустые `traces_to` во всех фазах (important)

- Локация: `phases/vision/vision.md:12`, `phases/requirements/requirements.md:12`, `phases/architecture/architecture.md:12`, `phases/testing/testing.md:12`, `phases/development/development.md:12`, `phases/deployment/deployment.md:12`, `phases/operations/operations.md:12`.
- Описание: во frontmatter каждой фазы `traces_to: []` с комментарием «будут добавлены после фазы X». Поскольку все последующие фазы существуют, обратная трассировка должна быть заполнена. Это снижает навигацию и затрудняет impact-анализ при изменениях ранних фаз.
- Критичность: important — не блокирует, но ухудшает сопровождаемость.

### I-02 — system-context.md не дозаписал подсистемы (important)

- Локация: `.claude/sdlc/system-context.md:26`.
- Описание: строка «Подсистемы: не определены; уточняются в фазе architecture» устарела. В `architecture.md:89` подсистемы определены явно: `domain, application, inbound-adapters, outbound-adapters`. Фокус внимания должен быть актуален относительно уже пройденной фазы.
- Критичность: important.

### I-03 — roles.md не отражает фазу architecture для product-owner (note)

- Локация: `.claude/sdlc/roles.md:17`.
- Описание: колонка `phases` для `product-owner` = `[vision, requirements, operations]`. Однако `architecture.md:10` указывает `role: product-owner` (с пометкой «на pet-масштабе совмещает architect»). Согласование таблицы ролей с фактическими назначениями фаз нарушено.
- Критичность: note — историческая неточность, не влияет на альфы.

### I-04 — operations.traces_from пропускает непрерывную цепочку (note)

- Локация: `.claude/sdlc/phases/operations/operations.md:11`.
- Описание: `traces_from: [deployment.md, vision.md]`. Прямой предыдущей фазой является deployment; vision включён как источник цикла обратной связи Operations → Vision. Технически корректно, но отличается от линейной схемы трассировки других фаз. Стоит либо задокументировать это отклонение явно, либо ограничить `traces_from` линейной предыдущей фазой и выразить обратный цикл через `traces_to` в vision.
- Критичность: note.

## 4. Предложенные фиксы

Применяются только в режиме `--apply` (принцип 1: альтернативы фиксируются, выбор подтверждается пользователем).

### Фикс I-01 — заполнение `traces_to`

1. **Полная обратная трассировка.** Заполнить `traces_to` во всех 7 фазах всеми прямыми наследниками (vision → [requirements, operations]; requirements → [architecture, testing]; architecture → [testing, development]; testing → [development, deployment]; development → [deployment]; deployment → [operations]; operations → []).
2. **Минимальная обратная трассировка.** Заполнить только прямого линейного наследника (vision → [requirements], requirements → [architecture], …), не учитывая косвенные связи.
3. **Только комментарий.** Обновить текстовый комментарий «будут добавлены после…» → «итерация закрыта, наследники перечислены в секции 4». Оставить массив пустым, но честно отразить статус.

Рекомендация: **альтернатива 1** — даёт полноценный impact-анализ, незначительная стоимость на pet-масштабе.

### Фикс I-02 — актуализация system-context.md

1. **Обновить блок «Границы целевой системы».** Переписать «Подсистемы: не определены» → фактический список: `domain, application, inbound-adapters, outbound-adapters`. Добавить пометку «источник: фаза architecture».
2. **Добавить журнальную запись.** Оставить текущий блок как исторический, добавить новую запись в «Журнал фокусировок» с обновлением подсистем от 2026-04-19 (фаза architecture).
3. **Оставить как есть.** Зафиксировать, что `system-context.md` — привязка внимания на старте, а `architecture.md` — источник истины для подсистем. Принять расхождение сознательно.

Рекомендация: **альтернатива 1** — соответствует принципу «единственный источник истины» и делает system-context.md актуальным для Волны 2 (где из него будут генерироваться `README.sdlc.md`).

### Фикс I-03 — синхронизация roles.md

1. **Добавить architecture в список фаз product-owner.** В ячейке `phases` заменить `[vision, requirements, operations]` на `[vision, requirements, architecture, operations]` с пометкой «совмещает architect на pet-масштабе».
2. **Явно добавить роль architect.** В таблицу ролей добавить `architect` как активную роль, сослаться на обоснование в `decisions.md` (pet-совмещение).
3. **Не трогать.** Признать, что совмещение ролей на pet-масштабе не требует зеркального отражения; полагаться на frontmatter фаз как источник истины.

Рекомендация: **альтернатива 1** — минимальное изменение, сохраняет архитектуру «один product-owner с ремарками о совмещении».

### Фикс I-04 — трассировка operations

1. **Оставить как есть + документация.** Добавить в секцию 4 operations.md явное объяснение: «vision включён в traces_from как источник цикла обратной связи». Пояснение закрывает расхождение без изменения frontmatter.
2. **Привести к линейной схеме.** Убрать `vision.md` из `traces_from` operations, добавить `operations.md` в `traces_to` vision. Выразить цикл через обратную трассировку.
3. **Ввести отдельное поле.** Добавить в мета-шаблон `phase-artifact.meta.md` поле `feedback_loops_to: [...]` (Волна 2) для цикловых связей. На pet — записать неформально в тексте.

Рекомендация: **альтернатива 1** — минимальная стоимость, сохраняет существующий факт цикла, закрывает недопонимание.

## 5. Привязка к альфам

Состояние ключевых альф на момент аудита (через `sdlc-alpha-tracker`):

| Альфа | Состояние | Свидетельство |
|---|---|---|
| Opportunity | Addressed | `phases/operations/operations.md` + использование автором |
| Stakeholders | Involved | `phases/requirements/requirements.md` |
| Requirements | Acceptable | `phases/testing/testing.md` (acceptance для F-01…F-05) |
| Software System | Operational | GitHub Actions run 24626510735 + работающий URL |
| Work | Under Control | `phases/development/development.md` (62/62 тестов, метрики пробега) |
| Team | Formed | `roles.md` (product-owner, developer, tester активны) |
| Way of Working | Foundation Established | `profile.md` + `plugin-config.md` |

Ни одна альфа не требует отката по итогам аудита. Все расхождения относятся к навигации и зеркалированию уже принятых решений.

## 6. Применённые фиксы (2026-04-19 13:45)

Все 4 расхождения закрыты по рекомендованной альтернативе 1.

| ID | Альтернатива | Артефакты |
|---|---|---|
| I-01 | Полная обратная трассировка | frontmatter всех 7 `phases/*/*.md` |
| I-02 | Обновление блока «Границы целевой системы» + запись в журнал | `system-context.md` |
| I-03 | Добавить `architecture` в `phases` у `product-owner` | `roles.md` |
| I-04 | Пояснение в секции 4 operations | `phases/operations/operations.md` |

Журнал решения о применении: `decisions.md` записи уже содержат выбор альтернатив фиксов.
