import { Task, TaskList } from '../../domain';
import type { TaskSnapshot, TaskStatus } from '../../domain';
import type { TaskRepository } from '../../application/TaskRepository';

const DEFAULT_KEY = 'todo-list.tasks';
const VALID_STATUSES: readonly TaskStatus[] = ['active', 'completed'];

function isValidSnapshot(value: unknown): value is TaskSnapshot {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    typeof record.id === 'string' &&
    record.id.trim() !== '' &&
    typeof record.title === 'string' &&
    record.title.trim() !== '' &&
    typeof record.status === 'string' &&
    (VALID_STATUSES as readonly string[]).includes(record.status)
  );
}

export class LocalStorageTaskRepository implements TaskRepository {
  constructor(
    private readonly storage: Storage,
    private readonly key: string = DEFAULT_KEY,
  ) {}

  async load(): Promise<TaskList> {
    const raw = this.storage.getItem(this.key);
    if (raw === null) {
      return TaskList.empty();
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return TaskList.empty();
    }
    if (!Array.isArray(parsed)) {
      return TaskList.empty();
    }
    const tasks = parsed.filter(isValidSnapshot).map((s) => Task.restore(s));
    return TaskList.fromItems(tasks);
  }

  async save(list: TaskList): Promise<void> {
    const payload = list.items.map((t) => t.toSnapshot());
    this.storage.setItem(this.key, JSON.stringify(payload));
  }
}
