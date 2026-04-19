import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './app';
import { InMemoryTaskRepository } from '../../application/in-memory-task-repository';

const setup = () => {
  const repo = new InMemoryTaskRepository();
  render(<App repository={repo} />);
  return { repo };
};

describe('App', () => {
  it('показывает заголовок', async () => {
    setup();
    expect(await screen.findByRole('heading', { name: /todo/i })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Список пуст')).toBeInTheDocument());
  });

  it('сквозной поток: добавить, отметить, отфильтровать, удалить', async () => {
    const user = userEvent.setup();
    setup();

    await user.type(screen.getByRole('textbox'), 'первая');
    await user.click(screen.getByRole('button', { name: /добавить/i }));
    await waitFor(() => expect(screen.getByText('первая')).toBeInTheDocument());

    await user.type(screen.getByRole('textbox'), 'вторая');
    await user.click(screen.getByRole('button', { name: /добавить/i }));
    await waitFor(() => expect(screen.getByText('вторая')).toBeInTheDocument());

    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    await user.click(firstCheckbox);
    await waitFor(() => expect(firstCheckbox).toBeChecked());

    await user.click(screen.getByRole('button', { name: /^активные/i }));
    await waitFor(() => {
      expect(screen.queryByText('первая')).toBeNull();
      expect(screen.getByText('вторая')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /^все/i }));
    const deleteButtons = screen.getAllByRole('button', { name: /удалить задачу/i });
    await user.click(deleteButtons[0]);
    await waitFor(() => expect(screen.queryByText('первая')).toBeNull());
  });
});
