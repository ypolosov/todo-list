import { useMemo } from 'react';
import { AddTaskUseCase } from '../../application/add-task';
import { ToggleTaskUseCase } from '../../application/toggle-task';
import { RemoveTaskUseCase } from '../../application/remove-task';
import { ChangeFilterUseCase } from '../../application/change-filter';
import { ListTasksQuery } from '../../application/list-tasks';
import { LocalStorageTaskRepository } from '../storage/local-storage-repository';
import { TodoApp } from './TodoApp';

export function App(): JSX.Element {
  const wiring = useMemo(() => {
    const repo = new LocalStorageTaskRepository();
    return {
      addUC: new AddTaskUseCase(repo),
      toggleUC: new ToggleTaskUseCase(repo),
      removeUC: new RemoveTaskUseCase(repo),
      changeUC: new ChangeFilterUseCase(),
      listQ: new ListTasksQuery(repo),
    };
  }, []);

  return <TodoApp {...wiring} />;
}
