import { Task, createTask } from '../domain/task';
import { TaskRepository } from './task-repository';

export const addTask = async (repo: TaskRepository, text: string): Promise<Task> => {
  const task = createTask(text);
  await repo.save(task);
  return task;
};
