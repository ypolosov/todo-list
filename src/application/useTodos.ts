import { useCallback, useState } from 'react';
import type { Category, Todo } from '../domain/todo';
import { createTodo, validateTitle } from '../domain/todoService';
import type { TodoRepository } from '../domain/todoRepository';

export function useTodos(repository: TodoRepository) {
  const [todos, setTodos] = useState<Todo[]>(() => repository.getAll());

  const persist = useCallback(
    (updater: (prev: Todo[]) => Todo[]) => {
      setTodos((prev) => {
        const next = updater(prev);
        repository.save(next);
        return next;
      });
    },
    [repository],
  );

  const addTodo = useCallback(
    (title: string, category: Category) => {
      if (!validateTitle(title)) return;
      const todo = createTodo(title, category);
      persist((prev) => [todo, ...prev]);
    },
    [persist],
  );

  const updateTodo = useCallback(
    (id: string, updates: Partial<Pick<Todo, 'title' | 'category'>>) => {
      if (updates.title !== undefined && !validateTitle(updates.title)) return;
      persist((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    },
    [persist],
  );

  const deleteTodo = useCallback(
    (id: string) => {
      persist((prev) => prev.filter((t) => t.id !== id));
    },
    [persist],
  );

  const toggleTodo = useCallback(
    (id: string) => {
      persist((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    },
    [persist],
  );

  return { todos, addTodo, updateTodo, deleteTodo, toggleTodo };
}
