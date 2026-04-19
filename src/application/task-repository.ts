import { Task } from '../domain/task';
import { TaskId } from '../domain/task-id';

export interface TaskRepository {
  findAll(): Promise<Task[]>;
  save(task: Task): Promise<void>;
  delete(id: TaskId): Promise<void>;
}
