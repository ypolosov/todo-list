import { describe, it, expect } from 'vitest';
import { addTask } from './add-task';
import { deleteTask } from './delete-task';
import { InMemoryTaskRepository } from './in-memory-task-repository';

describe('deleteTask', () => {
  it('удаляет задачу по id', async () => {
    const repo = new InMemoryTaskRepository();
    const task = await addTask(repo, 'foo');
    await deleteTask(repo, task.id);
    expect(await repo.findAll()).toEqual([]);
  });

  it('не затрагивает другие задачи', async () => {
    const repo = new InMemoryTaskRepository();
    const a = await addTask(repo, 'a');
    const b = await addTask(repo, 'b');
    await deleteTask(repo, a.id);
    const all = await repo.findAll();
    expect(all).toEqual([b]);
  });

  it('молча игнорирует несуществующий id', async () => {
    const repo = new InMemoryTaskRepository();
    const task = await addTask(repo, 'foo');
    await deleteTask(repo, 'ghost' as never);
    expect(await repo.findAll()).toEqual([task]);
  });
});
