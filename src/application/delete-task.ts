import { TaskId } from '../domain/task-id';
import { TaskRepository } from './task-repository';

export const deleteTask = async (repo: TaskRepository, id: TaskId): Promise<void> => {
  await repo.delete(id);
};
