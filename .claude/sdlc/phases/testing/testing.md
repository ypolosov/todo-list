---
name: testing
type: testing
phase: testing
sme_level: pet
method: software-testing
tool: test-strategy-pet
alphas: [Software System, Requirements]
disciplines: [software-testing, test-driven-development]
role: developer
traces_from: [.claude/sdlc/phases/requirements/requirements.md, .claude/sdlc/phases/architecture/architecture.md]
traces_to: [.claude/sdlc/phases/development/development.md]
system_of_attention: todo-list
created: 2026-04-19
updated: 2026-04-19
---

# Testing проекта todo-list

## 1. Назначение

Продвигает Software System к Usable через TDD-контракты.
Продвигает Requirements от Coherent до Acceptable через acceptance tests.
Метод — software-testing + test-driven-development.

## 2. Привязка к фазе и методу

- Фаза: testing.
- Уровень SME: pet.
- Дисциплина: software-testing, TDD.
- Инструмент: стратегия тестов pet-уровня.
- Роли: developer, tester.

## 3. Содержание

### Пирамида тестов

| Уровень | Что покрывает | Инструмент |
|---|---|---|
| Unit | Domain (Task, TaskStatus); Application use cases | Vitest |
| Component | React-компоненты изолированно | React Testing Library |
| Smoke E2E | Один сквозной сценарий по всем 5 фичам | Playwright |

### Acceptance-контракты по фичам

| Фича | Acceptance-тест | Слой |
|---|---|---|
| F-01 | Создаётся задача с непустым текстом; пустой текст отклоняется. | domain unit + component |
| F-02 | Список отражает все задачи; порядок детерминированный. | application unit + component |
| F-03 | Смена статуса переключает `active ↔ done`; повторная смена возвращает. | domain unit + component |
| F-04 | Удалённая задача не возвращается; остальные задачи не затронуты. | application unit + component |
| F-05 | Фильтры `active / done / all` фильтруют корректно; счётчик совпадает. | application unit + component |
| Все | Smoke: добавить, отметить, отфильтровать, удалить — в браузере. | E2E |

### Fitness-функции архитектуры

- Domain-слой не импортирует React и адаптеры.
- Application-слой не импортирует React напрямую.
- Покрытие domain = 100 % (Istanbul statement coverage).

### Coverage-gate

- Порог 100 % только для `src/domain/**` и `src/application/**`.
- Adapters без жёсткого порога; измерение для справки.
- Падение порога блокирует коммит (hook development-фазы).

### TDD-протокол

- Каждая production-функция имеет парный тест до её написания.
- Hook `enforce-tdd.sh` блокирует правки без пары (принцип 5).
- Semantic-audit LLM вторым слоем проверяет смысл теста.

### Что не покрывается

- Производительность на списках >100 задач — off-scope pet.
- Визуальный regression — не автоматизировано.
- Совместимость со старыми браузерами — off-scope pet.

## 4. Трассируемость

- traces_from: [`.claude/sdlc/phases/requirements/requirements.md`, `.claude/sdlc/phases/architecture/architecture.md`].
- traces_to: будет добавлен артефакт development.
- Продвижение альф: `.claude/sdlc/alphas.md`.

## 5. Критерии готовности

- Каждая фича F-01…F-05 имеет acceptance-контракт.
- Coverage-gate настроен в `plugin-config.md`.
- TDD-пары прописаны в `plugin-config.md`.
- Fitness-функции архитектуры автоматизированы или описаны.
- Alpha Requirements продвинута до Acceptable.
- Alpha Software System готова к движению к Usable при реализации кода.
