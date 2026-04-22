import { describe, it, expect } from 'vitest';
import { tasksSchema } from '../../../../src/adapters/storage/task-schema';

describe('tasksSchema', () => {
  it('accepts an empty array', () => {
    const result = tasksSchema.safeParse([]);
    expect(result.success).toBe(true);
  });

  it('accepts a well-formed task array', () => {
    const input = [{ id: 'a', title: 'buy milk', status: 'active' }];
    const result = tasksSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('rejects a task with an empty title', () => {
    const input = [{ id: 'a', title: '', status: 'active' }];
    expect(tasksSchema.safeParse(input).success).toBe(false);
  });

  it('rejects a task with an unknown status', () => {
    const input = [{ id: 'a', title: 'buy milk', status: 'unknown' }];
    expect(tasksSchema.safeParse(input).success).toBe(false);
  });

  it('rejects a non-array input', () => {
    expect(tasksSchema.safeParse({ id: 'a' }).success).toBe(false);
  });
});
