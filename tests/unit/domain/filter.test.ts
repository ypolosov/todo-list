import { describe, it, expect } from 'vitest';
import { Filter } from '../../../src/domain/filter';

describe('Filter', () => {
  it('fromString accepts "active"', () => {
    const f = Filter.fromString('active');
    expect(f.value).toBe('active');
  });

  it('fromString accepts "completed"', () => {
    const f = Filter.fromString('completed');
    expect(f.value).toBe('completed');
  });

  it('fromString accepts "all"', () => {
    const f = Filter.fromString('all');
    expect(f.value).toBe('all');
  });

  it('fromString rejects unknown values', () => {
    expect(() => Filter.fromString('foo')).toThrow();
    expect(() => Filter.fromString('')).toThrow();
  });

  it('default returns the "all" filter', () => {
    expect(Filter.default().value).toBe('all');
  });

  it('equals compares by value', () => {
    expect(Filter.fromString('active').equals(Filter.fromString('active'))).toBe(true);
    expect(Filter.fromString('active').equals(Filter.fromString('completed'))).toBe(false);
  });

  it('matches returns true for "all" regardless of status', () => {
    const f = Filter.fromString('all');
    expect(f.matches('active')).toBe(true);
    expect(f.matches('completed')).toBe(true);
  });

  it('matches returns true only for the matching status', () => {
    const active = Filter.fromString('active');
    expect(active.matches('active')).toBe(true);
    expect(active.matches('completed')).toBe(false);

    const completed = Filter.fromString('completed');
    expect(completed.matches('completed')).toBe(true);
    expect(completed.matches('active')).toBe(false);
  });
});
