import { describe, it, expect } from 'vitest';
import { RemoveTaskUseCase } from '../../../src/application/remove-task';
import { Task } from '../../../src/domain/task';
import { TaskId } from '../../../src/domain/task-id';
import { TaskNotFoundError } from '../../../src/domain/todo-list';
import { FakeRepo } from '../../helpers/fake-repo';

describe('RemoveTaskUseCase', () => {
  it('removes the referenced task from the repository', () => {
    const a = TaskId.fromString('a');
    const b = TaskId.fromString('b');
    const repo = new FakeRepo();
    repo.seed([Task.create(a, 'a'), Task.create(b, 'b')]);
    new RemoveTaskUseCase(repo).execute(a);
    const saved = repo.load();
    expect(saved).toHaveLength(1);
    expect(saved[0].id.equals(b)).toBe(true);
  });

  it('throws TaskNotFoundError when id is unknown', () => {
    const repo = new FakeRepo();
    const useCase = new RemoveTaskUseCase(repo);
    expect(() => useCase.execute(TaskId.fromString('missing'))).toThrow(TaskNotFoundError);
  });
});
