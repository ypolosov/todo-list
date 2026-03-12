---
id: DD-002
title: "Repository pattern для абстракции storage"
status: "accepted"
date: 2026-03-12
iteration: "ITER-002"
drivers: [CON-001, QA-M2, QA-T1, QA-R1, QA-R2]
---

# DD-002: Repository Pattern для абстракции Storage

## Problem

Frontend container хранит данные в localStorage (CON-001). При этом quality
attribute QA-M2 требует, чтобы замена localStorage на другое хранилище не
затрагивала бизнес-логику. Дополнительно, QA-T1 требует возможности
тестировать бизнес-логику без localStorage.

Прямые вызовы `localStorage.getItem/setItem` из бизнес-логики или React-компонентов
создают жёсткую связь (tight coupling) с конкретным storage mechanism.

## Decision

Применить паттерн **Repository** для абстрагирования persistence:

1. Определить интерфейс `TodoRepository` с методами `getAll(): Todo[]`
   и `save(todos: Todo[]): void`
2. Реализовать `LocalStorageRepository` -- конкретную реализацию через
   localStorage Web API
3. Domain Layer (TodoService) и Application Layer (hooks) зависят только
   от интерфейса `TodoRepository`, не от конкретной реализации
4. Конкретная реализация инжектируется при инициализации приложения
   (composition root в App component)

## Rationale

Repository -- классический паттерн Dependency Inversion (SOLID principle "D"),
который решает обе проблемы одновременно:

- **QA-M2**: замена storage == создание новой реализации TodoRepository
  (например, `IndexedDbRepository` или `InMemoryRepository`), без изменений
  в Domain и Application Layers
- **QA-T1**: в тестах используется `InMemoryRepository` -- тесты не зависят
  от localStorage API и не требуют browser environment
- **QA-R1**: `LocalStorageRepository.save()` гарантирует персистентность
  при каждом вызове
- **QA-R2**: `LocalStorageRepository.getAll()` содержит try-catch для
  обработки ошибок десериализации (corrupt data) с fallback на пустой
  список

Альтернатива -- прямые вызовы localStorage из hooks -- проще, но нарушает
QA-M2 и QA-T1. Для production development Repository pattern обоснован.

## Implications

- Infrastructure Layer содержит два элемента: интерфейс TodoRepository
  и реализацию LocalStorageRepository
- Application Layer (useTodos hook) получает TodoRepository через параметр
  или React Context
- Тестовый код может использовать `InMemoryRepository` для unit-тестов
  и `LocalStorageRepository` для integration-тестов
- При смене storage (например, на IndexedDB) изменяется только один файл --
  новая реализация TodoRepository

## Related

- ADR: [ADR-002](../adrs/ADR-002-frontend-layered-architecture.md)
- Drivers: CON-001, QA-M2, QA-T1, QA-R1, QA-R2
- ERT: [frontend-components-ert.md](../views/frontend-components-ert.md)
