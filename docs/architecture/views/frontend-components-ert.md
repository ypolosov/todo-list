# Element Responsibility Table -- Component Level (Frontend)

> Итерация: ITER-002
> Тип структуры: C&C (Component & Connector) -- runtime elements
> Элемент: frontend container (React SPA)
> Решение: ADR-002 (Frontend Layered Architecture)

## Архитектурный подход

Frontend SPA декомпозирован по принципу **layered architecture** с четырьмя слоями.
Зависимости направлены строго сверху вниз: UI -> Application -> Domain -> Infrastructure.
Каждый слой может обращаться только к слою непосредственно под ним.

```
+------------------------------------------------------+
|                    UI Layer                           |
|  TodoList, TodoItem, TodoForm, SearchBar,            |
|  CategoryFilter, Layout                              |
+------------------------------------------------------+
         |                                  |
         v                                  v
+------------------------------------------------------+
|                Application Layer                     |
|  useTodos, useSearch, useFilter                      |
+------------------------------------------------------+
         |
         v
+------------------------------------------------------+
|                  Domain Layer                        |
|  Todo (model), TodoService (CRUD + filtering)        |
+------------------------------------------------------+
         |
         v
+------------------------------------------------------+
|              Infrastructure Layer                    |
|  TodoRepository (interface),                         |
|  LocalStorageRepository (implementation)             |
+------------------------------------------------------+
         |
         v
    [localStorage API]
```

---

## UI Layer

Слой визуальных компонентов React. Отвечает за отображение данных и обработку
пользовательских событий. Не содержит бизнес-логики -- делегирует её Application Layer
через React hooks.

### Layout

| Аспект | Описание |
|--------|----------|
| **Элемент** | Layout |
| **Технология** | React (TSX) |
| **Ответственность** | Корневая структура страницы: заголовок, основная область, размещение дочерних компонентов |

- Предоставляет: общий каркас UI (header, main area)
- Потребляет: дочерние компоненты (TodoForm, SearchBar, CategoryFilter, TodoList)
- QA-U1: обеспечивает доступность формы создания на главном экране (минимум действий)

### TodoForm

| Аспект | Описание |
|--------|----------|
| **Элемент** | TodoForm |
| **Технология** | React (TSX) |
| **Ответственность** | Форма создания и редактирования задачи: ввод текста, выбор категории, подтверждение |

- Предоставляет: UI для ввода названия задачи и выбора категории
- Потребляет: `useTodos` hook (для операций create/update)
- UC-001: создание и редактирование задач
- UC-002: выбор категории при создании/редактировании
- QA-U1: создание задачи за 2 действия (ввод текста + Enter)

### TodoList

| Аспект | Описание |
|--------|----------|
| **Элемент** | TodoList |
| **Технология** | React (TSX) |
| **Ответственность** | Отображение списка задач, делегация отображения отдельных задач компоненту TodoItem |

- Предоставляет: рендеринг отфильтрованного списка задач
- Потребляет: `useTodos` hook (получение списка задач), компонент TodoItem
- UC-001: отображение списка задач
- UC-003: отображение результатов фильтрации и поиска
- QA-P2: эффективный рендеринг списка (list virtualization не требуется для MVP)

### TodoItem

| Аспект | Описание |
|--------|----------|
| **Элемент** | TodoItem |
| **Технология** | React (TSX) |
| **Ответственность** | Отображение отдельной задачи: название, категория, статус, кнопки действий |

- Предоставляет: визуальное представление одной задачи с действиями (toggle, edit, delete)
- Потребляет: `useTodos` hook (для операций toggle/delete/update)
- UC-001: отметка выполнения, инициация редактирования и удаления
- UC-002: отображение категории задачи

### SearchBar

| Аспект | Описание |
|--------|----------|
| **Элемент** | SearchBar |
| **Технология** | React (TSX) |
| **Ответственность** | Поле текстового поиска задач |

- Предоставляет: UI текстового поиска с real-time фильтрацией
- Потребляет: `useSearch` hook (управление строкой поиска)
- UC-003: поиск задач по тексту
- QA-U2: мгновенное обновление списка при вводе (< 100ms)

### CategoryFilter

| Аспект | Описание |
|--------|----------|
| **Элемент** | CategoryFilter |
| **Технология** | React (TSX) |
| **Ответственность** | UI для фильтрации задач по категории и статусу выполнения |

