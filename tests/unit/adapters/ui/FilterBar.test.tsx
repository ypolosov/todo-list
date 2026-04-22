import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilterBar } from '../../../../src/adapters/ui/FilterBar';
import { Filter } from '../../../../src/domain/filter';

describe('FilterBar', () => {
  it('renders three filter options', () => {
    render(<FilterBar current={Filter.default()} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: /^all$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^active$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^completed$/i })).toBeInTheDocument();
  });

  it('marks the current filter as pressed', () => {
    render(<FilterBar current={Filter.fromString('active')} onChange={vi.fn()} />);
    const active = screen.getByRole('button', { name: /^active$/i });
    expect(active).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /^all$/i })).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onChange with the raw filter value on click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<FilterBar current={Filter.default()} onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: /^completed$/i }));
    expect(onChange).toHaveBeenCalledWith('completed');
  });
});
