import { describe, it, expect } from 'vitest';
import { AddTaskUseCase } from '../../../src/application/add-task';
import { TaskId } from '../../../src/domain/task-id';
import { FakeRepo } from '../../helpers/fake-repo';

const fixedId = TaskId.fromString('fixed-1');

describe('AddTaskUseCase', () => {
  it('persists a new active task with the given title', () => {
    const repo = new FakeRepo();
    const useCase = new AddTaskUseCase(repo, () => fixedId);
    useCase.execute('buy milk');
    const saved = repo.load();
    expect(saved).toHaveLength(1);
    expect(saved[0].title).toBe('buy milk');
    expect(saved[0].status).toBe('active');
    expect(saved[0].id.equals(fixedId)).toBe(true);
  });

  it('preserves existing tasks', () => {
    const repo = new FakeRepo();
    const first = new AddTaskUseCase(repo, () => TaskId.fromString('a'));
    first.execute('a');
    const second = new AddTaskUseCase(repo, () => TaskId.fromString('b'));
    second.execute('b');
    expect(repo.load()).toHaveLength(2);
  });

  it('rejects an empty title', () => {
    const repo = new FakeRepo();
    const useCase = new AddTaskUseCase(repo, () => fixedId);
    expect(() => useCase.execute('')).toThrow();
    expect(repo.load()).toHaveLength(0);
  });

  it('uses the default id factory when none provided', () => {
    const repo = new FakeRepo();
    const useCase = new AddTaskUseCase(repo);
    useCase.execute('buy milk');
    expect(repo.load()[0].id.toString().length).toBeGreaterThan(0);
  });
});
