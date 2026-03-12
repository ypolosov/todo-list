# DD-001: Resolve CRN-001 -- Role of Backend in Offline Application

| Параметр | Значение |
|----------|----------|
| ID | DD-001 |
| Статус | Accepted |
| Дата | 2026-03-12 |
| Итерация | ITER-001 |
| Разрешает | CRN-001 (React + бэкенд при оффлайн-режиме) |
| ADR | ADR-001 |

## Проблема

Concern CRN-001 фиксирует противоречие: проект предполагает "React с бэкендом",
но приложение работает полностью оффлайн (CON-001) и не требует аутентификации
(CON-002). Какова роль бэкенда, если вся бизнес-логика и данные находятся
на клиенте?

## Решение

Бэкенд выполняет роль **static server** -- раздаёт собранное React SPA
и обеспечивает инфраструктурные функции (SPA fallback, security headers,
compression). Бэкенд **не** содержит бизнес-логики и **не** хранит данных
пользователя.

## Декомпозиция системы

Система todoApp декомпозирована на два контейнера:

| Контейнер | Технология | Ответственность |
|-----------|------------|-----------------|
| **frontend** | React + Vite (TypeScript) | UI, бизнес-логика, state management, persistence (localStorage) |
| **server** | Node.js + Express | Static file serving, SPA fallback, security headers |

## Взаимодействия

```
User --HTTP GET--> server --serves static files--> frontend (в браузере)
frontend --localStorage API--> browser storage
```

## Обоснование

1. Соответствие ограничениям CON-001 (localStorage) и CON-002 (без auth)
2. Production-ready: единая точка запуска (`npm start`), SPA fallback
3. Минимальный overhead: ~20 строк Express-кода
4. Соответствие указанному стеку "React с бэкендом"
5. Frontend-архитектура не зависит от выбора -- QA-T1 и QA-M2 адресуются
   на уровне компонентной декомпозиции frontend (ITER-002)

## Затронутые драйверы

| Драйвер | Статус после DD-001 |
|---------|---------------------|
| CRN-001 | **Completely Addressed** -- роль бэкенда определена |
| CON-001 | **Partially Addressed** -- localStorage подтверждён как хранилище, но storage layer ещё не детализирован |
| CON-002 | **Completely Addressed** -- архитектура не предполагает аутентификации |
| QA-T1   | Acknowledged -- будет адресован при компонентной декомпозиции (ITER-002) |
| QA-M2   | Acknowledged -- storage adapter будет определён в ITER-002 |

## Ссылки

- [ADR-001](../adrs/ADR-001-static-server-architecture.md)
- [ITER-001](../iterations/ITER-001.md)
- [ERT: containers](../views/containers-ert.md)
