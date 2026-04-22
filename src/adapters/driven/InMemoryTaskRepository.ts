import { Task, TaskList } from '../../domain';
import type { TaskSnapshot } from '../../domain';
import type { TaskRepository } from '../../application/TaskRepository';

export class InMemoryTaskRepository implements TaskRepository {
  private snapshots: readonly TaskSnapshot[] = [];

  async load(): Promise<TaskList> {
    return TaskList.fromItems(this.snapshots.map((s) => Task.restore(s)));
  }

  async save(list: TaskList): Promise<void> {
    this.snapshots = list.items.map((t) => t.toSnapshot());
  }
}
