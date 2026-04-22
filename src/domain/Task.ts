export type TaskStatus = 'active' | 'completed';

export interface TaskSnapshot {
  id: string;
  title: string;
  status: TaskStatus;
}

export class Task {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly status: TaskStatus,
  ) {}

  static create(id: string, title: string): Task {
    if (id.trim() === '') {
      throw new Error('Task id must not be empty');
    }
    const trimmed = title.trim();
    if (trimmed === '') {
      throw new Error('Task title must not be empty');
    }
    return new Task(id, trimmed, 'active');
  }

  static restore(snapshot: TaskSnapshot): Task {
    return new Task(snapshot.id, snapshot.title, snapshot.status);
  }

  toggle(): Task {
    const next: TaskStatus = this.status === 'active' ? 'completed' : 'active';
    return new Task(this.id, this.title, next);
  }

  isActive(): boolean {
    return this.status === 'active';
  }

  toSnapshot(): TaskSnapshot {
    return { id: this.id, title: this.title, status: this.status };
  }
}
