---
status: "accepted"
date: 2026-03-12
decision-makers: [ypolosov]
consulted: []
informed: []
---

# ADR-001: Express Static Server + React SPA с localStorage

## Context and Problem Statement

Проект Todo List использует React с бэкендом, однако приложение работает
полностью оффлайн с данными в localStorage (CON-001). Возникает архитектурный
concern CRN-001: какова роль бэкенда, если вся бизнес-логика и данные
находятся на клиенте? Необходимо определить reference architecture --
декомпозицию системы на контейнеры и их ответственности.

## Decision Drivers

- CRN-001 -- React + бэкенд при оффлайн-режиме: какова роль сервера?
- CON-001 -- Только оффлайн, данные в localStorage
- CON-002 -- Без аутентификации, однопользовательский режим
- QA-T1 -- Бизнес-логика тестируется без DOM/localStorage
- QA-M2 -- Замена storage не затрагивает бизнес-логику

## Considered Options

1. SPA без бэкенда (только статические файлы)
2. Backend as Static Server (Express раздаёт собранное SPA)
3. Backend с API + SQLite (полноценный серверный API)
4. Гибрид (API + localStorage как cache)

## Decision Outcome

Выбран **вариант 2: "Backend as Static Server"**, потому что он обеспечивает
production-ready способ раздачи приложения (единый `npm start`, SPA fallback,
security headers) при минимальном overhead (~20 строк кода) и полном соответствии
всем ограничениям.

### Consequences

#### Good

- Единая точка запуска приложения (`npm start` -> `node server.js`)
- Корректная обработка client-side routing (SPA fallback на `index.html`)
- Возможность добавить security headers, gzip, health check endpoint
- Естественная точка расширения при необходимости серверной логики в будущем
- Все ограничения (CON-001, CON-002) полностью соблюдены

#### Bad

- Express-сервер формально дублирует функциональность любого веб-сервера (nginx, Caddy)
- Добавляет runtime-зависимость (Node.js + Express) для раздачи статических файлов
- Незначительное увеличение поверхности атаки (серверный процесс) по сравнению с чисто статическими файлами

#### Neutral

- Frontend-архитектура (React, бизнес-логика, storage layer) идентична вариантам 1 и 2 -- выбор бэкенда не влияет на клиентскую часть
- Тестируемость (QA-T1) и модифицируемость (QA-M2) определяются внутренней архитектурой frontend, не уровнем контейнеров

## Pros and Cons of the Options

### 1. SPA без бэкенда

- Good, потому что максимальная простота -- нет серверного процесса
- Good, потому что deployment тривиален (копирование файлов, GitHub Pages, CDN)
- Bad, потому что нет единой точки запуска для production development
- Bad, потому что SPA fallback (History API) требует настройки внешнего веб-сервера
- Neutral, потому что Express-сервер, который лишь раздаёт статику, фактически дублирует эту роль

### 2. Backend as Static Server (выбран)

- Good, потому что production development -- единый `npm start`, один процесс
- Good, потому что SPA fallback, security headers, gzip встроены
- Good, потому что минимальный overhead (~20 строк Express-кода)
- Good, потому что соответствует указанному стеку "React с бэкендом"
- Bad, потому что Express формально избыточен для раздачи статики

### 3. Backend с API + SQLite

- Good, потому что обеспечивает серверное хранение и валидацию данных
- Bad, потому что нарушает CON-001 (данные должны быть в localStorage)
- Bad, потому что значительный overhead: API, схема БД, миграции, серверные тесты
- Bad, потому что overengineering для однопользовательского оффлайн-приложения

### 4. Гибрид (API + localStorage cache)

- Good, потому что объединяет надёжность серверного хранения с оффлайн-доступом
- Bad, потому что максимальная сложность: два storage, синхронизация, conflict resolution
- Bad, потому что частично нарушает CON-001 (primary storage на сервере)
- Bad, потому что architectural mismatch -- решение для распределённых систем применяется к локальному MVP

## More Information

- Итерация: [ITER-001](../iterations/ITER-001.md)
- Concern: [CRN-001](../drivers/concerns/CRN-001.md)
- Constraints: [CON-001](../drivers/constraints/CON-001.md), [CON-002](../drivers/constraints/CON-002.md)
- Element Responsibility Table: [containers-ert.md](../views/containers-ert.md)
- Design Decision: [DD-001](../decisions/DD-001-resolve-crn001.md)
