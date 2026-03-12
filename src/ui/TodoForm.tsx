import { useState } from 'react';
import type { Category } from '../domain/todo';

interface Props {
  onAdd: (title: string, category: Category) => void;
}

export function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('work');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, category);
    setTitle('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Новая задача..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <select
        className="category-select"
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
      >
        <option value="work">Работа</option>
        <option value="home">Дом</option>
      </select>
      <button type="submit" className="btn btn-add">
        Добавить
      </button>
    </form>
  );
}
