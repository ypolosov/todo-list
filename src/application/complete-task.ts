import { Task, complete, reopen, isActive } from '../domain/task';
import { TaskId } from '../domain/task-id';
import { TaskRepository } from './task-repository';

export const completeTask = async (repo: TaskRepository, id: TaskId): Promise<Task> => {
  const tasks = await repo.findAll();
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    throw new Error(`Task not found: ${id}`);
  }
  const updated = isActive(task) ? complete(task) : reopen(task);
  await repo.save(updated);
  return updated;
};
