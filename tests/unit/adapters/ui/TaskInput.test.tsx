import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskInput } from '../../../../src/adapters/ui/TaskInput';

describe('TaskInput', () => {
  it('calls onAdd with the entered title on submit', async () => {
    const onAdd = vi.fn();
    const user = userEvent.setup();
    render(<TaskInput onAdd={onAdd} />);
    await user.type(screen.getByPlaceholderText(/new task/i), 'buy milk');
    await user.click(screen.getByRole('button', { name: /add/i }));
    expect(onAdd).toHaveBeenCalledWith('buy milk');
  });

  it('clears the input after successful submit', async () => {
    const onAdd = vi.fn();
    const user = userEvent.setup();
    render(<TaskInput onAdd={onAdd} />);
    const input = screen.getByPlaceholderText(/new task/i) as HTMLInputElement;
    await user.type(input, 'buy milk');
    await user.click(screen.getByRole('button', { name: /add/i }));
    expect(input.value).toBe('');
  });

  it('does not call onAdd when input is empty', async () => {
    const onAdd = vi.fn();
    const user = userEvent.setup();
    render(<TaskInput onAdd={onAdd} />);
    await user.click(screen.getByRole('button', { name: /add/i }));
    expect(onAdd).not.toHaveBeenCalled();
  });

  it('submits on Enter key press', async () => {
    const onAdd = vi.fn();
    const user = userEvent.setup();
    render(<TaskInput onAdd={onAdd} />);
    await user.type(screen.getByPlaceholderText(/new task/i), 'buy milk{Enter}');
    expect(onAdd).toHaveBeenCalledWith('buy milk');
  });
});
