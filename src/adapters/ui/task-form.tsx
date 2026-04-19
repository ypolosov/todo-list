import { FormEvent, useState } from 'react';

export interface TaskFormProps {
  onSubmit: (text: string) => void;
}

export const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Что нужно сделать?"
        aria-label="Текст задачи"
      />
      <button type="submit">Добавить</button>
    </form>
  );
};
