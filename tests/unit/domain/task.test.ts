import { describe, it, expect } from 'vitest';
import { Task } from '../../../src/domain/task';
import { TaskId } from '../../../src/domain/task-id';

const id = () => TaskId.generate();

describe('Task', () => {
  it('creates with title and default active status', () => {
    const t = Task.create(id(), 'buy milk');
    expect(t.title).toBe('buy milk');
    expect(t.status).toBe('active');
  });

  it('rejects an empty title', () => {
    expect(() => Task.create(id(), '')).toThrow();
  });

  it('rejects a title longer than 200 characters', () => {
    const long = 'x'.repeat(201);
    expect(() => Task.create(id(), long)).toThrow();
  });

  it('trims surrounding whitespace in title', () => {
    const t = Task.create(id(), '  buy milk  ');
    expect(t.title).toBe('buy milk');
  });

  it('toggle returns a new Task with flipped status', () => {
    const a = Task.create(id(), 'a');
    const b = a.toggle();
    expect(b.status).toBe('completed');
    expect(a.status).toBe('active');
    expect(b.id.equals(a.id)).toBe(true);
  });

  it('toggle is an involution', () => {
    const a = Task.create(id(), 'a');
    const b = a.toggle().toggle();
    expect(b.status).toBe('active');
  });

  it('rehydrate accepts explicit status and preserves identity', () => {
    const i = id();
    const t = Task.rehydrate(i, 'done item', 'completed');
    expect(t.id.equals(i)).toBe(true);
    expect(t.status).toBe('completed');
  });
});
