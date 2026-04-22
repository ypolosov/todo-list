import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskItem } from '../../../../src/adapters/ui/TaskItem';
import { Task } from '../../../../src/domain/task';
import { TaskId } from '../../../../src/domain/task-id';

const activeTask = () => Task.create(TaskId.fromString('a'), 'buy milk');
const completedTask = () => Task.rehydrate(TaskId.fromString('b'), 'done item', 'completed');

describe('TaskItem', () => {
  it('shows the task title', () => {
    render(<TaskItem task={activeTask()} onToggle={vi.fn()} onRemove={vi.fn()} />);
    expect(screen.getByText('buy milk')).toBeInTheDocument();
  });

  it('reflects active status with unchecked checkbox', () => {
    render(<TaskItem task={activeTask()} onToggle={vi.fn()} onRemove={vi.fn()} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('reflects completed status with checked checkbox', () => {
    render(<TaskItem task={completedTask()} onToggle={vi.fn()} onRemove={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('invokes onToggle with the task id when the checkbox is clicked', async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();
    const t = activeTask();
    render(<TaskItem task={t} onToggle={onToggle} onRemove={vi.fn()} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle.mock.calls[0][0].equals(t.id)).toBe(true);
  });

  it('invokes onRemove with the task id when the remove button is clicked', async () => {
    const onRemove = vi.fn();
    const user = userEvent.setup();
    const t = activeTask();
    render(<TaskItem task={t} onToggle={vi.fn()} onRemove={onRemove} />);
    await user.click(screen.getByRole('button', { name: /remove/i }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove.mock.calls[0][0].equals(t.id)).toBe(true);
  });
});
