import { describe, it, expect } from 'vitest';
import {
  createTodo,
  validateTitle,
  filterByText,
  filterByStatus,
  filterByCategory,
  applyAllFilters,
} from './todoService';
import type { Todo } from './todo';

function makeTodo(overrides: Partial<Todo> = {}): Todo {
  return {
    id: '1',
    title: 'Test task',
    completed: false,
    category: 'work',
    createdAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  };
}

describe('createTodo', () => {
  it('creates a todo with given title and category', () => {
    const todo = createTodo('Buy milk', 'home');
    expect(todo.title).toBe('Buy milk');
    expect(todo.category).toBe('home');
    expect(todo.completed).toBe(false);
    expect(todo.id).toBeTruthy();
    expect(todo.createdAt).toBeTruthy();
  });

  it('trims the title', () => {
    const todo = createTodo('  spaced  ', 'work');
    expect(todo.title).toBe('spaced');
  });

  it('generates unique ids', () => {
    const a = createTodo('A', 'work');
    const b = createTodo('B', 'work');
    expect(a.id).not.toBe(b.id);
  });
});

describe('validateTitle', () => {
  it('returns true for non-empty title', () => {
    expect(validateTitle('Hello')).toBe(true);
  });

  it('returns false for empty string', () => {
    expect(validateTitle('')).toBe(false);
  });

  it('returns false for whitespace-only', () => {
    expect(validateTitle('   ')).toBe(false);
  });
});

describe('filterByText', () => {
  const todos = [
    makeTodo({ id: '1', title: 'Buy groceries' }),
    makeTodo({ id: '2', title: 'Write code' }),
    makeTodo({ id: '3', title: 'Buy flowers' }),
  ];

  it('returns all when query is empty', () => {
    expect(filterByText(todos, '')).toHaveLength(3);
  });

  it('filters by substring case-insensitive', () => {
    const result = filterByText(todos, 'buy');
    expect(result).toHaveLength(2);
    expect(result.map((t) => t.id)).toEqual(['1', '3']);
  });

  it('returns empty for no match', () => {
    expect(filterByText(todos, 'xyz')).toHaveLength(0);
  });
});

describe('filterByStatus', () => {
  const todos = [
    makeTodo({ id: '1', completed: false }),
    makeTodo({ id: '2', completed: true }),
    makeTodo({ id: '3', completed: false }),
  ];

  it('returns all for "all"', () => {
    expect(filterByStatus(todos, 'all')).toHaveLength(3);
  });

  it('returns active only', () => {
    const result = filterByStatus(todos, 'active');
    expect(result).toHaveLength(2);
    expect(result.every((t) => !t.completed)).toBe(true);
  });

  it('returns completed only', () => {
    const result = filterByStatus(todos, 'completed');
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe('2');
  });
});

describe('filterByCategory', () => {
  const todos = [
    makeTodo({ id: '1', category: 'work' }),
    makeTodo({ id: '2', category: 'home' }),
    makeTodo({ id: '3', category: 'work' }),
  ];

  it('returns all for "all"', () => {
    expect(filterByCategory(todos, 'all')).toHaveLength(3);
  });

  it('filters by work', () => {
    expect(filterByCategory(todos, 'work')).toHaveLength(2);
  });

  it('filters by home', () => {
    expect(filterByCategory(todos, 'home')).toHaveLength(1);
  });
});

describe('applyAllFilters', () => {
  const todos = [
    makeTodo({ id: '1', title: 'Work task', category: 'work', completed: false }),
    makeTodo({ id: '2', title: 'Home task', category: 'home', completed: true }),
    makeTodo({ id: '3', title: 'Work done', category: 'work', completed: true }),
    makeTodo({ id: '4', title: 'Home active', category: 'home', completed: false }),
  ];

  it('applies all filters combined', () => {
    const result = applyAllFilters(todos, {
      search: 'work',
      status: 'active',
      category: 'work',
    });
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe('1');
  });

  it('returns all with default filters', () => {
    const result = applyAllFilters(todos, {
      search: '',
      status: 'all',
      category: 'all',
    });
    expect(result).toHaveLength(4);
  });
});
