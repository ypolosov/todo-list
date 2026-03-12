---
status: "accepted"
date: 2026-03-12
decision-makers: [ypolosov]
consulted: []
informed: []
---

# ADR-002: Layered Architecture для Frontend SPA

## Context and Problem Statement

Frontend container (React SPA) из ITER-001 (ADR-001) концентрирует всю
бизнес-логику, UI, state management и persistence. Необходимо определить
внутреннюю архитектуру этого контейнера -- как декомпозировать его на
компоненты, чтобы обеспечить тестируемость бизнес-логики без DOM (QA-T1),
заменяемость storage (QA-M2) и реализацию UC-001, UC-002, UC-003.

## Decision Drivers

- QA-T1 -- Бизнес-логика тестируется без DOM и без localStorage (M, M)
- QA-M2 -- Замена localStorage на другой storage не затрагивает бизнес-логику (L, M)
- QA-U1 -- Создание задачи за 2 действия (H, L)
- QA-R1 -- Данные не теряются при перезагрузке страницы (H, L)
- QA-M1 -- Добавление нового поля задачи требует изменений в <= 3 модулях (M, M)
- UC-001 -- Управление задачами (CRUD) (High)
- UC-002 -- Категоризация задач (Medium)
- UC-003 -- Поиск и фильтрация задач (Medium)
- CON-001 -- Только оффлайн, данные в localStorage

## Considered Options

1. Flat structure -- все компоненты и логика в одном слое (React components с inline logic)
2. Feature-based modules -- группировка по фичам (todos/, search/, categories/)
3. Layered architecture -- четыре слоя: UI, Application, Domain, Infrastructure

## Decision Outcome

Выбран **вариант 3: "Layered Architecture"** с четырьмя слоями
(UI -> Application -> Domain -> Infrastructure), потому что он обеспечивает
чёткое разделение ответственностей, делает бизнес-логику тестируемой без
DOM (QA-T1), а storage заменяемым через абстракцию (QA-M2).

### Consequences

#### Good

- Domain Layer (TodoService) содержит только pure-функции -- тестируется
  обычными unit-тестами без DOM, React, localStorage (QA-T1)
- Infrastructure Layer абстрагирован через TodoRepository interface --
  замена localStorage на IndexedDB или in-memory storage не затрагивает
  Domain и Application Layers (QA-M2)
- Направленность зависимостей (UI -> App -> Domain -> Infra) предотвращает
  циклические зависимости и упрощает reasoning о системе
- Добавление нового поля задачи затрагивает: Todo model + TodoService +
  TodoForm = 3 модуля (QA-M1)
- При тестировании Application Layer можно заменить TodoRepository
  на in-memory stub (QA-T1)

#### Bad

- Для простого todo-приложения четыре слоя могут выглядеть избыточно --
  добавляют косвенность (indirection) при трассировке потока данных
- React hooks (Application Layer) не являются "чистым" слоем координации --
  они привязаны к React runtime, что создаёт partial coupling с UI framework

#### Neutral

- Application Layer (React hooks) формально зависит от React, но Domain
  и Infrastructure Layers полностью framework-agnostic
- Количество файлов увеличивается по сравнению с flat structure,
  но для production development это стандартная организация

## Pros and Cons of the Options

### 1. Flat structure

- Good, потому что минимальная церемония -- все в одном месте, быстрый старт
- Good, потому что привычно для маленьких React-приложений
- Bad, потому что бизнес-логика внутри React-компонентов -- тестирование
  требует DOM rendering (нарушает QA-T1)
- Bad, потому что прямые вызовы localStorage из компонентов -- невозможна
  замена storage без рефакторинга всех компонентов (нарушает QA-M2)
- Bad, потому что при росте функциональности (UC-001 + UC-002 + UC-003)
  компоненты становятся overloaded

### 2. Feature-based modules

- Good, потому что группировка по фичам интуитивна для навигации по коду
- Good, потому что каждый модуль инкапсулирует свою функциональность
- Bad, потому что общая логика (фильтрация применяется к задачам всех категорий)
  не имеет естественного "дома" -- возникают cross-cutting concerns
- Bad, потому что не решает QA-T1 без дополнительных правил (логика может
  оказаться в React-компонентах внутри фичи)
- Bad, потому что для 3 use cases и ~10 модулей feature-based структура
  создаёт больше overhead, чем layered

### 3. Layered architecture (выбран)

- Good, потому что чёткий separation of concerns: UI отдельно, логика отдельно,
  storage отдельно
- Good, потому что Domain Layer -- pure TypeScript, тестируется без всего (QA-T1)
- Good, потому что Repository pattern естественно абстрагирует storage (QA-M2)
- Good, потому что проверенный паттерн для production development, знакомый
  разработчикам
- Bad, потому что добавляет уровень косвенности (4 слоя для простого приложения)
- Neutral, потому что масштаб приложения (3 UC, ~12 компонентов) хорошо
  ложится на 4 слоя без перебора

## More Information

- Итерация: [ITER-002](../iterations/ITER-002.md)
- Предыдущее решение: [ADR-001](ADR-001-static-server-architecture.md) -- определяет frontend как контейнер
- Element Responsibility Table: [frontend-components-ert.md](../views/frontend-components-ert.md)
- Design Decision: [DD-002](../decisions/DD-002-storage-repository-pattern.md) -- Repository pattern для storage
