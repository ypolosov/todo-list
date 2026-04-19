import { Task, isActive, isDone } from '../domain/task';

export type Filter = 'all' | 'active' | 'done';

export const filterTasks = (tasks: Task[], filter: Filter): Task[] => {
  if (filter === 'active') return tasks.filter(isActive);
  if (filter === 'done') return tasks.filter(isDone);
  return tasks;
};
