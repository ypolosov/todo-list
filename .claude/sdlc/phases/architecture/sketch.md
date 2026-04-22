---
name: sketch
type: architecture
phase: architecture
sme_level: pet
method: lightweight-architecture-sketch
tool: md-architecture-sketch
alphas: [Software System, Requirements]
disciplines: [software-architecture, functional-decomposition]
role: architect
traces_from: [.claude/sdlc/phases/requirements/todo.md]
traces_to: []
system_of_attention: todo-list
created: 2026-04-22
updated: 2026-04-22
---

# Architecture sketch: todo-list

## 1. Назначение

Артефакт продвигает альфы Software System и Requirements.
Метод — lightweight architecture sketch; одностраничная схема.

## 2. Привязка к фазе и методу

- Фаза: architecture.
- Уровень SME: pet.
- Дисциплины: software-architecture, functional-decomposition.
- Инструмент: md-architecture-sketch (см. `decisions.md` 2026-04-22 12:30).
- Целевая система: `todo-list` (см. `system-context.md`).

## 3. Содержание

### Значимые решения

| id | Решение | Обоснование |
|---|---|---|
| A1 | Тип воплощения: web-страница | Наглядность в демо; единый файл UI + состояние. |
| A2 | Язык: TypeScript | Типобезопасность; лаконичный dev-цикл. |
| A3 | Персистентность: localStorage в JSON | Единственный браузерный механизм; совместим с R4. |
| A4 | Одна целевая система без подсистем | pet-масштаб; модульная декомпозиция внутри. |
| A5 | Runtime: браузер (без сервера) | Нет backend; весь код на стороне клиента. |

### Функциональная декомпозиция (Том 2 гл. 10)

Компоненты внутри целевой системы (не подсистемы):

| Компонент | Ответственность | Связи |
|---|---|---|
| `TaskStore` | Чтение/запись задач в localStorage | Используется `TaskService`. |
| `TaskService` | Бизнес-правила create/toggle/remove | Использует `TaskStore`; вызывается `UI`. |
| `UI` | Рендер списка, формы, обработка кликов | Вызывает `TaskService`. |
| `AppBootstrap` | Инициализация, загрузка начального состояния | Собирает компоненты при запуске. |

### Соответствие требованиям

| Требование | Компоненты | Замечание |
|---|---|---|
| R1 create | UI → TaskService → TaskStore | Форма ввода + submit. |
| R2 toggle | UI → TaskService → TaskStore | Клик по чекбоксу. |
| R3 remove | UI → TaskService → TaskStore | Кнопка удаления. |
| R4 persist | TaskStore ↔ localStorage | JSON-сериализация массива задач. |

### Качественные атрибуты

- **Простота:** одна HTML-страница, один скрипт, один стиль.
- **Тестируемость:** `TaskService` чистый; `TaskStore` заменяем на in-memory mock.
- **Лаконичность демо:** всё видно в одном браузере без сервера.

### Разрешённый конфликт ответов пользователя

- Пользователь выбрал веб + JSON-файл в домашней директории.
- Веб-страница не имеет доступа к файлам FS; противоречие.
- Решение: использовать localStorage с JSON-форматом.
- Зафиксировано как A3; сохранена семантика JSON и идея пользователя.

## 4. Трассируемость

- traces_from: `.claude/sdlc/phases/requirements/todo.md` (R1..R4).
- traces_to: заполняется на фазах testing и development.
- Продвигаемые альфы: Software System → Architecture Selected; Requirements → Coherent.

## 5. Критерии готовности

- Минимум 3 значимых решения зафиксированы.
- Все требования R1..R4 покрыты компонентами.
- Качественные атрибуты перечислены.
- `validate-artifact.sh` проходит.
- `check-cross-refs.sh` находит ссылку на todo.md.

## Не-цели архитектуры

- Нет серверной части; нет REST API.
- Нет базы данных; только localStorage.
- Нет аутентификации, мультипользовательского режима.
- Нет фреймворка (React/Vue/Svelte) на старте; vanilla TS.
