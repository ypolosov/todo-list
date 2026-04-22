import { describe, it, expect } from 'vitest';
import { TodoList, TaskNotFoundError } from '../../../src/domain/todo-list';
import { Task } from '../../../src/domain/task';
import { TaskId } from '../../../src/domain/task-id';
import { Filter } from '../../../src/domain/filter';

const id = () => TaskId.generate();

describe('TodoList', () => {
  it('empty contains no tasks', () => {
    expect(TodoList.empty().tasks).toHaveLength(0);
  });

  it('add appends a new active task', () => {
    const list = TodoList.empty().add(id(), 'buy milk');
    expect(list.tasks).toHaveLength(1);
    expect(list.tasks[0].title).toBe('buy milk');
    expect(list.tasks[0].status).toBe('active');
  });

  it('add preserves previous tasks', () => {
    const first = TodoList.empty().add(id(), 'a');
    const second = first.add(id(), 'b');
    expect(second.tasks).toHaveLength(2);
    expect(first.tasks).toHaveLength(1);
  });

  it('toggle flips the status of the referenced task', () => {
    const taskId = id();
    const list = TodoList.empty().add(taskId, 'a').toggle(taskId);
    expect(list.tasks[0].status).toBe('completed');
  });

  it('toggle throws TaskNotFoundError for unknown id', () => {
    expect(() => TodoList.empty().toggle(id())).toThrow(TaskNotFoundError);
  });

  it('remove deletes the referenced task', () => {
    const a = id();
    const b = id();
    const list = TodoList.empty().add(a, 'a').add(b, 'b').remove(a);
    expect(list.tasks).toHaveLength(1);
    expect(list.tasks[0].id.equals(b)).toBe(true);
  });

  it('remove throws TaskNotFoundError for unknown id', () => {
    expect(() => TodoList.empty().remove(id())).toThrow(TaskNotFoundError);
  });

  it('list with "all" returns every task', () => {
    const list = TodoList.empty().add(id(), 'a').add(id(), 'b');
    expect(list.list(Filter.fromString('all'))).toHaveLength(2);
  });

  it('list with "active" returns only active tasks', () => {
    const toToggle = id();
    const list = TodoList.empty().add(id(), 'a').add(toToggle, 'b').toggle(toToggle);
    const active = list.list(Filter.fromString('active'));
    expect(active).toHaveLength(1);
    expect(active[0].title).toBe('a');
  });

  it('list with "completed" returns only completed tasks', () => {
    const toToggle = id();
    const list = TodoList.empty().add(id(), 'a').add(toToggle, 'b').toggle(toToggle);
    const completed = list.list(Filter.fromString('completed'));
    expect(completed).toHaveLength(1);
    expect(completed[0].title).toBe('b');
  });

  it('rehydrate reconstructs the list from given tasks', () => {
    const taskA = Task.create(id(), 'a');
    const list = TodoList.rehydrate([taskA]);
    expect(list.tasks).toHaveLength(1);
    expect(list.tasks[0].title).toBe('a');
  });
});
