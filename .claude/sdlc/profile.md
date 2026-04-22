---
name: profile
type: sdlc-profile
project: todo-list
created: 2026-04-22
updated: 2026-04-22
---

# Профиль SME целевого проекта

Методологический слой решений по SME и инструментам.
Конфиг hooks хранится отдельно в `plugin-config.md`.

## Таблица SME по фазам

| Фаза         | Уровень SME | Выбранный метод                                                        | Выбранный инструмент                                                                | default_autonomy |
| ------------ | ----------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------- |
| vision       | pet         | Одностраничное описание проблемы и цели без формализации стейкхолдеров | README-as-vision                                                                    | hitl             |
| requirements | pet         | Свободный список желаемого поведения без критериев приёмки             | Плоский TODO-список                                                                 | hitl             |
| architecture | pet         | Одностраничное описание структуры системы с одной диаграммой           | Mermaid-диаграмма                                                                   | hitl             |
| development  | mid         | Короткоживущие ветки с PR-review и автоматическими проверками кода     | GitHub Flow + PR review + Prettier + ESLint + Vite + Vitest + react-testing-library | hitl             |
| testing      | mid         | Пирамида автоматизированных тестов с покрытием как пороговым критерием | Vitest (unit) + Playwright (E2E smoke)                                              | hotl             |
| deployment   | pet         | Ручное развёртывание одной командой в одну среду                      | GitHub Pages + GitHub Actions workflow                                              | hotl             |
| operations   | pet         | —                                                                      | —                                                                                   | hitl             |

Уровень и инструмент фаз уточняются через `/sdlc-phase <name>`.
Пустые ячейки заполняет skill `sdlc-method-engineering`.

## Активная роль

- `product-owner` — выбрана при bootstrap.
- Запись о роли — в `roles.md`, секция «Текущая роль».

## История изменений SME

| Дата       | Фаза         | Было        | Стало                                                 | Мотив                                                      |
| ---------- | ------------ | ----------- | ----------------------------------------------------- | ---------------------------------------------------------- |
| 2026-04-22 | все          | placeholder | pet                                                   | bootstrap целевого проекта todo-list                       |
| 2026-04-22 | vision       | —           | README-as-vision                                      | выбор инструмента на фазе Vision                           |
| 2026-04-22 | requirements | —           | Плоский TODO-список                                   | выбор инструмента на фазе Requirements                     |
| 2026-04-22 | architecture | —           | Mermaid-диаграмма                                     | выбор инструмента на фазе Architecture                     |
| 2026-04-22 | testing      | pet         | mid                                                   | эскалация: coverage-gate + E2E-framework соответствуют mid |
| 2026-04-22 | testing      | —           | Vitest + Playwright                                   | выбор инструментов через extensions.md                     |
| 2026-04-22 | development  | pet         | mid                                                   | эскалация: GitHub Flow и Prettier+ESLint с конфигом        |
| 2026-04-22 | development  | —           | GitHub Flow + Prettier + ESLint + Vite + Vitest + RTL | выбор инструментов development                             |
| 2026-04-22 | deployment   | —           | GitHub Pages + GitHub Actions workflow                | выбор инструмента; автономность hotl                        |
