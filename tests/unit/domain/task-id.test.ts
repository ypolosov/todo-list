import { describe, it, expect } from 'vitest';
import { TaskId } from '../../../src/domain/task-id';

describe('TaskId', () => {
  it('generate produces a non-empty identifier', () => {
    const id = TaskId.generate();
    expect(id.toString().length).toBeGreaterThan(0);
  });

  it('generate produces unique identifiers on successive calls', () => {
    const a = TaskId.generate();
    const b = TaskId.generate();
    expect(a.equals(b)).toBe(false);
  });

  it('fromString rejects an empty string', () => {
    expect(() => TaskId.fromString('')).toThrow();
  });

  it('fromString accepts a non-empty string and round-trips toString', () => {
    const id = TaskId.fromString('abc-123');
    expect(id.toString()).toBe('abc-123');
  });

  it('equals returns true for same underlying value and false otherwise', () => {
    const a = TaskId.fromString('x');
    const b = TaskId.fromString('x');
    const c = TaskId.fromString('y');
    expect(a.equals(b)).toBe(true);
    expect(a.equals(c)).toBe(false);
  });
});
