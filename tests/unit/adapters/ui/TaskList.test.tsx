import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskList } from '../../../../src/adapters/ui/TaskList';
import { Task } from '../../../../src/domain/task';
import { TaskId } from '../../../../src/domain/task-id';

describe('TaskList', () => {
  it('renders an empty-state message when there are no tasks', () => {
    render(<TaskList tasks={[]} onToggle={vi.fn()} onRemove={vi.fn()} />);
    expect(screen.getByText(/no tasks/i)).toBeInTheDocument();
  });

  it('renders a list item per task', () => {
    const tasks = [
      Task.create(TaskId.fromString('a'), 'first'),
      Task.create(TaskId.fromString('b'), 'second'),
    ];
    render(<TaskList tasks={tasks} onToggle={vi.fn()} onRemove={vi.fn()} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('first')).toBeInTheDocument();
    expect(screen.getByText('second')).toBeInTheDocument();
  });
});
