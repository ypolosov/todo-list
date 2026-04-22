import { describe, expect, it } from 'vitest';
import { Task, TaskList } from '../../../src/domain';
import { ListTasks } from '../../../src/application/ListTasks';
import { InMemoryTaskRepository } from '../../../src/adapters/driven/InMemoryTaskRepository';

describe('application.ListTasks', () => {
  it('возвращает текущий список из репозитория', async () => {
    const repo = new InMemoryTaskRepository();
    await repo.save(TaskList.empty().add(Task.create('1', 'a')).add(Task.create('2', 'b')));
    const useCase = new ListTasks(repo);
    const list = await useCase.execute();
    expect(list.items.map((t) => t.id)).toEqual(['1', '2']);
  });

  it('возвращает пустой список, если репозиторий пуст', async () => {
    const useCase = new ListTasks(new InMemoryTaskRepository());
    const list = await useCase.execute();
    expect(list.items).toEqual([]);
  });
});
