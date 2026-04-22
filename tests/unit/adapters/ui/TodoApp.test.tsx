import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoApp } from '../../../../src/adapters/ui/TodoApp';
import { AddTaskUseCase } from '../../../../src/application/add-task';
import { ToggleTaskUseCase } from '../../../../src/application/toggle-task';
import { RemoveTaskUseCase } from '../../../../src/application/remove-task';
import { ChangeFilterUseCase } from '../../../../src/application/change-filter';
import { ListTasksQuery } from '../../../../src/application/list-tasks';
import { FakeRepo } from '../../../helpers/fake-repo';

function wire() {
  const repo = new FakeRepo();
  return {
    repo,
    addUC: new AddTaskUseCase(repo),
    toggleUC: new ToggleTaskUseCase(repo),
    removeUC: new RemoveTaskUseCase(repo),
    changeUC: new ChangeFilterUseCase(),
    listQ: new ListTasksQuery(repo),
  };
}

describe('TodoApp', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('adds a task through the input form and shows it in the list', async () => {
    const user = userEvent.setup();
    render(<TodoApp {...wire()} />);
    await user.type(screen.getByPlaceholderText(/new task/i), 'buy milk');
    await user.click(screen.getByRole('button', { name: /^add$/i }));
    expect(screen.getByText('buy milk')).toBeInTheDocument();
  });

  it('toggles a task status via the checkbox', async () => {
    const user = userEvent.setup();
    render(<TodoApp {...wire()} />);
    await user.type(screen.getByPlaceholderText(/new task/i), 'a');
    await user.click(screen.getByRole('button', { name: /^add$/i }));
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('removes a task via the remove button', async () => {
    const user = userEvent.setup();
    render(<TodoApp {...wire()} />);
    await user.type(screen.getByPlaceholderText(/new task/i), 'a');
    await user.click(screen.getByRole('button', { name: /^add$/i }));
    expect(screen.getByText('a')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /^remove$/i }));
    expect(screen.queryByText('a')).not.toBeInTheDocument();
  });

  it('filters tasks by status', async () => {
    const user = userEvent.setup();
    render(<TodoApp {...wire()} />);
    const input = screen.getByPlaceholderText(/new task/i);
    await user.type(input, 'first');
    await user.click(screen.getByRole('button', { name: /^add$/i }));
    await user.type(input, 'second');
    await user.click(screen.getByRole('button', { name: /^add$/i }));
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);
    await user.click(screen.getByRole('button', { name: /^active$/i }));
    expect(screen.queryByText('first')).not.toBeInTheDocument();
    expect(screen.getByText('second')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /^completed$/i }));
    expect(screen.getByText('first')).toBeInTheDocument();
    expect(screen.queryByText('second')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /^all$/i }));
    expect(screen.getByText('first')).toBeInTheDocument();
    expect(screen.getByText('second')).toBeInTheDocument();
  });

  it('shows the empty-state message when no tasks exist', () => {
    render(<TodoApp {...wire()} />);
    expect(screen.getByText(/no tasks/i)).toBeInTheDocument();
  });
});
