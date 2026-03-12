# ITER-002: Component Decomposition of Frontend SPA

| Параметр       | Значение                                          |
|----------------|---------------------------------------------------|
| Итерация       | ITER-002                                          |
| Статус         | Completed                                         |
| Дата начала    | 2026-03-12                                        |
| Дата завершения| 2026-03-12                                        |
| Цель           | Декомпозировать frontend container на компоненты для реализации UC-001, UC-002, UC-003 |

---

## Step 1: Review Inputs

### Состояние после ITER-001

- Reference architecture определена: React SPA + Express static server (ADR-001)
- Система декомпозирована на два контейнера: frontend и server
- CRN-001 разрешён, CON-002 полностью адресован
- CON-001 частично адресован (localStorage подтверждён, но adapter layer не детализирован)
- UC-001, UC-002, UC-003 не адресованы (функциональные требования)
- QA-T1, QA-M2 acknowledged, но не реализованы архитектурно

### Архитектурные драйверы (полный перечень)

**Функциональные требования:**

| ID     | Название                   | Приоритет | Текущий статус |
|--------|----------------------------|-----------|----------------|
| UC-001 | Управление задачами (CRUD) | High      | Not Addressed  |
| UC-002 | Категоризация задач        | Medium    | Not Addressed  |
| UC-003 | Поиск и фильтрация задач   | Medium    | Not Addressed  |

**Ограничения:**

| ID      | Название                                      | Текущий статус      |
|---------|-----------------------------------------------|---------------------|
| CON-001 | Только оффлайн, данные в localStorage         | Partially Addressed |

**Quality Attributes (из utility tree):**

| ID    | Scenario                                               | Приоритет | Текущий статус |
|-------|--------------------------------------------------------|-----------|----------------|
| QA-U1 | Создание задачи за 2 действия (ввод + Enter)          | (H, L)   | Not Addressed  |
| QA-R1 | Данные не теряются при перезагрузке                    | (H, L)   | Not Addressed  |
| QA-T1 | Бизнес-логика тестируется без DOM/localStorage         | (M, M)   | Acknowledged   |
| QA-M1 | Добавление поля задачи <= 3 модуля                    | (M, M)   | Not Addressed  |
| QA-R2 | Fallback при ошибке сериализации                      | (M, M)   | Not Addressed  |
| QA-M2 | Замена storage не затрагивает бизнес-логику            | (L, M)   | Acknowledged   |

---

## Step 2: Establish Iteration Goal

### Цель итерации

Декомпозировать frontend container на компоненты (component level C4),
определить внутреннюю архитектуру SPA и распределить ответственности
для реализации всех трёх use cases (UC-001, UC-002, UC-003).

### Драйверы в фокусе

| ID      | Тип        | Название                                       | Роль в итерации |
|---------|------------|------------------------------------------------|-----------------|
| UC-001  | Use Case   | Управление задачами (CRUD)                     | Основной -- определяет ядро компонентной модели |
| UC-002  | Use Case   | Категоризация задач                            | Основной -- влияет на модель данных и UI-компоненты |
| UC-003  | Use Case   | Поиск и фильтрация задач                       | Основной -- определяет Application Layer (hooks) и Domain Layer (filtering logic) |
| CON-001 | Constraint | Только оффлайн, данные в localStorage          | Доадресация -- storage adapter layer детализируется |
| QA-T1   | QA         | Бизнес-логика без DOM/localStorage             | Определяет разделение на слои (Domain отдельно) |
| QA-U1   | QA         | Создание задачи за 2 действия                  | Влияет на дизайн TodoForm |
| QA-R1   | QA         | Данные не теряются при перезагрузке             | Определяет стратегию persistence (save on every mutation) |

### Драйверы вне фокуса

- QA-P1 (загрузка < 2с) -- зависит от bundle size и deployment, не от компонентной архитектуры
- QA-P2 (500 задач без лагов) -- низкий приоритет, оптимизация рендеринга -- задача реализации

---

## Step 3: Choose Element to Refine

### Элемент

**frontend** (container) из текущей C4-модели.

### Тип декомпозиции

**A) Decompose** -- контейнер frontend разбивается на компоненты (Component level).

### Текущее состояние элемента

После ITER-001 frontend определён как монолитный контейнер:

```
frontend = container 'Frontend SPA' {
  technology 'React, Vite, TypeScript'
  description 'Single Page Application. Вся бизнес-логика, UI, state management
               и persistence (localStorage).'
}
```

Известные обязанности (из containers-ert.md): UI Rendering, State Management,
Business Logic, Persistence, Routing.

### Ожидаемый результат

