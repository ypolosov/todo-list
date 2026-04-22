import { beforeEach, describe, expect, it } from 'vitest';
import { Task, TaskList } from '../../../src/domain';
import { FilterTasks } from '../../../src/application/FilterTasks';
import { InMemoryTaskRepository } from '../../../src/adapters/driven/InMemoryTaskRepository';

describe('application.FilterTasks', () => {
  let repo: InMemoryTaskRepository;

  beforeEach(async () => {
    repo = new InMemoryTaskRepository();
    await repo.save(
      TaskList.empty().add(Task.create('1', 'a')).add(Task.create('2', 'b')).toggle('2'),
    );
  });

  it('active возвращает только активные задачи', async () => {
    const items = await new FilterTasks(repo).execute('active');
    expect(items.map((t) => t.id)).toEqual(['1']);
  });

  it('completed возвращает только завершённые задачи', async () => {
    const items = await new FilterTasks(repo).execute('completed');
    expect(items.map((t) => t.id)).toEqual(['2']);
  });

  it('all возвращает все задачи', async () => {
    const items = await new FilterTasks(repo).execute('all');
    expect(items.map((t) => t.id)).toEqual(['1', '2']);
  });
});
