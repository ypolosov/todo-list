import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskItem } from './task-item';
import { createTask, complete } from '../../domain/task';

describe('TaskItem', () => {
  it('показывает текст задачи', () => {
    const task = createTask('foo');
    render(<TaskItem task={task} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('foo')).toBeInTheDocument();
  });

  it('вызывает onToggle с id задачи при клике на чекбокс', async () => {
    const user = userEvent.setup();
    const task = createTask('foo');
    const onToggle = vi.fn();
    render(<TaskItem task={task} onToggle={onToggle} onDelete={vi.fn()} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(task.id);
  });

  it('вызывает onDelete с id задачи при клике на кнопку', async () => {
    const user = userEvent.setup();
    const task = createTask('foo');
    const onDelete = vi.fn();
    render(<TaskItem task={task} onToggle={vi.fn()} onDelete={onDelete} />);
    await user.click(screen.getByRole('button', { name: /удалить/i }));
    expect(onDelete).toHaveBeenCalledWith(task.id);
  });

  it('отмечает выполненную задачу визуально', () => {
    const task = complete(createTask('foo'));
    render(<TaskItem task={task} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
