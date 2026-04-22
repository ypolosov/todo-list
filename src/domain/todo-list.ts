import { Task } from './task';
import type { TaskId } from './task-id';
import type { Filter } from './filter';

export class TaskNotFoundError extends Error {
  constructor(id: TaskId) {
    super(`Task not found: ${id.toString()}`);
    this.name = 'TaskNotFoundError';
  }
}

export class TodoList {
  private constructor(readonly tasks: readonly Task[]) {}

  static empty(): TodoList {
    return new TodoList([]);
  }

  static rehydrate(tasks: readonly Task[]): TodoList {
    return new TodoList([...tasks]);
  }

  add(id: TaskId, rawTitle: string): TodoList {
    const next = Task.create(id, rawTitle);
    return new TodoList([...this.tasks, next]);
  }

  toggle(id: TaskId): TodoList {
    const index = this.indexOf(id);
    const next = this.tasks[index].toggle();
    const updated = [...this.tasks];
    updated[index] = next;
    return new TodoList(updated);
  }

  remove(id: TaskId): TodoList {
    const index = this.indexOf(id);
    const updated = [...this.tasks.slice(0, index), ...this.tasks.slice(index + 1)];
    return new TodoList(updated);
  }

  list(filter: Filter): readonly Task[] {
    return this.tasks.filter((t) => filter.matches(t.status));
  }

  private indexOf(id: TaskId): number {
    const index = this.tasks.findIndex((t) => t.id.equals(id));
    if (index < 0) {
      throw new TaskNotFoundError(id);
    }
    return index;
  }
}