Frontend будет декомпозирован на 12-14 компонентов, организованных
в 4 слоя (layered architecture), с чёткими ответственностями и
взаимодействиями.

---

## Step 4: Choose Design Concepts

### 4.1 Пространство решений

Основной вопрос: как организовать внутреннюю структуру React SPA, чтобы
обеспечить тестируемость бизнес-логики (QA-T1), заменяемость storage (QA-M2)
и реализацию всех use cases?

### 4.2 Рассмотренные варианты

| Критерий | 1. Flat structure | 2. Feature-based modules | 3. Layered architecture |
|----------|-------------------|--------------------------|-------------------------|
| **Описание** | Все компоненты и логика в одном уровне. Inline бизнес-логика в React-компонентах. | Группировка по фичам: todos/, search/, categories/. Каждая фича содержит UI + логику + storage. | 4 слоя: UI (React) -> Application (hooks) -> Domain (pure logic) -> Infrastructure (storage). |
| **QA-T1** | Не достигается. Бизнес-логика внутри React-компонентов требует DOM для тестирования. | Частично. Зависит от дисциплины -- логика может оказаться в компонентах. | Полностью достигается. Domain Layer содержит только pure-функции. |
| **QA-M2** | Не достигается. Прямые вызовы localStorage из компонентов. | Частично. Storage можно абстрагировать внутри фичи, но нет единого контракта. | Полностью достигается. TodoRepository interface абстрагирует storage. |
| **QA-M1** | Низкая. Новое поле может затронуть множество компонентов. | Средняя. Затрагивает 1-2 фичи, но внутри фичи -- несколько файлов. | Высокая. Todo model + TodoService + TodoForm = 3 модуля. |
| **Complexity** | Минимальная. Всё в одном месте. | Средняя. Несколько модулей, cross-cutting concerns. | Средняя. 4 слоя, но каждый простой. |
| **Familiarity** | Знакома для маленьких проектов. | Популярна в больших React-приложениях. | Проверенный паттерн enterprise development. |
| **Масштаб** | Подходит для < 5 компонентов. | Подходит для 20+ компонентов, 5+ фич. | Подходит для 10-50 компонентов, 3-10 фич. |

### 4.3 Анализ

**Вариант 1 (Flat structure) отклоняется:**
Прямое нарушение QA-T1 (бизнес-логика тестируется без DOM) и QA-M2
(заменяемость storage). Для production development неприемлемо --
отсутствует separation of concerns.

**Вариант 2 (Feature-based modules) отклоняется:**
Для 3 use cases и ~12 компонентов feature-based структура создаёт overhead
без значительных преимуществ. Cross-cutting concerns (фильтрация применяется
ко всем задачам, не к конкретной фиче) не имеют естественного размещения.
QA-T1 достижим, но не гарантирован архитектурно.

**Вариант 3 (Layered architecture) выбран:**
Оптимален для данного масштаба (3 UC, ~12 компонентов). Гарантирует
QA-T1 (Domain Layer = pure functions) и QA-M2 (Repository pattern).
Знакомый паттерн для команды. Направленность зависимостей предотвращает
спагетти-связи.

### 4.4 Дополнительные тактики

**Repository pattern** (DD-002) для абстракции storage:

- TodoRepository (interface) определяет контракт: `getAll()`, `save()`
- LocalStorageRepository -- конкретная реализация через localStorage API
- Обеспечивает QA-M2 (замена storage) и QA-T1 (InMemoryRepository для тестов)

**Reactive state через React hooks:**

- Application Layer реализован как custom hooks (useTodos, useSearch, useFilter)
- Hooks координируют Domain Layer и Infrastructure Layer
- Hooks привязаны к React, но Domain и Infrastructure -- framework-agnostic

### 4.5 Рекомендация

**Layered Architecture с четырьмя слоями и Repository pattern.**

Слои:

1. **UI Layer** -- React-компоненты (TSX). Только визуализация и обработка событий.
2. **Application Layer** -- React custom hooks. Координация бизнес-логики и persistence.
3. **Domain Layer** -- Pure TypeScript. Модели данных и бизнес-правила.
4. **Infrastructure Layer** -- TodoRepository interface + LocalStorageRepository implementation.

Зависимости: UI -> Application -> Domain -> Infrastructure -> localStorage API.

---

## Step 5: Instantiate Architectural Elements

### 5.1 Тип структуры

**B) C&C structure** (Component & Connector) -- определяются runtime-элементы
компонентного уровня внутри frontend container.

### 5.2 Перечень компонентов

#### UI Layer (6 компонентов)

