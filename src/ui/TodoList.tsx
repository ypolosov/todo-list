import type { Todo } from '../domain/todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Todo, 'title' | 'category'>>) => void;
}

export function TodoList({ todos, onToggle, onDelete, onUpdate }: Props) {
  if (todos.length === 0) {
    return <p className="empty-message">Задачи не найдены</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
