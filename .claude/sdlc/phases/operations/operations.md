---
name: operations
type: operations
phase: operations
sme_level: pet
method: Пассивный сбор логов и внешняя проверка доступности
tool: Uptime-мониторинг + Health-check endpoint + GitHub Issues как канал обратной связи
alphas: [Software System, Opportunity, Way of Working]
disciplines: [site-reliability-engineering]
role: product-owner
traces_from: [phases/deployment/deployment.md]
traces_to: []
system_of_attention: todo-list
created: 2026-04-23
updated: 2026-04-23
---

# Operations проекта `todo-list`

## 1. Назначение

Обеспечить эксплуатацию прод-версии на GitHub Pages.
Продвинуть Software System до `Operational`, Opportunity до `Viable`, Way of Working до `In Use`.

## 2. Привязка к фазе и методу

- **Фаза:** operations.
- **Уровень SME:** pet.
- **Дисциплина:** site-reliability-engineering.
- **Автономность:** hootl.
- **Роль-автор:** product-owner (также выступает SRE на pet).
- **Инструмент:** ручная проверка URL + GitHub Issues как канал обратной связи.

## 3. Содержание

### 3.1. Прод-среда

- **URL:** `https://ypolosov.github.io/todo-list/`.
- **Целостность:** зависит от GitHub Pages SLA (без персонального SLO).
- **State:** localStorage каждого пользователя; сервера и БД нет.
- **Деплой:** `.github/workflows/deploy.yml` на push в `main`.

### 3.2. Наблюдаемость (pet)

| Сигнал | Источник | Частота |
|---|---|---|
| Доступность страницы | ручная проверка URL в браузере | при каждом изменении |
| Статус последнего деплоя | GitHub Actions UI | после push / по запросу |
| Ошибки сборки | email от GitHub при failure | автоматически |
| Функциональность MVP | Playwright smoke в CI (`e2e.yml`) | на каждый push |
| Пользовательская обратная связь | GitHub Issues | ad-hoc |

### 3.3. Канал обратной связи

- **Репозиторий:** `github.com/ypolosov/todo-list/issues`.
- **Шаблоны:** `.github/ISSUE_TEMPLATE/bug_report.md`, `.github/ISSUE_TEMPLATE/feedback.md`.
- **config.yml:** пустые issue отключены; пользователь выбирает шаблон.
- **Лейблы:** `bug`, `feedback`.
- **Триаж:** ручной, в рамках pet-режима.

### 3.4. Процедура реагирования на инциденты

1. **Обнаружение:** ручная проверка URL или внешний bug-report в Issues.
2. **Оценка:** классифицировать как critical / degraded / cosmetic.
3. **Решение по откату:**
   - critical → немедленный `git revert <sha> && git push origin main`; pipeline редеплоит за ~1 мин.
   - degraded → задача-fix в `tasks.md`; следующий коммит устраняет.
   - cosmetic → ticket в Issues, ждёт очереди.
4. **Postmortem:** одна запись в `decisions.md` формата `## YYYY-MM-DD HH:MM — postmortem: <симптом>`.
5. **Закрытие:** обновить issue; пометить `tasks.md`.

### 3.5. Шаблон postmortem (1-строчный)

```
## <YYYY-MM-DD HH:MM> — postmortem: <краткий симптом>
- context: что сломалось и когда замечено.
- root_cause: истинная причина (не симптом).
- mitigation: что сделано прямо сейчас.
- prevention: что изменит будущее поведение.
- traces_to: [revert-commit-sha, связанные тесты, updated docs].
```

### 3.6. Эволюция и цикл обратной связи

- Issues от пользователей → бэклог в `tasks.md` → соответствующая фаза (`requirements` / `development`).
- Продвижение Opportunity до `Viable` — подтверждено первым прод-использованием.
- Продвижение Way of Working до `In Use` — плагин прошёл полный цикл SDLC end-to-end.

### 3.7. Что явно не делаем на pet

- Нет Sentry / Rollbar / error tracking.
- Нет Prometheus / Grafana / alertmanager.
- Нет SLO / SLI / error budget.
- Нет on-call ротации; один оператор.
- Нет runbook'ов per-component; процедура одна.
- Нет health-check endpoint'а (статика; проверка URL достаточна).

### 3.8. Отвергнутые альтернативы

- **Sentry / Rollbar** — оверкилл для pet; требует аккаунта и DSN.
- **UptimeRobot / Better Uptime** — внешний мониторинг; полезно, но ручной проверки достаточно для MVP.
- **window.onerror + POST в Issues API** — интересно, но требует токена и усложняет код.
- **Mid-уровень (Prometheus + runbook + postmortem template)** — нет сервера куда вешать Prometheus.
- **Рассылка по email/Telegram** — личный канал, не подходит open-source.

## 4. Трассируемость

- **traces_from:** `phases/deployment/deployment.md` — pipeline, rollback-стратегия.
- **traces_to:** `phases/vision/vision.md` (обратная связь → пересмотр ценности) и `phases/requirements/requirements.md` (пользовательские Issues → US).
- **Альфы:**
  - Software System → `Operational` (прод работает, пользователь подтвердил скриншотом).
  - Opportunity → `Viable` (ценность проверена; учебный прогон SDLC завершён).
  - Way of Working → `In Use` (метод применялся end-to-end).

## 5. Критерии готовности

- Артефакт валиден; frontmatter и секции по мета-шаблону.
- Канал обратной связи настроен: issue templates + config.yml.
- Процедура инцидентов задокументирована и реалистична.
- Шаблон postmortem зафиксирован.
- Явные не-цели операций перечислены.
- Отвергнутые альтернативы зафиксированы с мотивом.
