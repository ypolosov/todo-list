import { describe, it, expect } from 'vitest';
import { addTask } from './add-task';
import { listTasks } from './list-tasks';
import { InMemoryTaskRepository } from './in-memory-task-repository';

describe('listTasks', () => {
  it('возвращает все задачи', async () => {
    const repo = new InMemoryTaskRepository();
    await addTask(repo, 'a');
    await addTask(repo, 'b');
    expect(await listTasks(repo)).toHaveLength(2);
  });

  it('возвращает пустой список для пустого репозитория', async () => {
    const repo = new InMemoryTaskRepository();
    expect(await listTasks(repo)).toEqual([]);
  });
});
