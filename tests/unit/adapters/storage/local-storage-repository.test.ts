import { describe, it, expect, beforeEach } from 'vitest';
import { LocalStorageTaskRepository } from '../../../../src/adapters/storage/local-storage-repository';
import { Task } from '../../../../src/domain/task';
import { TaskId } from '../../../../src/domain/task-id';

const KEY = 'todo-list:v1';

describe('LocalStorageTaskRepository', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('load returns an empty array when storage is empty', () => {
    const repo = new LocalStorageTaskRepository();
    expect(repo.load()).toHaveLength(0);
  });

  it('save then load round-trips tasks', () => {
    const repo = new LocalStorageTaskRepository();
    const active = Task.create(TaskId.fromString('a'), 'buy milk');
    const completed = Task.rehydrate(TaskId.fromString('b'), 'done item', 'completed');
    repo.save([active, completed]);

    const loaded = repo.load();
    expect(loaded).toHaveLength(2);
    expect(loaded[0].title).toBe('buy milk');
    expect(loaded[0].status).toBe('active');
    expect(loaded[1].title).toBe('done item');
    expect(loaded[1].status).toBe('completed');
  });

  it('load returns an empty array when stored JSON is malformed', () => {
    window.localStorage.setItem(KEY, '{not-json');
    const repo = new LocalStorageTaskRepository();
    expect(repo.load()).toHaveLength(0);
  });

  it('load returns an empty array when schema validation fails', () => {
    window.localStorage.setItem(KEY, JSON.stringify([{ id: 'a', title: '', status: 'active' }]));
    const repo = new LocalStorageTaskRepository();
    expect(repo.load()).toHaveLength(0);
  });

  it('save persists tasks under the versioned key', () => {
    const repo = new LocalStorageTaskRepository();
    repo.save([Task.create(TaskId.fromString('x'), 'x')]);
    expect(window.localStorage.getItem(KEY)).not.toBeNull();
  });

  it('accepts an injected storage and uses it instead of window.localStorage', () => {
    const map = new Map<string, string>();
    const storage: Storage = {
      get length(): number {
        return map.size;
      },
      clear: () => map.clear(),
      getItem: (k) => map.get(k) ?? null,
      key: () => null,
      removeItem: (k) => {
        map.delete(k);
      },
      setItem: (k, v) => {
        map.set(k, v);
      },
    };
    const repo = new LocalStorageTaskRepository(storage);
    repo.save([Task.create(TaskId.fromString('z'), 'z')]);
    expect(map.get(KEY)).not.toBeUndefined();
    expect(window.localStorage.getItem(KEY)).toBeNull();
  });
});