- Предоставляет: элементы управления фильтрами (категория: Все/Работа/Дом, статус: Все/Активные/Выполненные)
- Потребляет: `useFilter` hook (управление состоянием фильтров)
- UC-002: просмотр задач по категории
- UC-003: фильтрация по статусу и категории, комбинированная фильтрация

---

## Application Layer

Слой координации бизнес-логики. Реализован как React custom hooks,
которые связывают UI Layer с Domain Layer. Управляет жизненным циклом данных
(загрузка, сохранение, обновление состояния).

### useTodos

| Аспект | Описание |
|--------|----------|
| **Элемент** | useTodos |
| **Технология** | React custom hook (TypeScript) |
| **Ответственность** | Координация CRUD-операций над задачами, управление состоянием списка задач, обеспечение персистентности |

- Предоставляет: `{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }`
- Потребляет: `TodoService` (Domain Layer), `TodoRepository` (через dependency injection)
- UC-001: полный CRUD задач
- UC-002: сохранение категории при создании/редактировании
- QA-R1: автоматическое сохранение при каждой мутации
- QA-R2: обработка ошибок сериализации/десериализации при загрузке

### useSearch

| Аспект | Описание |
|--------|----------|
| **Элемент** | useSearch |
| **Технология** | React custom hook (TypeScript) |
| **Ответственность** | Управление строкой поиска и фильтрация задач по тексту |

- Предоставляет: `{ searchQuery, setSearchQuery, filteredBySearch }`
- Потребляет: `TodoService.filterByText()` (Domain Layer)
- UC-003: текстовый поиск задач
- QA-U2: мгновенная фильтрация (вычисление на каждый keystroke, но domain logic pure и быстрая)

### useFilter

| Аспект | Описание |
|--------|----------|
| **Элемент** | useFilter |
| **Технология** | React custom hook (TypeScript) |
| **Ответственность** | Управление фильтрами по категории и статусу выполнения |

- Предоставляет: `{ statusFilter, categoryFilter, setStatusFilter, setCategoryFilter, applyFilters }`
- Потребляет: `TodoService.filterByStatus()`, `TodoService.filterByCategory()` (Domain Layer)
- UC-002: фильтрация по категории
- UC-003: фильтрация по статусу, комбинированная фильтрация

---

## Domain Layer

Слой бизнес-логики. Содержит модель предметной области и сервис с pure-функциями.
Не зависит от React, DOM или localStorage -- может тестироваться изолированно (QA-T1).

### Todo (model)

| Аспект | Описание |
|--------|----------|
| **Элемент** | Todo |
| **Технология** | TypeScript interface + type definitions |
| **Ответственность** | Определение структуры задачи и связанных типов (Category, TodoStatus) |

Структура модели:

```typescript
interface Todo {
  id: string;
  title: string;
  completed: boolean;
  category: Category;
  createdAt: string; // ISO 8601
}

type Category = 'work' | 'home';
type StatusFilter = 'all' | 'active' | 'completed';
```

- Предоставляет: типы данных для всех слоёв
- Потребляет: ничего (leaf element)
- UC-001: поля id, title, completed
- UC-002: поле category

### TodoService

| Аспект | Описание |
|--------|----------|
| **Элемент** | TodoService |
| **Технология** | TypeScript (pure functions) |
| **Ответственность** | Бизнес-логика: создание задач (генерация id, defaults), валидация, фильтрация, сортировка |

Ключевые функции:

| Функция | Описание | UC |
|---------|----------|----|
| `createTodo(title, category)` | Создание нового объекта Todo с id и timestamp | UC-001 |
| `validateTodo(todo)` | Валидация: непустой title, валидная category | UC-001 |
| `filterByText(todos, query)` | Фильтрация по подстроке в title (case-insensitive) | UC-003 |
| `filterByStatus(todos, status)` | Фильтрация по completed/active/all | UC-003 |
| `filterByCategory(todos, category)` | Фильтрация по категории | UC-002, UC-003 |
| `applyAllFilters(todos, filters)` | Комбинированная фильтрация (текст + статус + категория) | UC-003 |

- Предоставляет: pure-функции для работы с задачами
- Потребляет: `Todo` model (типы)
- QA-T1: все функции pure -- тестируются без DOM, без localStorage, без React
- QA-M1: добавление нового поля задачи затрагивает Todo model + TodoService + TodoForm (3 модуля)

