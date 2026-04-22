import { useState } from 'react';
import type { AddTaskUseCase } from '../../application/add-task';
import type { ToggleTaskUseCase } from '../../application/toggle-task';
import type { RemoveTaskUseCase } from '../../application/remove-task';
import type { ChangeFilterUseCase } from '../../application/change-filter';
import type { ListTasksQuery } from '../../application/list-tasks';
import type { TaskId } from '../../domain/task-id';
import { Filter } from '../../domain/filter';
import { TaskInput } from './TaskInput';
import { TaskList } from './TaskList';
import { FilterBar } from './FilterBar';

interface Props {
  addUC: AddTaskUseCase;
  toggleUC: ToggleTaskUseCase;
  removeUC: RemoveTaskUseCase;
  changeUC: ChangeFilterUseCase;
  listQ: ListTasksQuery;
}

export function TodoApp({ addUC, toggleUC, removeUC, changeUC, listQ }: Props): JSX.Element {
  const [filter, setFilter] = useState<Filter>(Filter.default());
  const [, setVersion] = useState(0);

  const tasks = listQ.execute(filter);

  const bump = (): void => setVersion((v) => v + 1);

  const handleAdd = (title: string): void => {
    addUC.execute(title);
    bump();
  };
  const handleToggle = (id: TaskId): void => {
    toggleUC.execute(id);
    bump();
  };
  const handleRemove = (id: TaskId): void => {
    removeUC.execute(id);
    bump();
  };
  const handleFilterChange = (raw: string): void => {
    setFilter(changeUC.execute(raw));
  };

  return (
    <main>
      <h1>todo-list</h1>
      <TaskInput onAdd={handleAdd} />
      <FilterBar current={filter} onChange={handleFilterChange} />
      <TaskList tasks={tasks} onToggle={handleToggle} onRemove={handleRemove} />
    </main>
  );
}
