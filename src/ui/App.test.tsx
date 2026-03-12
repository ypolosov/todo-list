import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

describe('App integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the app with heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Todo List' })).toBeInTheDocument();
  });

  it('shows empty message initially', () => {
    render(<App />);
    expect(screen.getByText('Задачи не найдены')).toBeInTheDocument();
  });

  it('creates a todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText('Новая задача...'), 'Buy milk');
    await user.click(screen.getByRole('button', { name: 'Добавить' }));

    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(screen.queryByText('Задачи не найдены')).not.toBeInTheDocument();
  });

  it('creates a todo with Enter key', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText('Новая задача...');
    await user.type(input, 'Quick task{Enter}');

    expect(screen.getByText('Quick task')).toBeInTheDocument();
  });

  it('toggles a todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText('Новая задача...'), 'Task 1{Enter}');

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText('Новая задача...'), 'To delete{Enter}');
    expect(screen.getByText('To delete')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Удалить' }));
    expect(screen.queryByText('To delete')).not.toBeInTheDocument();
  });

  it('edits a todo', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText('Новая задача...'), 'Original{Enter}');
    await user.click(screen.getByRole('button', { name: 'Изменить' }));

    const editInput = screen.getByDisplayValue('Original');
    await user.clear(editInput);
    await user.type(editInput, 'Updated');
    await user.click(screen.getByRole('button', { name: 'Сохранить' }));

    expect(screen.getByText('Updated')).toBeInTheDocument();
    expect(screen.queryByText('Original')).not.toBeInTheDocument();
  });

  it('filters by category', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Create work task
    await user.type(screen.getByPlaceholderText('Новая задача...'), 'Work task{Enter}');

    // Create home task
    await user.selectOptions(screen.getByRole('combobox'), 'home');
    await user.type(screen.getByPlaceholderText('Новая задача...'), 'Home task{Enter}');

    // Filter by home
    await user.click(screen.getByRole('button', { name: 'Дом' }));
    expect(screen.getByText('Home task')).toBeInTheDocument();
    expect(screen.queryByText('Work task')).not.toBeInTheDocument();

    // Filter by all
    const allButtons = screen.getAllByRole('button', { name: 'Все' });
    await user.click(allButtons[1]!); // category "Все" button
    expect(screen.getByText('Work task')).toBeInTheDocument();
    expect(screen.getByText('Home task')).toBeInTheDocument();
  });

  it('searches by text', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText('Новая задача...'), 'Apple{Enter}');
    await user.type(screen.getByPlaceholderText('Новая задача...'), 'Banana{Enter}');

    await user.type(screen.getByPlaceholderText('Поиск задач...'), 'apple');
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
  });

  it('persists data across re-renders', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    await user.type(screen.getByPlaceholderText('Новая задача...'), 'Persisted{Enter}');
    expect(screen.getByText('Persisted')).toBeInTheDocument();

    unmount();
    render(<App />);
    expect(screen.getByText('Persisted')).toBeInTheDocument();
  });
});
