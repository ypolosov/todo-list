---
name: deployment
type: deployment
phase: deployment
sme_level: pet
method: continuous-delivery
tool: github-pages-via-actions
alphas: [Software System]
disciplines: [continuous-delivery]
role: developer
traces_from: [.claude/sdlc/phases/testing/testing.md, .claude/sdlc/phases/development/development.md]
traces_to: []
system_of_attention: todo-list
created: 2026-04-19
updated: 2026-04-19
---

# Deployment проекта todo-list

## 1. Назначение

Продвигает Software System от Demonstrable до Ready через автоматизированный деплой.
Переход к Operational — при первом успешном прохождении пайплайна в среде.
Метод — continuous-delivery; инструмент — GitHub Pages через GitHub Actions.

## 2. Привязка к фазе и методу

- Фаза: deployment.
- Уровень SME: pet.
- Дисциплина: continuous-delivery.
- Инструмент: GitHub Pages + GitHub Actions.
- Роль: developer (совмещает devops на pet-масштабе).

## 3. Содержание

### Среды

- **prod**: `https://ypolosov.github.io/todo-list/`.
- staging отдельно не разворачивается — PR-превью отсутствует на pet-уровне.

### Pipeline

Два workflow в `.github/workflows/`:

**`ci.yml`** — запускается на push в main и PR:
- `tsc --noEmit`
- `prettier --check`
- `eslint`
- `vitest run --coverage` (coverage-gate блокирует при нарушении).

**`deploy.yml`** — запускается на push в main:
- `npm ci`
- `vitest run` (гейт безопасности)
- `vite build` с `VITE_BASE=/todo-list/`
- `actions/upload-pages-artifact` + `actions/deploy-pages`.

### Сборка и base URL

- `vite.config.ts` берёт `base` из env `VITE_BASE`.
- Локально — `/` (dev/preview).
- Prod — `/todo-list/` (GitHub Pages под репо).

### Секреты и конфигурация

- Секретов на pet-уровне нет; `.env.example` пуст.
- GitHub Pages требует только permissions `pages: write`, `id-token: write`.
- Никаких API-ключей клиент не использует.

### Стратегия отката

- Основная: `git revert <sha>` проблемного коммита → push в main → автодеплой откатной сборки.
- Запасная: manual `workflow_dispatch` с checkout предыдущего sha.
- Время отката: до 2 минут (типовой прогон CI + deploy для pet).

### Ручной запуск локально

- `npm run dev` — dev-сервер с HMR (base `/`).
- `npm run preview` — проверка production-сборки перед push.
- `npm run test:e2e` — Playwright smoke (требует `npx playwright install chromium` единожды).

## 4. Трассируемость

- traces_from: [`.claude/sdlc/phases/testing/testing.md`, `.claude/sdlc/phases/development/development.md`].
- traces_to: будут добавлены на фазе operations.
- Продвижение альф: `.claude/sdlc/alphas.md`.

## 5. Критерии готовности

- Workflow `ci.yml` и `deploy.yml` написаны и ссылаются на корректные скрипты.
- Локально `npm run build` с `VITE_BASE=/todo-list/` успешен (146 kB JS gzip 47 kB).
- `.env.example` существует и не содержит секретов с значениями.
- Стратегия отката описана и воспроизводима.
- Alpha Software System достигла Ready (готово к выкату).
- Переход к Operational — после первого успешного прогона pipeline.
