import { Task } from '../../domain/task';
import { TaskId } from '../../domain/task-id';
import type { TaskRepository } from '../../domain/task-repository';
import { tasksSchema } from './task-schema';

const STORAGE_KEY = 'todo-list:v1';

export class LocalStorageTaskRepository implements TaskRepository {
  constructor(private readonly storage: Storage = window.localStorage) {}

  load(): readonly Task[] {
    const raw = this.storage.getItem(STORAGE_KEY);
    if (raw === null) {
      return [];
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return [];
    }

    const result = tasksSchema.safeParse(parsed);
    if (!result.success) {
      return [];
    }

    return result.data.map((t) => Task.rehydrate(TaskId.fromString(t.id), t.title, t.status));
  }

  save(tasks: readonly Task[]): void {
    const serialized = tasks.map((t) => ({
      id: t.id.toString(),
      title: t.title,
      status: t.status,
    }));
    this.storage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  }
}
