---
name: plan
type: operations
phase: operations
sme_level: pet
method: static-site-lightweight-ops
tool: github-actions-runs+manual-check
alphas: [Software System, Opportunity]
disciplines: [site-reliability-engineering]
role: architect
traces_from: [.claude/sdlc/phases/deployment/plan.md, .claude/sdlc/phases/vision/lean-canvas.md]
traces_to: []
system_of_attention: todo-list
created: 2026-04-22
updated: 2026-04-22
---

# Operations plan: todo-list

## 1. Назначение

Зафиксировать минимальный контур эксплуатации статического сайта.
Запустить петлю обратной связи от аудитории демо обратно в Vision.

## 2. Привязка к фазе и методу

- Фаза: operations.
- Уровень SME: pet.
- Метод: static-site-lightweight-ops.
- Инструмент: github-actions-runs + manual-check.
- Production URL: `https://ypolosov.github.io/todo-list/`.

## 3. Содержание

### Наблюдаемость

| Сигнал | Источник | Частота проверки |
|---|---|---|
| Статус CI | Actions `ci.yml` | при push/PR |
| Статус деплоя | Actions `deploy.yml` | при merge в main |
| Доступность URL | Ручной open в браузере | после каждого деплоя |
| Клиентские ошибки | Не собираются | — |

Внешний uptime-мониторинг и client-side telemetry отклонены как избыточные для pet.

### SLO/SLI

- SLA не декларируется (pet, один пользователь).
- Внутренняя цель: зелёный CI на `main` — единственный формальный gate.
- Инциденты фиксируются ad-hoc; метрики времени восстановления не собираются.

### On-call

- Автор репозитория (`@ypolosov`) на best-effort.
- Формальная ротация отсутствует.
- Реакция на инциденты — по доступности.

### Канал обратной связи

1. Вопросы/баги/идеи аудитории → **GitHub Issues**.
2. Метка `feedback:vision` — кандидаты на пересмотр Vision.
3. Метка `feedback:requirements` — кандидаты на расширение backlog.
4. Для значимых инцидентов — **postmortem-запись** в `decisions.md` с разделами:
   - what happened (что произошло);
   - impact (что затронуто);
   - root cause (корневая причина);
   - remediation (как устранили);
   - prevent (как не повторить).

### Runbook инцидентов

| Симптом | Первая проверка | Действие |
|---|---|---|
| URL открывается с 404 | Actions → `deploy.yml` последний run | Re-run failed jobs либо workflow_dispatch |
| URL отдаёт старую версию | Pages settings → Source | Убедиться: Source = GitHub Actions |
| Данные не сохраняются | DevTools → Application → Local Storage | Проверить ключ `todo-list`; чистый ли браузер |
| CI красный в `main` | Actions → `ci.yml` логи | Revert коммит либо hotfix-PR с тестами |
| Pages отключён | Settings → Pages | Включить; запустить `deploy.yml` вручную |

### Цикл обратной связи в Vision

- Issue с меткой `feedback:vision` → открывается обсуждение.
- При подтверждении значимости: переоткрытие `/sdlc-phase vision` с `--reconfigure`.
- Постмортем значимого инцидента → новая запись в `decisions.md` → возможное обновление alpha Way of Working.

## 4. Трассируемость

- traces_from: `phases/deployment/plan.md` (pipeline), `phases/vision/lean-canvas.md` (цели).
- traces_to: следующая итерация Vision при накоплении фидбэка.
- Продвигаемые альфы:
  - Software System: Ready → **Operational** (первый успешный production-деплой 2026-04-22).
  - Opportunity: Value Established → **Viable** (воплощение работает и доступно бенефициарам).

## 5. Критерии готовности

- URL открывается, UI рендерится, R1..R4 работают ручной проверкой.
- Workflow `deploy.yml` завершился успешно (видно в Actions UI).
- Канал фидбэка описан; метки issues перечислены.
- Runbook покрывает минимум 3 типичных симптома.
- `validate-artifact.sh` проходит на этом файле.

## Не-цели

- Нет APM/RUM/Sentry — клиентская телеметрия не собирается.
- Нет SLA-переговоров — pet.
- Нет автоматической эскалации и pager — on-call best-effort.
- Нет мультирегиональной репликации — один artefact на Pages.