---

## Infrastructure Layer

Слой взаимодействия с внешними системами (localStorage). Реализует паттерн
Repository для абстрагирования деталей хранения от бизнес-логики.

### TodoRepository (interface)

| Аспект | Описание |
|--------|----------|
| **Элемент** | TodoRepository |
| **Технология** | TypeScript interface |
| **Ответственность** | Контракт для операций чтения/записи коллекции задач |

```typescript
interface TodoRepository {
  getAll(): Todo[];
  save(todos: Todo[]): void;
}
```

- Предоставляет: абстракцию persistence, за которой скрыта конкретная реализация
- Потребляет: `Todo` model (типы)
- QA-M2: Domain и Application Layers зависят только от этого интерфейса, не от localStorage
- QA-T1: позволяет использовать in-memory stub при тестировании

### LocalStorageRepository

| Аспект | Описание |
|--------|----------|
| **Элемент** | LocalStorageRepository |
| **Технология** | TypeScript, localStorage Web API |
| **Ответственность** | Конкретная реализация TodoRepository через localStorage браузера |

```typescript
class LocalStorageRepository implements TodoRepository {
  private readonly key = 'todo-list-data';

  getAll(): Todo[] { /* JSON.parse(localStorage.getItem(key)) */ }
  save(todos: Todo[]): void { /* localStorage.setItem(key, JSON.stringify(todos)) */ }
}
```

- Предоставляет: реализацию TodoRepository через localStorage
- Потребляет: localStorage Web API (browser), `Todo` model (типы)
- CON-001: данные хранятся исключительно в localStorage
- QA-R1: данные сохраняются при каждой мутации, переживают перезагрузку страницы
- QA-R2: обработка JSON parse errors (fallback на пустой список)

---

## Взаимодействия (Connectors)

| Источник | Цель | Тип | Описание |
|----------|------|-----|----------|
| Layout | TodoForm, SearchBar, CategoryFilter, TodoList | Composition | Layout компонует дочерние UI-компоненты |
| TodoList | TodoItem | Composition | TodoList рендерит массив TodoItem |
| TodoForm | useTodos | Hook call | Получение addTodo / updateTodo |
| TodoItem | useTodos | Hook call | Получение toggleTodo / deleteTodo |
| TodoList | useTodos | Hook call | Получение отфильтрованного списка todos |
| SearchBar | useSearch | Hook call | Получение searchQuery / setSearchQuery |
| CategoryFilter | useFilter | Hook call | Получение фильтров и их setter-ов |
| useTodos | TodoService | Function call | Делегация бизнес-логики (createTodo, validateTodo) |
| useTodos | TodoRepository | Method call | Загрузка (getAll) и сохранение (save) данных |
| useSearch | TodoService | Function call | Делегация filterByText |
| useFilter | TodoService | Function call | Делегация filterByStatus, filterByCategory |
| LocalStorageRepository | browser (localStorage) | Web API | getItem / setItem |

## Mapping к драйверам

| Драйвер | Как адресован |
|---------|---------------|
| UC-001 | CRUD: TodoForm (UI) -> useTodos (координация) -> TodoService (логика) -> TodoRepository (persistence) |
| UC-002 | Категоризация: CategoryFilter + TodoForm (UI) -> useFilter + useTodos (координация) -> TodoService (фильтрация) -> Todo model (поле category) |
| UC-003 | Поиск/фильтрация: SearchBar + CategoryFilter (UI) -> useSearch + useFilter (координация) -> TodoService (filterByText, filterByStatus, filterByCategory, applyAllFilters) |
| CON-001 | localStorage инкапсулирован в LocalStorageRepository; остальные слои от него не зависят |
| QA-T1 | Domain Layer (TodoService) содержит только pure-функции, тестируемые без DOM/localStorage/React |
| QA-M2 | Repository pattern: TodoRepository interface отделяет Domain от Infrastructure; замена storage -- новая реализация интерфейса |
| QA-U1 | TodoForm поддерживает создание задачи за 2 действия (ввод + Enter) |
| QA-R1 | useTodos сохраняет данные при каждой мутации через TodoRepository |
| QA-R2 | LocalStorageRepository обрабатывает ошибки десериализации (fallback на пустой список) |
| QA-M1 | Добавление нового поля задачи затрагивает Todo model + TodoService + TodoForm (<= 3 модуля) |
