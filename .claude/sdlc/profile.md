---
name: profile
type: sdlc-profile
project: todo-list
created: 2026-04-19
updated: 2026-04-19
active_phase: requirements
---

# SME-профиль проекта todo-list

Методологический слой: решения пользователя по фазам SDLC.
Технический конфиг hooks вынесен в `plugin-config.md`.

## Таблица SME по фазам

| Фаза | Уровень SME | Выбранный метод | Выбранный инструмент | default_autonomy |
|---|---|---|---|---|
| vision | pet | product-discovery | mission-statement | hitl |
| requirements | pet | requirements-engineering | feature-list-with-acceptance | hitl |
| architecture | pet | не выбрано | не выбрано | hitl |
| development | pet | не выбрано | не выбрано | hitl |
| testing | pet | не выбрано | не выбрано | hitl |
| deployment | pet | не выбрано | не выбрано | hitl |
| operations | pet | не выбрано | не выбрано | hitl |

Уровни ставятся на старте как ориентир; уточняются на фазах через `sdlc-method-engineering`.

## Активная роль

- `product-owner` — владелец продукта.
- Детали и интересы роли: `.claude/sdlc/roles.md`.
- Каталог ролей: `catalogs/roles.md` плагина.

## История изменений SME

| Дата | Фаза | Было | Стало | Мотив |
|---|---|---|---|---|
| 2026-04-19 | все | — | pet (ориентир) | bootstrap проекта pet-масштаба |
| 2026-04-19 | vision | не выбрано | product-discovery + mission-statement | подтверждено в опросе фазы vision |
| 2026-04-19 | requirements | не выбрано | requirements-engineering + feature-list-with-acceptance | выбран формат pet: компактный список фич |

## Правила

- Уровни и инструменты уточняются на входе в фазу.
- Per-task override автономности в profile.md не пишется.
- Изменение уровня фиксируется в истории и в `decisions.md`.
