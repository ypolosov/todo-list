import { describe, it, expect } from 'vitest';
import { filterTasks, Filter } from './filter-tasks';
import { createTask, complete } from '../domain/task';

describe('filterTasks', () => {
  const a = createTask('active-1');
  const b = complete(createTask('done-1'));
  const c = createTask('active-2');
  const tasks = [a, b, c];

  it('all возвращает все задачи', () => {
    expect(filterTasks(tasks, 'all')).toEqual(tasks);
  });

  it('active возвращает только активные', () => {
    expect(filterTasks(tasks, 'active')).toEqual([a, c]);
  });

  it('done возвращает только выполненные', () => {
    expect(filterTasks(tasks, 'done')).toEqual([b]);
  });

  it('пустой список фильтруется в пустой', () => {
    const filters: Filter[] = ['all', 'active', 'done'];
    for (const f of filters) {
      expect(filterTasks([], f)).toEqual([]);
    }
  });
});
