import { describe, it, expect } from 'vitest';
import { ToggleTaskUseCase } from '../../../src/application/toggle-task';
import { Task } from '../../../src/domain/task';
import { TaskId } from '../../../src/domain/task-id';
import { TaskNotFoundError } from '../../../src/domain/todo-list';
import { FakeRepo } from '../../helpers/fake-repo';

describe('ToggleTaskUseCase', () => {
  it('flips the status of the referenced task from active to completed', () => {
    const id = TaskId.fromString('t-1');
    const repo = new FakeRepo();
    repo.seed([Task.create(id, 'a')]);
    new ToggleTaskUseCase(repo).execute(id);
    expect(repo.load()[0].status).toBe('completed');
  });

  it('flips the status back to active on second call', () => {
    const id = TaskId.fromString('t-1');
    const repo = new FakeRepo();
    repo.seed([Task.create(id, 'a')]);
    const useCase = new ToggleTaskUseCase(repo);
    useCase.execute(id);
    useCase.execute(id);
    expect(repo.load()[0].status).toBe('active');
  });

  it('throws TaskNotFoundError when id is unknown', () => {
    const repo = new FakeRepo();
    const useCase = new ToggleTaskUseCase(repo);
    expect(() => useCase.execute(TaskId.fromString('missing'))).toThrow(TaskNotFoundError);
  });
});
