---
name: operations
type: operations
phase: operations
sme_level: pet
method: site-reliability-engineering
tool: manual-ops-playbook
alphas: [Software System, Opportunity]
disciplines: [site-reliability-engineering]
role: developer
traces_from: [.claude/sdlc/phases/deployment/deployment.md, .claude/sdlc/phases/vision/vision.md]
traces_to: []
system_of_attention: todo-list
created: 2026-04-19
updated: 2026-04-19
---

# Operations проекта todo-list

## 1. Назначение

Поддерживает Software System в состоянии Operational.
Обеспечивает цикл обратной связи от автора-пользователя к Vision.
Метод — site-reliability-engineering pet-формата; инструмент — ручной playbook.

## 2. Привязка к фазе и методу

- Фаза: operations.
- Уровень SME: pet.
- Дисциплина: site-reliability-engineering.
- Инструмент: ручной операционный playbook.
- Роль: developer (совмещает sre и product-owner).

## 3. Содержание

### Среда и точки контроля

- Прод: `https://ypolosov.github.io/todo-list/`.
- Health-check: открыть URL; приложение должно отрисовать заголовок, форму, фильтры.
- Хранилище состояния — на стороне клиента (localStorage); серверных логов нет.

### Наблюдаемость (pet)

- Основной сигнал — успешный прогон `deploy.yml` в GitHub Actions.
- Бадж статуса CI в README — желаемо, но не обязательно на pet.
- Ручная проверка функций F-01…F-05 после каждого merge в main.
- Автоматический uptime-monitor не подключён; pet-масштаб не требует.

### Обратная связь

- Канал: GitHub Issues репозитория `ypolosov/todo-list`.
- Типы: bug / enhancement / question — стандартные лейблы.
- Все обращения обрабатывает автор (единственный стейкхолдер).
- Идеи, превышающие MVP, возвращаются в Vision как кандидаты.

### Реакция на инциденты

Простой playbook при обнаружении ошибки в проде:

1. Воспроизвести ошибку в `npm run dev` локально.
2. Если воспроизводится и критично — `git revert <sha>` последнего изменения.
3. Push в `main` → автоматический передеплой откатной версии (~2 мин).
4. Зафиксировать 1-строчный postmortem в `decisions.md`: причина, действие, следствие.
5. Завести Issue для последующего исправления с тестом, закрывающим кейс.

### Пересмотр SDLC-профиля

- При регулярных инцидентах pet-уровня operations — повысить до mid.
- При росте пользовательской базы — включить uptime-монитор.
- Переоткрытие Vision — при новых инсайтах от использования.

### Критерии Retirement

- Если продукт перестаёт использоваться автором — `/sdlc-focus --retire`.
- Если заменён другим инструментом — запись в `decisions.md` + Opportunity в Retired.

## 4. Трассируемость

- traces_from: [`.claude/sdlc/phases/deployment/deployment.md`, `.claude/sdlc/phases/vision/vision.md`].
- traces_to: новые итерации Vision/Requirements по мере поступления идей.
- Продвижение альф: `.claude/sdlc/alphas.md`.

## 5. Критерии готовности

- Playbook описан и воспроизводим без дополнительного контекста.
- Канал обратной связи зафиксирован и рабочий (GitHub Issues).
- Стратегия отката связана с фазой deployment.
- Alpha Software System в Operational и поддерживается.
- Цикл обратной связи Operations → Vision явно описан.