| Компонент | Технология | Ответственность | Use Cases |
|-----------|------------|-----------------|-----------|
| Layout | React TSX | Корневая структура страницы, размещение дочерних компонентов | -- |
| TodoForm | React TSX | Форма создания/редактирования задачи, выбор категории | UC-001, UC-002 |
| TodoList | React TSX | Отображение отфильтрованного списка задач | UC-001, UC-003 |
| TodoItem | React TSX | Отображение одной задачи, действия (toggle, edit, delete) | UC-001, UC-002 |
| SearchBar | React TSX | Поле текстового поиска с real-time фильтрацией | UC-003 |
| CategoryFilter | React TSX | Фильтры по категории и статусу выполнения | UC-002, UC-003 |

#### Application Layer (3 компонента)

| Компонент | Технология | Ответственность | Use Cases |
|-----------|------------|-----------------|-----------|
| useTodos | React Hook | CRUD-координация, state, persistence | UC-001, UC-002 |
| useSearch | React Hook | Управление строкой поиска, фильтрация по тексту | UC-003 |
| useFilter | React Hook | Управление фильтрами по категории/статусу | UC-002, UC-003 |

#### Domain Layer (2 компонента)

| Компонент | Технология | Ответственность | Use Cases |
|-----------|------------|-----------------|-----------|
| Todo model | TypeScript interfaces | Структура данных: Todo, Category, StatusFilter | UC-001, UC-002 |
| TodoService | TypeScript pure functions | createTodo, validateTodo, filterByText, filterByStatus, filterByCategory, applyAllFilters | UC-001, UC-002, UC-003 |

#### Infrastructure Layer (2 компонента)

| Компонент | Технология | Ответственность | Drivers |
|-----------|------------|-----------------|---------|
| TodoRepository | TypeScript interface | Контракт persistence: getAll, save | QA-M2, QA-T1 |
| LocalStorageRepository | TypeScript + localStorage API | Конкретная реализация через localStorage | CON-001, QA-R1, QA-R2 |

### 5.3 Взаимодействия (Connectors)

Полная таблица взаимодействий -- в ERT:
[`docs/architecture/views/frontend-components-ert.md`](../views/frontend-components-ert.md)

Ключевые потоки данных:

**Поток создания задачи (UC-001):**

```
User -> TodoForm (ввод текста + Enter)
  -> useTodos.addTodo(title, category)
    -> TodoService.createTodo(title, category)  // генерация id, defaults
    -> TodoService.validateTodo(todo)            // валидация
    -> TodoRepository.save(updatedTodos)         // persistence
  -> React re-render -> TodoList -> TodoItem
```

**Поток фильтрации (UC-003):**

```
User -> SearchBar (ввод текста) + CategoryFilter (выбор фильтра)
  -> useSearch.setSearchQuery(query)
  -> useFilter.setCategoryFilter(category)
  -> TodoService.applyAllFilters(todos, { query, status, category })
  -> React re-render -> TodoList (отфильтрованный список)
```

**Поток загрузки данных (QA-R1):**

```
App mount -> useTodos init
  -> TodoRepository.getAll()           // загрузка из localStorage
  -> LocalStorageRepository.getAll()   // JSON.parse, error handling (QA-R2)
  -> React state updated -> TodoList renders
```

### 5.4 Element Responsibility Table

Полная ERT создана: [`docs/architecture/views/frontend-components-ert.md`](../views/frontend-components-ert.md)

---

## Step 6: Sketch Views and Record Decisions

### 6.1 Обновлённые C4-диаграммы

**model.c4** -- внутри frontend container добавлены 13 компонентов
(6 UI + 3 Application + 2 Domain + 2 Infrastructure) с relationship-ами
между ними:

- UI -> Application (hooks): TodoForm -> useTodos, SearchBar -> useSearch, etc.
- Application -> Domain: useTodos -> TodoService, useSearch -> TodoService, etc.
- Application -> Infrastructure: useTodos -> TodoRepository
- Infrastructure -> External: LocalStorageRepository -> browser (localStorage)
- UI composition: Layout -> TodoForm/SearchBar/CategoryFilter/TodoList, TodoList -> TodoItem

**views.c4** -- добавлен component view:

```
view components of frontend {
  title 'Frontend SPA -- Component Diagram'
  description 'Layered architecture: UI -> Application -> Domain -> Infrastructure'
  include *
  include browser
}
```

### 6.2 Architecture Decision Record

Создан **ADR-002**: [`docs/architecture/adrs/ADR-002-frontend-layered-architecture.md`](../adrs/ADR-002-frontend-layered-architecture.md)

