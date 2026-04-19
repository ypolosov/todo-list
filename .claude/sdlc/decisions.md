---
name: decisions
type: decision-journal
project: todo-list
updated: 2026-04-19
---

# Журнал альтернатив и решений todo-list

Принцип 1: альтернативы всегда порождаются и фиксируются.

## 2026-04-19 10:00 — Масштаб проекта

- context: инициализация SDLC-каркаса; нужно зафиксировать уровень процесса.
- autonomy_mode: hitl
- phase: bootstrap
- role: product-owner
- alternatives:
  1. pet — минимальный процесс, один исполнитель, низкие риски.
  2. mid — небольшая команда, умеренный процесс, ощутимые риски качества.
  3. enterprise — кросс-функциональная команда, регуляторика, полный SDLC.
- choice: 1
- rationale: один исполнитель, учебный/pet-формат, минимум церемониала.
- traces_to: [`.claude/sdlc/profile.md`]

## 2026-04-19 10:01 — Активная роль

- context: роль пользователя влияет на предлагаемые фазы и вопросы.
- autonomy_mode: hitl
- phase: bootstrap
- role: product-owner
- alternatives:
  1. product-owner — фокус на ценности, требованиях, приоритетах.
  2. architect — фокус на значимых решениях и декомпозиции.
  3. developer — фокус на TDD и воплощении требований.
- choice: 1
- rationale: стартовая задача — определить ценность и границы продукта.
- traces_to: [`.claude/sdlc/roles.md`, `.claude/sdlc/profile.md`]

## 2026-04-19 10:02 — Целевая система

- context: граница системы определяется вниманием (принцип 7).
- autonomy_mode: hitl
- phase: bootstrap
- role: product-owner
- alternatives:
  1. Корень репозитория todo-list как единая система.
  2. Frontend-подсистема; backend — окружение.
  3. Backend-подсистема; UI — окружение.
- choice: 1
- rationale: на старте нет деления на подсистемы; целевая — всё приложение.
- traces_to: [`.claude/sdlc/system-context.md`]

## 2026-04-19 10:03 — State-артефакт для Work-альфы

- context: плагин не навязывает формат состояния (принцип 9).
- autonomy_mode: hitl
- phase: bootstrap
- role: product-owner
- alternatives:
  1. Каталог `.claude/sdlc/phases/` с файлами по фазам — гранулярность, git-дружественно.
  2. Одиночный файл `tasks.md` рядом с `alphas.md` — компактно, просто.
  3. GitHub Issues через MCP — командная работа, внешняя зависимость.
- choice: 2
- rationale: pet-масштаб; минимальные накладные расходы; offline-friendly.
- traces_to: [`.claude/sdlc/plugin-config.md`]

## 2026-04-19 10:10 — Следующий шаг после bootstrap

- context: bootstrap завершён; роль product-owner активна.
- autonomy_mode: hitl
- phase: cross-cutting
- role: product-owner
- alternatives:
  1. `/sdlc-phase vision` — продвинуть Opportunity от Identified, прояснить ценность.
  2. `/sdlc-phase requirements` — декомпозиция без Vision; риск: цели не зафиксированы.
  3. `/sdlc-focus` — уточнить границы системы до содержательных фаз.
- choice: 1
- rationale: Opportunity ещё Identified; Vision — штатный первый шаг для product-owner.
- traces_to: [`.claude/sdlc/alphas.md`, `.claude/sdlc/tasks.md`]

## 2026-04-19 10:20 — SME для фазы vision

- context: вход в фазу vision; выбрать уровень и форму артефакта.
- autonomy_mode: hitl
- phase: vision
- role: product-owner
- alternatives:
  1. pet + свободный `vision.md` — один экран, минимум структуры.
  2. pet + миссия продукта — одно ёмкое заявление о цели.
  3. mid + лифтовый питч по шаблону «для кого / что / зачем».
- choice: 2
- rationale: pet-масштаб; миссия даёт короткую якорную формулировку.
- traces_to: [`.claude/sdlc/phases/vision/vision.md`, `.claude/sdlc/profile.md`]

## 2026-04-19 10:21 — Содержание Vision

- context: зафиксировать проблему, стейкхолдера и горизонт.
- autonomy_mode: hitl
- phase: vision
- role: product-owner
- alternatives:
  1. Продуктовая ценность для широкой аудитории — облако, синхронизация.
  2. Локальный инструмент для личных задач — простота, own-your-data.
  3. Учебный полигон для SDLC — предмет вторичен, главное процесс.
- choice: 3
- rationale: явно выбран пользователем; честно отражает мотивацию.
- traces_to: [`.claude/sdlc/phases/vision/vision.md`]

## Правила

- Минимум 2 альтернативы; оптимально 3.
- HITL/HOTL — запись после подтверждения пользователя.
- HOOTL — запись автономно до действия.
- Задним числом выбор не переписывается; только новая запись.
