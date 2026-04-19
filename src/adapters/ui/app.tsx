import { useMemo } from 'react';
import { TaskRepository } from '../../application/task-repository';
import { useTasks } from './use-tasks';
import { TaskForm } from './task-form';
import { TaskItem } from './task-item';
import { FilterBar, FilterCounts } from './filter-bar';

export interface AppProps {
  repository: TaskRepository;
}

export const App = ({ repository }: AppProps) => {
  const { tasks, visible, filter, ready, add, toggle, remove, setFilter } = useTasks(repository);

  const counts: FilterCounts = useMemo(() => {
    const active = tasks.filter((t) => t.status === 'active').length;
    const done = tasks.filter((t) => t.status === 'done').length;
    return { all: tasks.length, active, done };
  }, [tasks]);

  return (
    <main className="app">
      <h1>Todo</h1>
      <TaskForm onSubmit={add} />
      <FilterBar value={filter} counts={counts} onChange={setFilter} />
      {!ready && <p className="app__status">Загрузка…</p>}
      {ready && visible.length === 0 && <p className="app__status">Список пуст</p>}
      <ul className="task-list">
        {visible.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={toggle} onDelete={remove} />
        ))}
      </ul>
    </main>
  );
};
