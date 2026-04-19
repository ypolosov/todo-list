export type TaskStatus = 'active' | 'done';

export const toggleStatus = (status: TaskStatus): TaskStatus =>
  status === 'active' ? 'done' : 'active';
