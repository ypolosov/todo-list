import type { Todo } from '../domain/todo';

export interface TodoRepository {
  getAll(): Todo[];
  save(todos: Todo[]): void;
}
