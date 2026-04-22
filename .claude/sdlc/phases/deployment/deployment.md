---
name: deployment
type: deployment
phase: deployment
sme_level: mid
method: Автоматизированный конвейер с несколькими средами и обратимой стратегией
tool: GitHub Actions CI/CD + GitHub Pages
alphas: [Software System, Work]
disciplines: [continuous-delivery]
role: product-owner
traces_from: [phases/development/development.md, phases/testing/testing.md]
traces_to: []
system_of_attention: todo-list
created: 2026-04-23
updated: 2026-04-23
---

# Deployment проекта `todo-list`

## 1. Назначение

Автоматизировать сборку, проверку и доставку SPA на GitHub Pages.
Продвинуть Software System до `Ready` (готов к эксплуатации).

## 2. Привязка к фазе и методу

- **Фаза:** deployment.
- **Уровень SME:** mid (осознанный learning-upgrade с pet — CI/CD pipeline).
- **Дисциплины:** continuous-delivery.
- **Инструмент:** GitHub Actions CI/CD + GitHub Pages.
- **Автономность:** hotl.
- **Роль-автор:** product-owner (выступает также devops-инженером).

## 3. Содержание

### 3.1. Целевая среда

- **Платформа:** GitHub Pages.
- **URL:** `https://<owner>.github.io/todo-list/`.
- **Base-путь:** `/todo-list/` (в `vite.config.ts`).
- **SPA-limitation:** без роутинга с pushState; локальный state в localStorage.
- **Нет сервера, нет базы, нет секретов в проде.**

### 3.2. Pipeline (workflow `deploy.yml`)

Триггеры: `push` в `main`, `workflow_dispatch` (ручной запуск из UI).
Concurrency-группа `pages`; новые запуски не отменяют текущий деплой.
Permissions: `contents: read`, `pages: write`, `id-token: write`.

#### Job `ci` — CI gate

1. Checkout.
2. Setup Node 20 + npm cache.
3. `npm ci` — детерминированная установка.
4. `npm run lint` — ESLint flat config.
5. `npm run typecheck` — `tsc --noEmit`.
6. `npm run coverage` — Vitest + v8, gate 100% на domain+application.
7. `npm run build` — `tsc -b && vite build` → `dist/`.
8. Upload `dist/` как Pages-артефакт.

#### Job `deploy` — Deploy to Pages

- Depends on `ci`.
- Environment `github-pages` (url подставляется GitHub).
- `actions/deploy-pages@v4` — публикация артефакта.

### 3.3. E2E smoke (workflow `e2e.yml`)

- Триггер: `push` в `main`, `workflow_dispatch`.
- Независимый job, не блокирует deploy (отдельный файл).
- Playwright chromium; запуск против `vite preview` на 4173.
- `playwright-report` загружается как артефакт при падении (retention 14 дней).

### 3.4. Стратегия rollback

- Механизм: `git revert <sha> && git push origin main`.
- Тот же `deploy.yml` запускается на push, редеплоит предыдущую версию.
- Отказ приложения не требует ручного доступа к GitHub Pages UI.
- История git прозрачно отражает откат.

### 3.5. Pre-deployment checklist (ручной)

1. GitHub Pages включён в репозитории: Settings → Pages → Source: **GitHub Actions**.
2. `main` branch protected (опционально): не pushить сломанный код напрямую.
3. Secrets не требуются (Pages использует `GITHUB_TOKEN`).

### 3.6. Наблюдаемость деплоя

- GitHub UI: Actions → workflow run → status + logs.
- Deployment URL виден в Environments → github-pages.
- Sha latest deploy показан в commit check-mark.
- E2E failure uploads `playwright-report` artifact с traces.

### 3.7. Отвергнутые альтернативы

- **`deploy.sh` локально + `gh-pages` branch** — pet-ряд матрицы; нет ci-gate; ломает NFR-02 (нужны push-токены локально).
- **Cloudflare Pages / Netlify / Vercel** — внешние платформы; добавляют зависимость и аккаунт.
- **Docker + nginx на VPS** — избыточно для статики.
- **Pages от ветки `gh-pages` (классический режим)** — устарел, сам Vite/Actions рекомендуют артефакт-режим.
- **Отдельный release workflow по тегам** — требует дисциплины тегирования; continuous deployment с main проще.
- **rollback через UI Pages Deployments** — вне git-истории, непрозрачно.

## 4. Трассируемость

- **traces_from:**
  - `phases/development/development.md` — workflow Trunk-based на main.
  - `phases/testing/testing.md` — тесты и coverage gate используются в CI.
- **traces_to:** `phases/operations/` (после первого успешного деплоя).
- **Альфы:** Software System → `Ready`; Work → `Under Control`.
- **Связь с требованиями:**

| Требование | Свидетельство в pipeline |
|---|---|
| US-01..US-06 | unit + component tests gate в `ci` job |
| NFR-01 persistence | E2E smoke с reload в `e2e.yml` |
| NFR-02 без регистрации | Pages статика; нет сервера, auth не требуется |

## 5. Критерии готовности

- Workflow-файлы валидны YAML.
- `vite.config.ts` имеет `base: '/todo-list/'`.
- Локальный `npm run build` + `npm run test:e2e` проходят.
- CI gate: lint + typecheck + coverage + build.
- Rollback-процедура задокументирована и реалистична.
- Отвергнутые альтернативы зафиксированы с мотивом.
- Нет секретов в workflow; используется встроенный `GITHUB_TOKEN`.
