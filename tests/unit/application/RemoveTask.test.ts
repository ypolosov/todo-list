import { beforeEach, describe, expect, it } from 'vitest';
import { Task, TaskList } from '../../../src/domain';
import { RemoveTask } from '../../../src/application/RemoveTask';
import { InMemoryTaskRepository } from '../../../src/adapters/driven/InMemoryTaskRepository';

describe('application.RemoveTask', () => {
  let repo: InMemoryTaskRepository;

  beforeEach(async () => {
    repo = new InMemoryTaskRepository();
    await repo.save(TaskList.empty().add(Task.create('1', 'a')).add(Task.create('2', 'b')));
  });

  it('удаляет задачу по id и сохраняет', async () => {
    const useCase = new RemoveTask(repo);
    const list = await useCase.execute('1');
    expect(list.items.map((t) => t.id)).toEqual(['2']);
    const persisted = await repo.load();
    expect(persisted.items.map((t) => t.id)).toEqual(['2']);
  });

  it('не трогает список и не вызывает save при неизвестном id', async () => {
    const useCase = new RemoveTask(repo);
    const list = await useCase.execute('unknown');
    expect(list.items.map((t) => t.id)).toEqual(['1', '2']);
  });
});
