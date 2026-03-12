import type { Todo } from '../domain/todo';
import type { TodoRepository } from '../domain/todoRepository';

const STORAGE_KEY = 'todo-list-data';

export class LocalStorageRepository implements TodoRepository {
  getAll(): Todo[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as Todo[];
    } catch {
      return [];
    }
  }

  save(todos: Todo[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
}
