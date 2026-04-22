import { beforeEach, describe, expect, it } from 'vitest';
import { Task, TaskList } from '../../../src/domain';
import { AddTask } from '../../../src/application/AddTask';
import { InMemoryTaskRepository } from '../../../src/adapters/driven/InMemoryTaskRepository';

describe('application.AddTask', () => {
  let repo: InMemoryTaskRepository;

  beforeEach(() => {
    repo = new InMemoryTaskRepository();
  });

  it('сохраняет новую активную задачу в репозитории', async () => {
    const useCase = new AddTask(repo, () => 'fixed-id');
    const list = await useCase.execute('купить хлеб');

    expect(list.items).toHaveLength(1);
    expect(list.items[0]!.id).toBe('fixed-id');
    expect(list.items[0]!.title).toBe('купить хлеб');
    expect(list.items[0]!.status).toBe('active');

    const persisted = await repo.load();
    expect(persisted.items.map((t) => t.id)).toEqual(['fixed-id']);
  });

  it('генерирует уникальные id через переданный генератор', async () => {
    let counter = 0;
    const useCase = new AddTask(repo, () => `id-${++counter}`);
    await useCase.execute('a');
    const list = await useCase.execute('b');
    expect(list.items.map((t) => t.id)).toEqual(['id-1', 'id-2']);
  });

  it('пробрасывает исключение при пустом названии', async () => {
    const useCase = new AddTask(repo, () => 'x');
    await expect(useCase.execute('   ')).rejects.toThrow('Task title must not be empty');
  });

  it('сохраняет поверх существующих задач', async () => {
    await repo.save(TaskList.empty().add(Task.create('old', 'old')));
    const useCase = new AddTask(repo, () => 'new');
    const list = await useCase.execute('new task');
    expect(list.items.map((t) => t.id)).toEqual(['old', 'new']);
  });
});