- Статус: **Accepted**
- Решение: Layered Architecture с 4 слоями (UI, Application, Domain, Infrastructure)
- Альтернативы отклонены: Flat structure (нарушает QA-T1/QA-M2),
  Feature-based modules (overhead для 3 UC, cross-cutting concerns)
- Обоснование: чёткий separation of concerns, Domain Layer из pure-функций,
  Repository pattern для storage abstraction

### 6.3 Design Decision

Создан **DD-002**: [`docs/architecture/decisions/DD-002-storage-repository-pattern.md`](../decisions/DD-002-storage-repository-pattern.md)

- Решение: Repository pattern для абстракции persistence
- TodoRepository (interface) + LocalStorageRepository (implementation)
- Обеспечивает QA-M2, QA-T1, QA-R1, QA-R2

### 6.4 Element Responsibility Table

Создана ERT компонентного уровня:
[`docs/architecture/views/frontend-components-ert.md`](../views/frontend-components-ert.md)

- 13 компонентов в 4 слоях
- Mapping к use cases и quality attributes
- Таблица взаимодействий (connectors)
- Потоки данных для ключевых сценариев

---

## Step 7: Review and Assess

### 7.1 Статус драйверов после итерации

#### Use Cases

| Драйвер | Статус | Обоснование |
|---------|--------|-------------|
| UC-001 | **Completely Addressed** | Полный CRUD-поток определён: TodoForm -> useTodos -> TodoService -> TodoRepository. Компоненты TodoForm, TodoItem, TodoList, useTodos, TodoService, TodoRepository покрывают все сценарии (создание, редактирование, удаление, отметка выполнения). |
| UC-002 | **Completely Addressed** | Категоризация: поле `category` в Todo model, выбор категории в TodoForm, фильтрация в CategoryFilter -> useFilter -> TodoService.filterByCategory(). Предустановленные категории (Работа/Дом) определены как тип `Category = 'work' \| 'home'`. |
| UC-003 | **Completely Addressed** | Поиск: SearchBar -> useSearch -> TodoService.filterByText(). Фильтрация: CategoryFilter -> useFilter -> TodoService.filterByStatus/filterByCategory. Комбинированная: TodoService.applyAllFilters(). |

#### Constraints

| Драйвер | Статус | Обоснование |
|---------|--------|-------------|
| CON-001 | **Completely Addressed** | Storage adapter полностью детализирован: TodoRepository interface + LocalStorageRepository implementation. localStorage инкапсулирован в Infrastructure Layer, остальные слои от него не зависят. Зафиксировано в DD-002. |

#### Quality Attributes

| Драйвер | Статус | Обоснование |
|---------|--------|-------------|
| QA-T1 | **Addressed** | Domain Layer (TodoService) содержит только pure-функции. Тестирование: unit-тесты без DOM, без localStorage, без React. Infrastructure замещается InMemoryRepository. |
| QA-M2 | **Addressed** | Repository pattern (DD-002): TodoRepository interface абстрагирует storage. Замена localStorage -- создание новой реализации интерфейса (1 файл). |
| QA-U1 | **Addressed** | TodoForm спроектирован для создания задачи за 2 действия: ввод текста + Enter. Layout обеспечивает доступность формы на главном экране. |
| QA-R1 | **Addressed** | useTodos сохраняет данные через TodoRepository.save() при каждой мутации (create, update, delete, toggle). Данные переживают перезагрузку страницы. |
| QA-R2 | **Addressed** | LocalStorageRepository.getAll() содержит обработку ошибок десериализации (try-catch, fallback на пустой список). |
| QA-M1 | **Addressed** | Добавление нового поля задачи затрагивает: Todo model (тип) + TodoService (логика) + TodoForm (UI) = 3 модуля. |
| QA-U2 | **Acknowledged** | Pure-функции в TodoService обеспечивают быструю фильтрацию. Конкретная оценка (< 100ms) -- при реализации и профилировании. |
| QA-P1 | Not Addressed | Зависит от bundle size и deployment. Вне scope данной итерации. |
| QA-P2 | Not Addressed | Низкий приоритет (L, L). Оптимизация рендеринга -- задача реализации. |

### 7.2 Tactics Conflict Check

