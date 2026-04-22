import { useCallback, useEffect, useMemo, useState } from 'react';
import { AddTask, FilterTasks, ListTasks, RemoveTask, ToggleTask } from '../../../application';
import type { TaskRepository } from '../../../application';
import { FILTERS } from '../../../domain';
import type { Filter, Task } from '../../../domain';

export interface TaskListViewProps {
  repository: TaskRepository;
  nextId?: () => string;
}

function defaultIdGenerator(): () => string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return () => crypto.randomUUID();
  }
  let counter = 0;
  return () => `task-${Date.now()}-${++counter}`;
}

export function TaskListView({ repository, nextId }: TaskListViewProps): JSX.Element {
  const idGenerator = useMemo(() => nextId ?? defaultIdGenerator(), [nextId]);

  const useCases = useMemo(
    () => ({
      add: new AddTask(repository, idGenerator),
      toggle: new ToggleTask(repository),
      remove: new RemoveTask(repository),
      list: new ListTasks(repository),
      filter: new FilterTasks(repository),
    }),
    [repository, idGenerator],
  );

  const [tasks, setTasks] = useState<readonly Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [title, setTitle] = useState('');

  const refresh = useCallback(
    async (currentFilter: Filter) => {
      const next = await useCases.filter.execute(currentFilter);
      setTasks(next);
    },
    [useCases],
  );

  useEffect(() => {
    void (async () => {
      await useCases.list.execute();
      await refresh(filter);
    })();
  }, [useCases, filter, refresh]);

  const submit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const trimmed = title.trim();
    if (trimmed === '') {
      return;
    }
    await useCases.add.execute(trimmed);
    setTitle('');
    await refresh(filter);
  };

  const onToggle = async (id: string): Promise<void> => {
    await useCases.toggle.execute(id);
    await refresh(filter);
  };

  const onRemove = async (id: string): Promise<void> => {
    await useCases.remove.execute(id);
    await refresh(filter);
  };

  return (
    <main>
      <h1>TODO</h1>
      <form onSubmit={submit} aria-label="add-task-form">
        <label htmlFor="title-input">Новая задача</label>
        <input
          id="title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Что сделать?"
        />
        <button type="submit">Add</button>
      </form>

      <nav aria-label="filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            data-filter={f}
          >
            {f}
          </button>
        ))}
      </nav>

      <ul aria-label="tasks">
        {tasks.length === 0 ? (
          <li data-empty>Задач нет</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id} data-task-id={task.id} data-status={task.status}>
              <label>
                <input
                  type="checkbox"
                  checked={!task.isActive()}
                  onChange={() => onToggle(task.id)}
                  aria-label={`toggle-${task.title}`}
                />
                <span>{task.title}</span>
              </label>
              <button
                type="button"
                onClick={() => onRemove(task.id)}
                aria-label={`remove-${task.title}`}
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
