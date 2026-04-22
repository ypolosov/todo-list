import { beforeEach, describe, expect, it } from 'vitest';
import { Task, TaskList } from '../../../src/domain';
import { ToggleTask } from '../../../src/application/ToggleTask';
import { InMemoryTaskRepository } from '../../../src/adapters/driven/InMemoryTaskRepository';

describe('application.ToggleTask', () => {
  let repo: InMemoryTaskRepository;

  beforeEach(async () => {
    repo = new InMemoryTaskRepository();
    await repo.save(TaskList.empty().add(Task.create('1', 'a')));
  });

  it('переключает статус и сохраняет список', async () => {
    const useCase = new ToggleTask(repo);
    const list = await useCase.execute('1');
    expect(list.items[0]!.status).toBe('completed');
    const persisted = await repo.load();
    expect(persisted.items[0]!.status).toBe('completed');
  });

  it('возвращает неизменённый список при неизвестном id', async () => {
    const useCase = new ToggleTask(repo);
    const list = await useCase.execute('unknown');
    expect(list.items[0]!.status).toBe('active');
  });
});
