import { describe, it, expect } from 'vitest';
import type { TaskRepository } from './task-repository';
import { InMemoryTaskRepository } from './in-memory-task-repository';
import { createTask } from '../domain/task';

describe('TaskRepository port', () => {
  const makeRepo = (): TaskRepository => new InMemoryTaskRepository();

  it('возвращает пустой список при инициализации', async () => {
    const repo = makeRepo();
    expect(await repo.findAll()).toEqual([]);
  });

  it('сохраняет задачу и возвращает её в findAll', async () => {
    const repo = makeRepo();
    const task = createTask('foo');
    await repo.save(task);
    expect(await repo.findAll()).toEqual([task]);
  });

  it('обновляет задачу при повторном save', async () => {
    const repo = makeRepo();
    const task = createTask('foo');
    await repo.save(task);
    const updated = { ...task, status: 'done' as const };
    await repo.save(updated);
    const all = await repo.findAll();
    expect(all).toEqual([updated]);
  });

  it('удаляет задачу по id', async () => {
    const repo = makeRepo();
    const task = createTask('foo');
    await repo.save(task);
    await repo.delete(task.id);
    expect(await repo.findAll()).toEqual([]);
  });

  it('удаление несуществующего id не ломает хранилище', async () => {
    const repo = makeRepo();
    const task = createTask('foo');
    await repo.save(task);
    await repo.delete('non-existent' as typeof task.id);
    expect(await repo.findAll()).toEqual([task]);
  });
});
