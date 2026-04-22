---
name: todo
type: requirements
phase: requirements
sme_level: pet
method: flat-todo-list
tool: md-flat-todo
alphas: [Requirements, Stakeholders]
disciplines: [requirements-engineering, stakeholder-analysis]
role: product-owner
traces_from: [.claude/sdlc/phases/vision/lean-canvas.md]
traces_to: []
system_of_attention: todo-list
created: 2026-04-22
updated: 2026-04-22
---

# Requirements: todo-list (flat todo list)

## 1. Назначение

Артефакт продвигает альфы Requirements и Stakeholders.
Метод — flat-todo-list; фиксирует MVP-поведение для демо.

## 2. Привязка к фазе и методу

- Фаза: requirements.
- Уровень SME: pet.
- Дисциплины: requirements-engineering, stakeholder-analysis.
- Инструмент: md-flat-todo (см. `decisions.md` 2026-04-22 12:00).
- Backlog живёт здесь; state-копия — в `.claude/sdlc/tasks.md`.

## 3. Содержание

### Список единиц работы MVP

| id | Поведение | Альфа | Stakeholder-интерес |
|---|---|---|---|
| R1 | Пользователь создаёт задачу | Requirements | Видеть захват задачи в демо |
| R2 | Пользователь отмечает задачу выполненной | Requirements | Видеть смену состояния задачи |
| R3 | Пользователь удаляет задачу | Requirements | Видеть очистку backlog |
| R4 | Список задач виден после перезапуска | Requirements | Видеть персистентность данных |

### Definition of Done (уровень pet)

- DoD-1: реализующая функция написана.
- DoD-2: минимум один автотест зелёный (TDD-first, принцип 5).
- DoD-3: форматер и линтер без ошибок на изменённых файлах.

### Стейкхолдеры и их интересы

| Stakeholder | Интерес | Требования |
|---|---|---|
| Докладчик | Живое построение артефактов | R1-R4 |
| Аудитория демо | Узнаваемый учебный сюжет | R1-R3 |
| Ранние адоптеры | Повторить подход у себя | R1-R4 |

## 4. Трассируемость

- traces_from: `.claude/sdlc/phases/vision/lean-canvas.md` (ценность и бенефициары).
- traces_to: заполняется на фазе architecture.
- Продвигаемые альфы: Requirements → Bounded; Stakeholders → Involved.

## 5. Критерии готовности

- Список R1..R4 непустой и связан с интересами стейкхолдеров.
- DoD зафиксирован и совместим с TDD-first.
- `validate-artifact.sh` проходит.
- `check-cross-refs.sh` находит ссылку на lean-canvas.md.

## Замечание по области изменений требований

До начала демо требования зафиксированы.
Во время демо изменения почти отсутствуют; новые вопросы уходят в next-steps.
