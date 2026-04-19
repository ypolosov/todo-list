import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterBar } from './filter-bar';

describe('FilterBar', () => {
  it('отрисовывает три фильтра: все, активные, выполненные', () => {
    render(<FilterBar value="all" counts={{ all: 0, active: 0, done: 0 }} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: /все/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /активные/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /выполненные/i })).toBeInTheDocument();
  });

  it('помечает текущий фильтр как активный', () => {
    render(<FilterBar value="done" counts={{ all: 0, active: 0, done: 0 }} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: /выполненные/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('вызывает onChange с выбранным фильтром', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<FilterBar value="all" counts={{ all: 0, active: 0, done: 0 }} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: /активные/i }));
    expect(onChange).toHaveBeenCalledWith('active');
  });

  it('показывает счётчики по фильтрам', () => {
    render(<FilterBar value="all" counts={{ all: 5, active: 3, done: 2 }} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: /все/i })).toHaveTextContent('5');
    expect(screen.getByRole('button', { name: /активные/i })).toHaveTextContent('3');
    expect(screen.getByRole('button', { name: /выполненные/i })).toHaveTextContent('2');
  });
});
