---
name: architecture
type: architecture
phase: architecture
sme_level: pet
method: software-architecture
tool: structure-sketch
alphas: [Software System, Requirements]
disciplines: [software-architecture, functional-decomposition]
role: product-owner
traces_from: [.claude/sdlc/phases/vision/vision.md, .claude/sdlc/phases/requirements/requirements.md]
traces_to: []
system_of_attention: todo-list
created: 2026-04-19
updated: 2026-04-19
---

# Architecture проекта todo-list

## 1. Назначение

Продвигает Software System от начального состояния до Architecture Selected.
Уточняет Requirements до Acceptable за счёт NFR.
Метод — software-architecture; инструмент — одностраничный эскиз.

## 2. Привязка к фазе и методу

- Фаза: architecture.
- Уровень SME: pet.
- Дисциплина: software-architecture, functional-decomposition.
- Инструмент: одностраничный архитектурный эскиз.
- Роль: product-owner (на pet-масштабе совмещает architect).

## 3. Содержание

### Значимые решения

| № | Решение | Альтернативы | Обоснование |
|---|---|---|---|
| A-01 | Web SPA без бэкенда | CLI Python; CLI Go | Браузер доступен везде; развёртывание = статика. |
| A-02 | React.js как UI-библиотека | Vanilla JS; Vue; Svelte | Знакомый экосистемный выбор; TDD-friendly. |
| A-03 | localStorage как хранилище | IndexedDB; файл на диске | Достаточно для CRUD списка задач; simplest thing that could work. |
| A-04 | Модульный монолит, hexagonal | Слоистая; feature-sliced | Чистые границы доменной логики и UI. |
| A-05 | Domain-driven design (lite) | Anemic model; transaction script | Бизнес-правила инкапсулированы в агрегате Task. |

### Качественные атрибуты

- **Простота**: одна страница, минимум зависимостей, явные слои.
- **Целостность данных**: запись в localStorage атомарна; при ошибке состояние откатывается.
- **Проверяемость**: domain-слой не знает о React и localStorage; тестируется без DOM.

### Функциональная декомпозиция

Функциональный анализ по Левенчуку Том 2 гл. 10.
Функции → модули через hexagonal:

| Функция | Альфа-требование | Модуль | Слой |
|---|---|---|---|
| Создать задачу | F-01 | AddTask use case | application |
| Показать задачи | F-02 | ListTasks use case | application |
| Отметить выполненной | F-03 | CompleteTask use case | application |
| Удалить задачу | F-04 | DeleteTask use case | application |
| Фильтровать | F-05 | FilterTasks use case | application |
| Хранить задачи | F-01…F-04 | LocalStorageTaskRepository | outbound adapter |
| Показать список | F-02, F-05 | TaskListView (React) | inbound adapter |
| Принимать ввод | F-01, F-03, F-04 | TaskFormView, TaskItemView | inbound adapter |

### Компоненты и границы

- **Domain**: сущность `Task`, value-object `TaskId`, enum `TaskStatus`.
  - Инварианты: непустой текст; статус — только `active` или `done`.
- **Application**: use cases над портом `TaskRepository`.
  - Порты: `TaskRepository` (save, delete, findAll).
- **Adapters/inbound**: React-компоненты, хуки вызывают use cases.
- **Adapters/outbound**: `LocalStorageTaskRepository` реализует порт.
- **Composition root**: точка сборки, связывает порты и адаптеры.

### Направление зависимостей

- Adapters зависят от Application.
- Application зависит от Domain.
- Domain ни от кого не зависит.
- React и localStorage упоминаются только в адаптерах.

### Границы целевой системы

- **Целевая**: SPA-приложение todo-list в браузере.
- **Окружение**: браузер (движок, localStorage API).
- **Подсистемы**: domain, application, inbound-adapters, outbound-adapters.
- **Не-подсистемы на pet**: отдельные `/sdlc-focus` не создаются.

## 4. Трассируемость

- traces_from: [`.claude/sdlc/phases/vision/vision.md`, `.claude/sdlc/phases/requirements/requirements.md`].
- traces_to: будут добавлены после фазы Testing и Development.
- Продвижение альф: `.claude/sdlc/alphas.md`.

## 5. Критерии готовности

- Значимые решения зафиксированы с альтернативами и обоснованием.
- NFR названы и увязаны с решениями.
- Функциональная декомпозиция покрывает все 5 фич требований.
- Направление зависимостей определено явно.
- Alpha Software System = Architecture Selected.
- Alpha Requirements = Acceptable (NFR уточнены).
- `validate-artifact.sh` и `check-cross-refs.sh` — зелёные.
