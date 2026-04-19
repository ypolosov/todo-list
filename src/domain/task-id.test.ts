import { describe, it, expect } from 'vitest';
import { createTaskId, isTaskId } from './task-id';

describe('task-id', () => {
  it('создаёт непустую строку-идентификатор', () => {
    const id = createTaskId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('генерирует уникальные идентификаторы', () => {
    const ids = new Set(Array.from({ length: 100 }, createTaskId));
    expect(ids.size).toBe(100);
  });

  it('принимает свои идентификаторы за валидные', () => {
    const id = createTaskId();
    expect(isTaskId(id)).toBe(true);
  });

  it('отвергает пустую строку как идентификатор', () => {
    expect(isTaskId('')).toBe(false);
  });
});
