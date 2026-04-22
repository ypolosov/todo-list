import { useState, type FormEvent } from 'react';

interface Props {
  onAdd: (title: string) => void;
}

export function TaskInput({ onAdd }: Props): JSX.Element {
  const [value, setValue] = useState('');

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      return;
    }
    onAdd(trimmed);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="new task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">add</button>
    </form>
  );
}
