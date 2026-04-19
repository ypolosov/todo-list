import { describe, it, expect } from 'vitest';
import { InMemoryTaskRepository } from './in-memory-task-repository';
import { createTask } from '../domain/task';

describe('InMemoryTaskRepository', () => {
  it('изолирует состояние между экземплярами', async () => {
    const a = new InMemoryTaskRepository();
    const b = new InMemoryTaskRepository();
    await a.save(createTask('foo'));
    expect(await b.findAll()).toEqual([]);
  });
});
