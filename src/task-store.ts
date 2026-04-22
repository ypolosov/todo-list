export interface Task {
  id: string;
  title: string;
  done: boolean;
}

export interface TaskStore {
  save(tasks: Task[]): void;
  load(): Task[];
}

export class InMemoryTaskStore implements TaskStore {
  private data: Task[] = [];

  save(tasks: Task[]): void {
    this.data = tasks.map((task) => ({ ...task }));
  }

  load(): Task[] {
    return this.data.map((task) => ({ ...task }));
  }
}

export class LocalStorageTaskStore implements TaskStore {
  constructor(private readonly key: string = "todo-list") {}

  save(tasks: Task[]): void {
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }

  load(): Task[] {
    const raw = localStorage.getItem(this.key);
    if (raw === null) return [];
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed as Task[];
    } catch {
      return [];
    }
  }
}
