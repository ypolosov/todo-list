---
name: profile
type: sdlc-profile
project: todo-list
created: 2026-04-22
updated: 2026-04-23
---

# SME-профиль целевого проекта

Методологический слой SME-решений по фазам SDLC.
Уровень, метод и инструмент выбираются отдельно по каждой фазе.

## Таблица SME по фазам

| Фаза | Уровень SME | Выбранный метод | Выбранный инструмент | default_autonomy |
|---|---|---|---|---|
| vision | pet | Одностраничное описание проблемы и цели без формализации стейкхолдеров | README-as-vision | hitl |
| requirements | pet | Свободный список желаемого поведения без критериев приёмки | Freeform user stories | hitl |
| architecture | pet | Одностраничное описание структуры системы с одной диаграммой | Mermaid-диаграмма | hitl |
| development | pet | Линейная история изменений в одной основной ветке | Trunk-based на main + Conventional Commits + Semantic Versioning | hootl |
| testing | mid | Пирамида автоматизированных тестов с покрытием как пороговым критерием | Unit + Integration + E2E • Coverage gate | hotl |
| deployment | pet | — | — | hitl |
| operations | pet | — | — | hitl |

Методы и инструменты выбираются при запуске `/sdlc-phase <name>`.

## Активная роль

Пользователь играет роль `product-owner`.
Подробности в `roles.md`.

## История изменений SME

| Дата | Фаза | Было | Стало | Мотив |
|---|---|---|---|---|
| 2026-04-22 | bootstrap | — | pet по всем фазам | первичная инициализация |
| 2026-04-22 | vision | — | README-as-vision | выбор инструмента в фазе Vision |
| 2026-04-22 | requirements | — | Freeform user stories | выбор инструмента в фазе Requirements |
| 2026-04-22 | architecture | — | Mermaid-диаграмма | выбор инструмента в фазе Architecture |
| 2026-04-22 | testing | pet/hitl | mid/hotl, Vitest+Playwright+coverage | осознанный learning-upgrade для реальной пирамиды тестов |
| 2026-04-23 | development | pet/hitl | pet/hootl, Trunk+ConvCommits+SemVer | выбор workflow и автономности |
| 2026-04-23 | architecture | Vanilla TS | React 18 в adapters/ui | пересмотр UI-адаптера на фазе development |
