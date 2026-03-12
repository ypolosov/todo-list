# Element Responsibility Table -- Container Level

> Итерация: ITER-001
> Тип структуры: C&C (Component & Connector) -- runtime elements
> Решение: ADR-001 (Backend as Static Server)

## Контейнеры

### frontend (React SPA)

| Аспект | Описание |
|--------|----------|
| **Элемент** | frontend |
| **Технология** | React 18 + Vite (TypeScript) |
| **Runtime** | Web Browser (клиентский JavaScript) |
| **Ответственность** | Вся бизнес-логика и UI приложения Todo List |

#### Внутренние обязанности

| Обязанность | Описание |
|-------------|----------|
| UI Rendering | Отображение списка задач, форм создания/редактирования, фильтров |
| State Management | Хранение текущего состояния приложения в памяти (React state) |
| Business Logic | CRUD-операции над задачами, валидация, фильтрация, категоризация |
| Persistence | Чтение/запись данных через localStorage API браузера |
| Routing | Клиентская маршрутизация (если применимо, через History API) |

#### Предоставляемые интерфейсы

| Интерфейс | Тип | Описание |
|-----------|-----|----------|
| HTTP GET / | Входящий | Точка входа -- index.html загружается браузером |
| User Interaction | Входящий | Пользовательские события (клики, ввод текста) |

#### Потребляемые интерфейсы

| Интерфейс | Провайдер | Описание |
|-----------|-----------|----------|
| localStorage API | Web Browser | `getItem`, `setItem`, `removeItem` для персистентности данных |
| History API | Web Browser | Управление URL без перезагрузки страницы |

#### Ограничения по QA

| QA ID | Тактика |
|-------|---------|
| QA-T1 | Бизнес-логика реализуется в pure-функциях, отделённых от React-компонентов и localStorage |
| QA-M2 | Доступ к localStorage -- через абстракцию (storage adapter / repository pattern), позволяющую заменить хранилище без изменения бизнес-логики |

---

### server (Express Static Server)

| Аспект | Описание |
|--------|----------|
| **Элемент** | server |
| **Технология** | Node.js + Express |
| **Runtime** | Node.js process (серверный) |
| **Ответственность** | Раздача собранных статических файлов SPA |

#### Внутренние обязанности

| Обязанность | Описание |
|-------------|----------|
| Static File Serving | Раздача HTML, JS, CSS и прочих assets из директории `dist/` |
| SPA Fallback | Перенаправление всех non-file запросов на `index.html` (поддержка client-side routing / History API) |
| Security Headers | Установка базовых HTTP-заголовков безопасности (X-Content-Type-Options, X-Frame-Options) |
| Gzip/Compression | Сжатие статических ресурсов для уменьшения объёма передаваемых данных |

#### Предоставляемые интерфейсы

| Интерфейс | Тип | Описание |
|-----------|-----|----------|
| HTTP GET /* | Входящий | Обслуживание любых HTTP GET-запросов: файлы из `dist/` или fallback на `index.html` |

#### Потребляемые интерфейсы

| Интерфейс | Провайдер | Описание |
|-----------|-----------|----------|
| File System | OS | Чтение статических файлов из директории сборки (`dist/`) |

#### Что server НЕ делает

- Не обрабатывает бизнес-логику
- Не хранит данные пользователя
- Не предоставляет REST/GraphQL API
- Не выполняет аутентификацию/авторизацию

---

## Взаимодействия (Connectors)

| Источник | Цель | Протокол | Описание |
|----------|------|----------|----------|
| user | server | HTTP | Браузер запрашивает страницу приложения |
| server | frontend | HTTP Response | Сервер отдаёт статические файлы SPA (HTML/JS/CSS) |
| frontend | browser (localStorage) | JavaScript API | SPA читает/записывает данные задач в localStorage |
| user | frontend | DOM Events | Пользователь взаимодействует с интерфейсом SPA |

## Диаграмма потока данных (текстовая)

```
User --(HTTP GET)--> [server: Express]
                          |
                     serves static files
                          |
                          v
                     [frontend: React SPA]
                          |
                     reads/writes
                          |
                          v
                     [browser: localStorage]
```

## Mapping к драйверам

| Драйвер | Как адресован |
|---------|---------------|
| CRN-001 | Роль бэкенда определена: static server, без бизнес-логики |
| CON-001 | Данные хранятся исключительно в localStorage на стороне frontend |
| CON-002 | Аутентификация отсутствует -- server не различает пользователей |
| QA-T1   | Архитектура frontend предусматривает выделение pure business logic |
| QA-M2   | Storage layer за абстракцией, заменяемость обеспечена |
