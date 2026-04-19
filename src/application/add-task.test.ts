import { describe, it, expect } from 'vitest';
import { addTask } from './add-task';
import { InMemoryTaskRepository } from './in-memory-task-repository';

describe('addTask', () => {
  it('сохраняет новую активную задачу с заданным текстом', async () => {
    const repo = new InMemoryTaskRepository();
    const created = await addTask(repo, 'hello');
    expect(created.text).toBe('hello');
    expect(created.status).toBe('active');
    const all = await repo.findAll();
    expect(all).toEqual([created]);
  });

  it('отклоняет пустой текст и ничего не сохраняет', async () => {
    const repo = new InMemoryTaskRepository();
    await expect(addTask(repo, '')).rejects.toThrow();
    expect(await repo.findAll()).toEqual([]);
  });

  it('обрезает пробелы в тексте', async () => {
    const repo = new InMemoryTaskRepository();
    const created = await addTask(repo, '  foo  ');
    expect(created.text).toBe('foo');
  });
});
