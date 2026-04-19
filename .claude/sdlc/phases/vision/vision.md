---
name: vision
type: vision
phase: vision
sme_level: pet
method: product-discovery
tool: mission-statement
alphas: [Opportunity, Stakeholders]
disciplines: [product-discovery, stakeholder-analysis]
role: product-owner
traces_from: []
traces_to: []
system_of_attention: todo-list
created: 2026-04-19
updated: 2026-04-19
---

# Vision проекта todo-list

## 1. Назначение

Продвигает Opportunity от Identified до Value Established.
Продвигает Stakeholders от Recognized до Represented.
Метод — product-discovery; инструмент — миссия продукта.

## 2. Привязка к фазе и методу

- Фаза: vision.
- Уровень SME: pet.
- Дисциплина: product-discovery, stakeholder-analysis.
- Инструмент: миссия продукта (одно ёмкое заявление).
- Роль: product-owner.

## 3. Содержание

### Миссия продукта

todo-list — учебный полигон для прогона полного SDLC через плагин `ai-driven-sdlc` на роли единственного пользователя-разработчика.

### Бенефициар и стейкхолдеры

- **Единственный стейкхолдер**: автор как пользователь и разработчик.
- Иных ролей, бета-тестеров или внешних заказчиков на старте нет.
- Конфликтов интересов нет; роль одна.

### Проблема, которую решает продукт

Основная ценность — методологическая: прогнать SDLC-плагин на реальном pet-проекте.
Предметная функция — минимальный список задач на один день как повод для итераций.
Статус-кво: бумажные заметки; их замена не является самоцелью.

### Не-цели

- Конкурировать с Todoist, Things, Apple Reminders.
- Хранить данные в облаке и синхронизировать между устройствами.
- Поддерживать совместную работу нескольких пользователей.
- Масштабироваться за пределы pet-уровня без смены SME-уровня.

### Горизонт

Продукт и SDLC-итерации укладываются в один день.
Короткий горизонт согласован с pet-масштабом.

### Критерий успеха

Методологический: пройдены фазы vision → requirements → architecture → development → testing → deployment → operations.
Продуктовый: автор может добавить задачу, отметить её выполненной, удалить.

## 4. Трассируемость

- traces_from: []
- traces_to: будут добавлены после фазы Requirements.
- Продвижение альф фиксируется в `.claude/sdlc/alphas.md`.

## 5. Критерии готовности

- Миссия сформулирована в одном абзаце.
- Стейкхолдер явно назван; конфликты интересов названы или исключены.
- Не-цели перечислены для защиты объёма.
- Alpha Opportunity продвинута до Value Established.
- Alpha Stakeholders продвинута до Represented.
