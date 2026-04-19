import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskForm } from './task-form';

describe('TaskForm', () => {
  it('вызывает onSubmit с введённым текстом', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);
    await user.type(screen.getByRole('textbox'), 'купить хлеб');
    await user.click(screen.getByRole('button', { name: /добавить/i }));
    expect(onSubmit).toHaveBeenCalledWith('купить хлеб');
  });

  it('очищает поле после отправки', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await user.type(input, 'foo');
    await user.click(screen.getByRole('button', { name: /добавить/i }));
    expect(input.value).toBe('');
  });

  it('не вызывает onSubmit при пустом тексте', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);
    await user.click(screen.getByRole('button', { name: /добавить/i }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
