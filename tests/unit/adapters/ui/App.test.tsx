import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../../../src/adapters/ui/App';

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the composition root with an empty state', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /todo-list/i })).toBeInTheDocument();
    expect(screen.getByText(/no tasks/i)).toBeInTheDocument();
  });

  it('persists added tasks through localStorage across renders', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    await user.type(screen.getByPlaceholderText(/new task/i), 'persist me');
    await user.click(screen.getByRole('button', { name: /^add$/i }));
    unmount();

    render(<App />);
    expect(screen.getByText('persist me')).toBeInTheDocument();
  });
});
