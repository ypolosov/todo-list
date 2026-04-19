import { describe, it, expect } from 'vitest';
import { addTask } from './add-task';
import { completeTask } from './complete-task';
import { InMemoryTaskRepository } from './in-memory-task-repository';

describe('completeTask', () => {
  it('переключает active в done', async () => {
    const repo = new InMemoryTaskRepository();
    const task = await addTask(repo, 'foo');
    const updated = await completeTask(repo, task.id);
    expect(updated.status).toBe('done');
    expect((await repo.findAll())[0].status).toBe('done');
  });

  it('переключает done обратно в active', async () => {
    const repo = new InMemoryTaskRepository();
    const task = await addTask(repo, 'foo');
    await completeTask(repo, task.id);
    const reopened = await completeTask(repo, task.id);
    expect(reopened.status).toBe('active');
  });

  it('бросает ошибку для неизвестного id', async () => {
    const repo = new InMemoryTaskRepository();
    await expect(completeTask(repo, 'ghost' as never)).rejects.toThrow();
  });
});
