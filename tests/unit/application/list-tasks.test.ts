import { describe, it, expect } from 'vitest';
import { ListTasksQuery } from '../../../src/application/list-tasks';
import { Task } from '../../../src/domain/task';
import { TaskId } from '../../../src/domain/task-id';
import { Filter } from '../../../src/domain/filter';
import { FakeRepo } from '../../helpers/fake-repo';

function seedMixed(repo: FakeRepo): { activeId: TaskId; completedId: TaskId } {
  const activeId = TaskId.fromString('a');
  const completedId = TaskId.fromString('c');
  const activeTask = Task.create(activeId, 'a');
  const completedTask = Task.rehydrate(completedId, 'c', 'completed');
  repo.seed([activeTask, completedTask]);
  return { activeId, completedId };
}

describe('ListTasksQuery', () => {
  it('returns all tasks when filter is "all"', () => {
    const repo = new FakeRepo();
    seedMixed(repo);
    const result = new ListTasksQuery(repo).execute(Filter.fromString('all'));
    expect(result).toHaveLength(2);
  });

  it('returns only active tasks when filter is "active"', () => {
    const repo = new FakeRepo();
    const { activeId } = seedMixed(repo);
    const result = new ListTasksQuery(repo).execute(Filter.fromString('active'));
    expect(result).toHaveLength(1);
    expect(result[0].id.equals(activeId)).toBe(true);
  });

  it('returns only completed tasks when filter is "completed"', () => {
    const repo = new FakeRepo();
    const { completedId } = seedMixed(repo);
    const result = new ListTasksQuery(repo).execute(Filter.fromString('completed'));
    expect(result).toHaveLength(1);
    expect(result[0].id.equals(completedId)).toBe(true);
  });

  it('returns an empty array on an empty repository', () => {
    const repo = new FakeRepo();
    expect(new ListTasksQuery(repo).execute(Filter.default())).toHaveLength(0);
  });
});
