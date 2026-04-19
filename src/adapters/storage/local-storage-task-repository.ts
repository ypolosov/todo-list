import { Task } from '../../domain/task';
import { TaskId } from '../../domain/task-id';
import { TaskRepository } from '../../application/task-repository';

export class LocalStorageTaskRepository implements TaskRepository {
  constructor(private readonly storageKey: string) {}

  async findAll(): Promise<Task[]> {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed as Task[];
    } catch {
      return [];
    }
  }

  async save(task: Task): Promise<void> {
    const tasks = await this.findAll();
    const idx = tasks.findIndex((t) => t.id === task.id);
    if (idx >= 0) {
      tasks[idx] = task;
    } else {
      tasks.push(task);
    }
    this.persist(tasks);
  }

  async delete(id: TaskId): Promise<void> {
    const tasks = await this.findAll();
    const filtered = tasks.filter((t) => t.id !== id);
    this.persist(filtered);
  }

  private persist(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}
