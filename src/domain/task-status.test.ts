import { describe, it, expect } from 'vitest';
import { TaskStatus, toggleStatus } from './task-status';

describe('task-status', () => {
  it('имеет два допустимых значения: active и done', () => {
    const statuses: TaskStatus[] = ['active', 'done'];
    expect(statuses).toHaveLength(2);
  });

  it('переключает active в done', () => {
    expect(toggleStatus('active')).toBe('done');
  });

  it('переключает done в active', () => {
    expect(toggleStatus('done')).toBe('active');
  });
});
