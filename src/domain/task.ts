import { TaskId } from './task-id';

export type TaskStatus = 'active' | 'completed';

const MAX_TITLE_LENGTH = 200;

export class Task {
  private constructor(
    readonly id: TaskId,
    readonly title: string,
    readonly status: TaskStatus,
  ) {}

  static create(id: TaskId, rawTitle: string): Task {
    const title = rawTitle.trim();
    if (title.length === 0) {
      throw new Error('Task title must not be empty');
    }
    if (title.length > MAX_TITLE_LENGTH) {
      throw new Error(`Task title must not exceed ${MAX_TITLE_LENGTH} characters`);
    }
    return new Task(id, title, 'active');
  }

  static rehydrate(id: TaskId, title: string, status: TaskStatus): Task {
    return new Task(id, title, status);
  }

  toggle(): Task {
    const next: TaskStatus = this.status === 'active' ? 'completed' : 'active';
    return new Task(this.id, this.title, next);
  }
}
