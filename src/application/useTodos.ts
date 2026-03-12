import { useCallback, useState } from 'react';
import type { Category, Todo } from '../domain/todo';
import { createTodo, validateTitle } from '../domain/todoService';
import type { TodoRepository } from '../infrastructure/todoRepository';

export function useTodos(repository: TodoRepository) {
  const [todos, setTodos] = useState<Todo[]>(() => repository.getAll());

  const persist = useCallback(
    (next: Todo[]) => {
      setTodos(next);
      repository.save(next);
    },
    [repository],
  );

  const addTodo = useCallback(
    (title: string, category: Category) => {
      if (!validateTitle(title)) return;
      const todo = createTodo(title, category);
      persist([todo, ...todos]);
    },
    [todos, persist],
  );

  const updateTodo = useCallback(
    (id: string, updates: Partial<Pick<Todo, 'title' | 'category'>>) => {
      if (updates.title !== undefined && !validateTitle(updates.title)) return;
      persist(todos.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    },
    [todos, persist],
  );

  const deleteTodo = useCallback(
    (id: string) => {
      persist(todos.filter((t) => t.id !== id));
    },
    [todos, persist],
  );

  const toggleTodo = useCallback(
    (id: string) => {
      persist(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    },
    [todos, persist],
  );

  return { todos, addTodo, updateTodo, deleteTodo, toggleTodo };
}
