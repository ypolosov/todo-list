import { useState } from 'react';
import type { Category, Todo } from '../domain/todo';
import { CATEGORIES, CATEGORY_LABELS, isCategory } from '../domain/todo';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Todo, 'title' | 'category'>>) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editCategory, setEditCategory] = useState<Category>(todo.category);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onUpdate(todo.id, { title: editTitle, category: editCategory });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditCategory(todo.category);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  if (editing) {
    return (
      <li className="todo-item editing">
        <input
          type="text"
          className="todo-edit-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <select
          className="category-select"
          value={editCategory}
          onChange={(e) => {
            if (isCategory(e.target.value)) setEditCategory(e.target.value);
          }}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
          ))}
        </select>
        <button className="btn btn-save" onClick={handleSave}>Сохранить</button>
        <button className="btn btn-cancel" onClick={handleCancel}>Отмена</button>
      </li>
    );
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className="todo-title">{todo.title}</span>
      <span className={`todo-category category-${todo.category}`}>
        {CATEGORY_LABELS[todo.category]}
      </span>
      <div className="todo-actions">
        <button className="btn btn-edit" onClick={() => setEditing(true)}>Изменить</button>
        <button className="btn btn-delete" onClick={() => onDelete(todo.id)}>Удалить</button>
      </div>
    </li>
  );
}
