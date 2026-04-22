import { useMemo } from 'react';
import { LocalStorageTaskRepository } from '../../driven/LocalStorageTaskRepository';
import { TaskListView } from './TaskListView';

export function App(): JSX.Element {
  const repository = useMemo(() => new LocalStorageTaskRepository(window.localStorage), []);
  return <TaskListView repository={repository} />;
}
