import { TaskId, createTaskId } from './task-id';
import { TaskStatus } from './task-status';

export interface Task {
  readonly id: TaskId;
  readonly text: string;
  readonly status: TaskStatus;
}

export const createTask = (rawText: string): Task => {
  const text = rawText.trim();
  if (text.length === 0) {
    throw new Error('Task text must not be empty');
  }
  return { id: createTaskId(), text, status: 'active' };
};

export const complete = (task: Task): Task =>
  task.status === 'done' ? task : { ...task, status: 'done' };

export const reopen = (task: Task): Task =>
  task.status === 'active' ? task : { ...task, status: 'active' };

export const isActive = (task: Task): boolean => task.status === 'active';

export const isDone = (task: Task): boolean => task.status === 'done';
