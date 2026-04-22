import { beforeEach, describe, expect, it } from 'vitest';
import { Task, TaskList } from '../../../src/domain';
import { LocalStorageTaskRepository } from '../../../src/adapters/driven/LocalStorageTaskRepository';

describe('adapters.LocalStorageTaskRepository', () => {
  const KEY = 'todo-list.tasks';

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('load возвращает пустой список, если в storage ничего нет', async () => {
    const repo = new LocalStorageTaskRepository(window.localStorage);
    const list = await repo.load();
    expect(list.items).toEqual([]);
  });

  it('save пишет JSON-снимок, load восстанавливает список', async () => {
    const repo = new LocalStorageTaskRepository(window.localStorage);
    const source = TaskList.empty()
      .add(Task.create('1', 'a'))
      .add(Task.create('2', 'b'))
      .toggle('2');
    await repo.save(source);

    const raw = window.localStorage.getItem(KEY);
    expect(raw).not.toBeNull();

    const restored = await repo.load();
    expect(restored.items.map((t) => ({ id: t.id, status: t.status }))).toEqual([
      { id: '1', status: 'active' },
      { id: '2', status: 'completed' },
    ]);
  });

  it('load возвращает пустой список, если storage содержит мусор', async () => {
    window.localStorage.setItem(KEY, 'not-json');
    const repo = new LocalStorageTaskRepository(window.localStorage);
    const list = await repo.load();
    expect(list.items).toEqual([]);
  });

  it('load игнорирует некорректную форму массива', async () => {
    window.localStorage.setItem(KEY, JSON.stringify({ notArray: true }));
    const repo = new LocalStorageTaskRepository(window.localStorage);
    const list = await repo.load();
    expect(list.items).toEqual([]);
  });

  it('load отбрасывает элементы с невалидными полями', async () => {
    window.localStorage.setItem(
      KEY,
      JSON.stringify([
        { id: '1', title: 'ok', status: 'active' },
        { id: '', title: 'empty-id', status: 'active' },
        { id: '2', title: 'x', status: 'bogus' },
      ]),
    );
    const repo = new LocalStorageTaskRepository(window.localStorage);
    const list = await repo.load();
    expect(list.items.map((t) => t.id)).toEqual(['1']);
  });

  it('использует кастомный ключ storage', async () => {
    const repo = new LocalStorageTaskRepository(window.localStorage, 'custom-key');
    await repo.save(TaskList.empty().add(Task.create('1', 'a')));
    expect(window.localStorage.getItem('custom-key')).not.toBeNull();
    expect(window.localStorage.getItem(KEY)).toBeNull();
  });
});