| Тактика 1 | Тактика 2 | Конфликт? | Анализ |
|-----------|-----------|-----------|--------|
| Layered architecture (separation of concerns) | React hooks (Application Layer) | **Незначительный** | Hooks привязаны к React runtime, что создаёт partial coupling UI framework -> Application Layer. Однако Domain и Infrastructure Layers полностью framework-agnostic. Этот компромисс приемлем: hooks -- идиоматичный способ state management в React, а основная цель (тестируемость Domain) достигнута. |
| Repository pattern (DI, abstraction) | Save on every mutation (QA-R1) | Нет | Комплементарны: Repository.save() вызывается при каждой мутации, абстракция не мешает частоте вызовов. |
| Pure functions in Domain (QA-T1) | React state management | Нет | Ортогональны: pure-функции создают/трансформируют данные, React хранит результат в state. Функции не зависят от React. |
| Layered architecture (4 слоя) | Simplicity (MVP) | **Потенциальный** | 4 слоя для todo-приложения -- на грани over-engineering. Однако: (1) каждый слой содержит 2-6 элементов, (2) слои тонкие (hooks, pure-функции, интерфейс + 1 реализация), (3) для production development это стандартная организация. Компромисс принят осознанно. |
| Component-level decomposition | Gzip compression (server, ITER-001) | Нет | Ортогональны: server сжимает собранный bundle, внутренняя структура frontend невидима для server. |

**Вывод:** Два незначительных tension point обнаружены, оба приемлемы
и осознанно приняты. Критических конфликтов нет.

### 7.3 Stopping Criteria Assessment

| Критерий | Оценка | Комментарий |
|----------|--------|-------------|
| Все UC в фокусе адресованы? | **Да** | UC-001, UC-002, UC-003 -- полный поток от UI до persistence определён для каждого |
| Все constraints адресованы? | **Да** | CON-001 полностью адресован через Repository pattern (DD-002). CON-002 адресован в ITER-001 |
| Quality attributes адресованы? | **Преимущественно** | QA-T1, QA-M2, QA-U1, QA-R1, QA-R2, QA-M1 адресованы. QA-U2 acknowledged. QA-P1, QA-P2 не адресованы (низкий приоритет, зависят от реализации) |
| C4-модель отражает решение? | **Да** | model.c4 содержит 13 компонентов в 4 слоях с relationship-ами. views.c4 содержит component view |
| Решение зафиксировано? | **Да** | ADR-002 принят, DD-002 создан, ERT задокументирована |
| Есть нерешённые вопросы? | **Минимально** | QA-P1 и QA-P2 не адресованы, но имеют низкий приоритет и зависят от реализации, а не от архитектуры |

### 7.4 Coverage Matrix

Сводная таблица: какие компоненты адресуют какие драйверы.

| Компонент | UC-001 | UC-002 | UC-003 | CON-001 | QA-T1 | QA-M2 | QA-U1 | QA-R1 | QA-R2 | QA-M1 |
|-----------|--------|--------|--------|---------|-------|-------|-------|-------|-------|-------|
| Layout | | | | | | | x | | | |
| TodoForm | x | x | | | | | x | | | x |
| TodoList | x | | x | | | | | | | |
| TodoItem | x | x | | | | | | | | |
| SearchBar | | | x | | | | | | | |
| CategoryFilter | | x | x | | | | | | | |
| useTodos | x | x | | | | | | x | | |
| useSearch | | | x | | | | | | | |
| useFilter | | x | x | | | | | | | |
| Todo model | x | x | | | | | | | | x |
| TodoService | x | x | x | | x | | | | | x |
| TodoRepository | | | | | x | x | | | | |
| LocalStorageRepo | | | | x | | | | x | x | |

### 7.5 Выводы и рекомендации

**Итерация ITER-002 завершена успешно.** Все три use case полностью
адресованы на компонентном уровне. Constraint CON-001 доадресован.
Ключевые quality attributes (QA-T1, QA-M2, QA-U1, QA-R1) обеспечены
архитектурными решениями.

**Система готова к реализации.** Архитектура определена на трёх уровнях C4:
System Context, Container, Component. Для каждого компонента определены
ответственность, взаимодействия, mapping к драйверам.

**Рекомендации для возможной ITER-003 (опционально):**

1. **Deployment view** -- как именно собирается и запускается приложение
   (npm scripts, Vite build, Docker?)
2. **Детализация error handling** -- QA-R2 определён на уровне
   LocalStorageRepository, но UI feedback при ошибках не детализирован
3. **UX flows** -- wireframes или sequence diagrams для каждого UC
4. **Performance budget** -- QA-P1 (загрузка < 2с), анализ bundle size

---

## Метаданные итерации

| Параметр | Значение |
|----------|----------|
| Статус | **Completed** |
| Дата начала | 2026-03-12 |
| Дата завершения | 2026-03-12 |
| Артефакты | ADR-002, DD-002, frontend-components-ert.md, model.c4 (updated), views.c4 (updated), kanban.md (updated) |
