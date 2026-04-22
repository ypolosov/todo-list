import { Filter } from './Filter';
import { Task } from './Task';

export class TaskList {
  private constructor(private readonly _items: readonly Task[]) {}

  static empty(): TaskList {
    return new TaskList([]);
  }

  static fromItems(items: readonly Task[]): TaskList {
    const seen = new Set<string>();
    for (const item of items) {
      if (seen.has(item.id)) {
        throw new Error('duplicate id');
      }
      seen.add(item.id);
    }
    return new TaskList([...items]);
  }

  get items(): readonly Task[] {
    return this._items;
  }

  add(task: Task): TaskList {
    if (this._items.some((t) => t.id === task.id)) {
      throw new Error('duplicate id');
    }
    return new TaskList([...this._items, task]);
  }

  remove(id: string): TaskList {
    const next = this._items.filter((t) => t.id !== id);
    return next.length === this._items.length ? this : new TaskList(next);
  }

  toggle(id: string): TaskList {
    let changed = false;
    const next = this._items.map((t) => {
      if (t.id !== id) {
        return t;
      }
      changed = true;
      return t.toggle();
    });
    return changed ? new TaskList(next) : this;
  }

  filter(filter: Filter): readonly Task[] {
    if (filter === 'all') {
      return this._items;
    }
    const want = filter === 'active';
    return this._items.filter((t) => t.isActive() === want);
  }
}
