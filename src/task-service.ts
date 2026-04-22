import type { Task, TaskStore } from "./task-store.js";

export class TaskService {
  private tasks: Task[];

  constructor(private readonly store: TaskStore) {
    this.tasks = store.load();
  }

  list(): Task[] {
    this.tasks = this.store.load();
    return this.tasks.map((task) => ({ ...task }));
  }

  create(title: string): string {
    const id = generateId();
    this.tasks = [...this.tasks, { id, title, done: false }];
    this.store.save(this.tasks);
    return id;
  }

  toggle(id: string): void {
    const found = this.tasks.some((task) => task.id === id);
    if (!found) return;
    this.tasks = this.tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
    this.store.save(this.tasks);
  }

  remove(id: string): void {
    const found = this.tasks.some((task) => task.id === id);
    if (!found) return;
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.store.save(this.tasks);
  }
}

function generateId(): string {
  return `t-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
