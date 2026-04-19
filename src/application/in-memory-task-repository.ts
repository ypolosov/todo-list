import { Task } from '../domain/task';
import { TaskId } from '../domain/task-id';
import { TaskRepository } from './task-repository';

export class InMemoryTaskRepository implements TaskRepository {
  private readonly tasks = new Map<TaskId, Task>();

  async findAll(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async save(task: Task): Promise<void> {
    this.tasks.set(task.id, task);
  }

  async delete(id: TaskId): Promise<void> {
    this.tasks.delete(id);
  }
}
