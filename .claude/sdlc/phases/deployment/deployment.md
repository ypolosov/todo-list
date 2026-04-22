---
name: deployment
type: deployment
phase: deployment
sme_level: pet
method: Ручное развёртывание одной командой в одну среду
tool: GitHub Pages + GitHub Actions workflow
alphas: [Software System]
disciplines: [continuous-delivery]
role: product-owner
traces_from: [.claude/sdlc/phases/development/development.md, .claude/sdlc/phases/testing/testing.md]
traces_to: []
system_of_attention: todo-list
created: 2026-04-22
updated: 2026-04-22
---

# Deployment: todo-list

## 1. Назначение

Артефакт продвигает альфу Software System до Ready.
Метод — одна автоматизированная публикация статического бандла в одну среду.

## 2. Привязка к фазе и методу

- Фаза: deployment.
- Уровень SME: pet (формально; GitHub Actions фигурирует в mid-матрице, но здесь используется как одношаговый деплой).
- Дисциплина: continuous-delivery.
- Инструмент: GitHub Pages + GitHub Actions workflow.
- Автономность: hotl — push в main запускает pipeline автоматически; вмешательство только при падении.

## 3. Содержание

### 3.1. Целевая среда

| Параметр | Значение |
|---|---|
| Хостинг | GitHub Pages |
| Домен | `https://<owner>.github.io/todo-list/` |
| Base path | `/todo-list/` (в vite.config.ts через env `VITE_BASE`) |
| CDN | через GitHub Pages (Fastly) |
| Сертификат | HTTPS автоматически |

Dev-режим использует `VITE_BASE=/` через npm-скрипты `dev` и `preview`.

### 3.2. Pipeline (.github/workflows/deploy.yml)

Три job-а последовательно:

| Job | Назначение | Гейт |
|---|---|---|
| verify | `typecheck`, `lint`, `test` (Vitest unit + coverage), `test:e2e` (Playwright chromium) | все должны быть зелёными |
| build | `npm run build` → Vite production бандл в `dist/`; upload-pages-artifact | зависит от verify |
| publish | `deploy-pages` публикует артефакт на GitHub Pages | зависит от build |

Concurrency-группа `pages` с `cancel-in-progress: true` — активна только одна публикация.

### 3.3. Триггеры

- `push` в `main` — автоматическая публикация после merge PR.
- `workflow_dispatch` — ручной запуск (rollback или внеплановая публикация).

### 3.4. Rollback

Процедура: `git revert <bad-sha>` → push в main → тот же pipeline автоматически публикует предыдущее состояние.

Обоснование: повторное использование pipeline не требует отдельного rollback-механизма; повторный прогон verify исключает регрессии.

Альтернатива: ручной `workflow_dispatch` с указанием `ref` на предыдущий тег — не выбрано (нет тегирования в pet-проекте).

### 3.5. Требуемая настройка репозитория

| Пункт | Действие владельца репозитория |
|---|---|
| Pages source | Settings → Pages → Source: GitHub Actions |
| Branch protection | main защищена; PR merge разрешён после verify |
| Secrets | не требуются: Pages работает на `GITHUB_TOKEN` с pages/id-token permissions в workflow |
| Окружение | `github-pages` создаётся автоматически при первой публикации |

### 3.6. Публикуемый артефакт

- Содержимое `dist/`: `index.html`, `assets/index-*.js`, `assets/index-*.css` (опционально).
- Размер: ~147 КБ (gzip ~47 КБ) на момент фазы.
- Нет серверного кода, нет переменных окружения в рантайме.
- Секреты в `.env` не коммитятся (принцип 10).

## 4. Трассируемость

- `traces_from`: `.claude/sdlc/phases/development/development.md`, `.claude/sdlc/phases/testing/testing.md`.
- `traces_to`: будет заполнено в фазе operations.
- Альфы: `.claude/sdlc/alphas.md`.
- Workflow: `.github/workflows/deploy.yml`.
- Конфиг base path: `vite.config.ts`, скрипты `package.json`.

## 5. Критерии готовности

- Артефакт проходит `validate-artifact.sh`.
- `.github/workflows/deploy.yml` присутствует и синтаксически валиден.
- `npm run build` успешен локально; `dist/index.html` содержит `/todo-list/` префикс.
- Альфа Software System не ниже Ready: артефакт готов к публикации.
- Документирована процедура rollback.
- `check-cross-refs.sh` не находит осиротевших ссылок.

## 6. Границы фазы

Вне фазы deployment:
- Включение Pages в настройках GitHub (делает пользователь).
- Первичный push в main и merge первого PR (делает пользователь — принцип memory «не коммитить в git самостоятельно»).
- Мониторинг публичной URL после публикации — относится к фазе operations.
