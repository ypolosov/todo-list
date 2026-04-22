---
name: plan
type: deployment
phase: deployment
sme_level: pet
method: static-site-ci-cd
tool: github-actions+github-pages
alphas: [Software System]
disciplines: [continuous-delivery]
role: architect
traces_from: [.claude/sdlc/phases/testing/plan.md, .claude/sdlc/phases/development/plan.md]
traces_to: []
system_of_attention: todo-list
created: 2026-04-22
updated: 2026-04-22
---

# Deployment plan: todo-list

## 1. Назначение

Автоматическая доставка статического веб-артефакта в production-среду.
Продвигает Software System от Usable до Ready, далее Operational.

## 2. Привязка к фазе и методу

- Фаза: deployment.
- Уровень SME: pet.
- Метод: static-site-ci-cd.
- Инструмент: github-actions + github-pages.
- Артефакт сборки: `dist/` (vite build).

## 3. Содержание

### Среды

| Среда | URL | Стратегия |
|---|---|---|
| production | GitHub Pages (`https://<owner>.github.io/todo-list/`) | auto-deploy при merge в main |

Одна среда; preview-среды не настраиваются (pet).

### Pipelines

#### CI (`.github/workflows/ci.yml`)

Триггеры: push и pull_request в `main`.
Шаги:
1. `actions/checkout@v4`.
2. `setup-node@v4` с Node 20 и npm-cache.
3. `npm ci` — детерминированный install.
4. `npx tsc --noEmit` — type-check.
5. `npx eslint src/` — линт.
6. `npx prettier --check src/` — формат.
7. `npx vitest run --coverage` — тесты + coverage gate.

Все 7 шагов — gate перед деплоем.

#### Deploy (`.github/workflows/deploy.yml`)

Триггеры: push в `main`, либо `workflow_dispatch` (ручной rerun).
Шаги:
1. Checkout, setup-node@20, npm ci.
2. `npx vitest run` — повторная валидация на прод-runner.
3. `npx vite build` → `dist/`.
4. `actions/configure-pages@v5`.
5. `actions/upload-pages-artifact@v3` из `dist`.
6. `actions/deploy-pages@v4` в environment `github-pages`.

Permissions: `contents: read`, `pages: write`, `id-token: write`.
Concurrency: `pages` group, cancel-in-progress off.

### Секреты и конфигурация

- Приложение клиентское; секреты не нужны.
- `.env` пустой; `.env.example` документирует потенциальные поля.
- GitHub Secrets не используются; `GITHUB_TOKEN` автоматический.

### Стратегия отката

1. `git revert <commit>` на main.
2. Push инициирует deploy.yml — предыдущее состояние выкатывается.
3. Альтернатива: re-run `deploy.yml` на старом коммите через Actions UI.

Автоматический rollback по метрикам не настраивается (pet).

### Vite-конфигурация

`vite.config.ts` фиксирует `base: "./"` — относительные пути,
позволяющие работать сайту на любой под-директории GitHub Pages.

## 4. Трассируемость

- traces_from: `phases/testing/plan.md` (tests gate CI), `phases/development/plan.md` (build команды).
- traces_to: фаза operations (мониторинг эксплуатации).
- Продвигаемые альфы: Software System → Ready (после первого успешного деплоя — Operational).

## 5. Критерии готовности

- Workflow-файлы существуют и валидны (`yamllint` или GitHub-валидация).
- `vite build` локально успешен; `dist/` содержит `index.html` и `assets/`.
- В репозитории включены GitHub Pages (Settings → Pages → Source: GitHub Actions).
- Первый запуск `deploy.yml` завершается со статусом success (после включения Pages).

## Не-цели

- Нет staging/dev-сред.
- Нет canary/blue-green стратегии.
- Нет инфраструктуры как код (Terraform) — статический хостинг.
- Нет автоматического rollback по SLO.
