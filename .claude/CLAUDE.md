---
name: todo-list
type: project-constitution
project: todo-list
plugin: ai-driven-sdlc
plugin_version: 0.2.0-wave2
language: ru
created: 2026-04-19
updated: 2026-04-19
---

# Конституция проекта todo-list

## Назначение

Проект todo-list ведётся под методологическим каркасом плагина `ai-driven-sdlc`.
Артефакты SDLC живут в `.claude/sdlc/` согласно принципу 14.
Плагин методологический; технологии выбираются на фазах SDLC.

## Обязательные правила

### Язык и стиль
- Все артефакты SDLC пишутся на русском языке.
- Каждое утверждение содержит не более 15 слов.
- Исключения: цитаты в fenced-блоках, отчёт `audit.md`.

### Код без комментариев (принцип 4a)
- В сгенерированном коде комментарии не пишутся.
- Документация живёт в markdown-артефактах, не в коде.
- Разрешены: shebang, license header, pragma, type directive.

### Секреты (принцип 10)
- Секреты хранятся в `.env` в корне; `.env` в `.gitignore`.
- Плагин поставляет `.env.example` без значений.

### Состояние проекта (принцип 9)
- Состояние хранится в артефактах целевого проекта.
- Тип state-артефакта зафиксирован в `plugin-config.md`.
- Текущий state-артефакт — файл `tasks.md` рядом с `alphas.md`.

### Интерактивность (принцип 1)
- Плагин порождает 2–3 альтернативы и фиксирует выбор.
- В HITL/HOTL выбор делается через `AskUserQuestion`.
- В HOOTL альтернативы пишутся в `decisions.md` автономно.

## Куда смотреть

- `.claude/sdlc/profile.md` — SME-профиль по фазам.
- `.claude/sdlc/plugin-config.md` — конфиг hooks.
- `.claude/sdlc/alphas.md` — состояние альф.
- `.claude/sdlc/system-context.md` — фокус внимания.
- `.claude/sdlc/roles.md` — роли пользователя.
- `.claude/sdlc/decisions.md` — журнал альтернатив.
- `.claude/sdlc/tasks.md` — состояние Work-альфы.

## Рабочий процесс

- GitHub Flow: feature-ветка → PR → review → merge в main.
- Коммиты и push выполняет пользователь самостоятельно.
- Критический аудит плана после каждого изменения.

## Следующий шаг

После `/sdlc-init` запустить `/sdlc-continue` для выбора фазы.
