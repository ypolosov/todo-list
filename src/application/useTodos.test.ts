import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTodos } from './useTodos';
import type { Todo } from '../domain/todo';
import type { TodoRepository } from '../domain/todoRepository';

function createInMemoryRepository(initial: Todo[] = []): TodoRepository {
  let data = [...initial];
  return {
    getAll: () => [...data],
    save: (todos: Todo[]) => { data = [...todos]; },
  };
}

describe('useTodos', () => {
  it('initializes from repository', () => {
    const todo: Todo = {
      id: '1', title: 'Existing', completed: false, category: 'work',
      createdAt: '2026-01-01T00:00:00.000Z',
    };
    const repo = createInMemoryRepository([todo]);
    const { result } = renderHook(() => useTodos(repo));

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0]!.title).toBe('Existing');
  });

  it('adds a todo and persists', () => {
    const repo = createInMemoryRepository();
    const { result } = renderHook(() => useTodos(repo));

    act(() => result.current.addTodo('New task', 'work'));

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0]!.title).toBe('New task');
    expect(repo.getAll()).toHaveLength(1);
  });

  it('does not add todo with empty title', () => {
    const repo = createInMemoryRepository();
    const { result } = renderHook(() => useTodos(repo));

    act(() => result.current.addTodo('', 'work'));
    act(() => result.current.addTodo('   ', 'home'));

    expect(result.current.todos).toHaveLength(0);
  });

  it('toggles a todo', () => {
    const todo: Todo = {
      id: '1', title: 'Task', completed: false, category: 'work',
      createdAt: '2026-01-01T00:00:00.000Z',
    };
    const repo = createInMemoryRepository([todo]);
    const { result } = renderHook(() => useTodos(repo));

    act(() => result.current.toggleTodo('1'));
    expect(result.current.todos[0]!.completed).toBe(true);

    act(() => result.current.toggleTodo('1'));
    expect(result.current.todos[0]!.completed).toBe(false);
  });

  it('deletes a todo', () => {
    const todo: Todo = {
      id: '1', title: 'Task', completed: false, category: 'work',
      createdAt: '2026-01-01T00:00:00.000Z',
    };
    const repo = createInMemoryRepository([todo]);
    const { result } = renderHook(() => useTodos(repo));

    act(() => result.current.deleteTodo('1'));
    expect(result.current.todos).toHaveLength(0);
    expect(repo.getAll()).toHaveLength(0);
  });

  it('updates a todo', () => {
    const todo: Todo = {
      id: '1', title: 'Old', completed: false, category: 'work',
      createdAt: '2026-01-01T00:00:00.000Z',
    };
    const repo = createInMemoryRepository([todo]);
    const { result } = renderHook(() => useTodos(repo));

    act(() => result.current.updateTodo('1', { title: 'New', category: 'home' }));
    expect(result.current.todos[0]!.title).toBe('New');
    expect(result.current.todos[0]!.category).toBe('home');
  });

  it('does not update with empty title', () => {
    const todo: Todo = {
      id: '1', title: 'Keep', completed: false, category: 'work',
      createdAt: '2026-01-01T00:00:00.000Z',
    };
    const repo = createInMemoryRepository([todo]);
    const { result } = renderHook(() => useTodos(repo));

    act(() => result.current.updateTodo('1', { title: '' }));
    expect(result.current.todos[0]!.title).toBe('Keep');
  });

  it('handles rapid sequential adds without data loss', () => {
    const repo = createInMemoryRepository();
    const { result } = renderHook(() => useTodos(repo));

    act(() => {
      result.current.addTodo('First', 'work');
      result.current.addTodo('Second', 'home');
    });

    expect(result.current.todos).toHaveLength(2);
    expect(repo.getAll()).toHaveLength(2);
  });
});
