import type { Todo, Category, StatusFilter, CategoryFilter, Filters } from './todo';

export function createTodo(title: string, category: Category): Todo {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    category,
    createdAt: new Date().toISOString(),
  };
}

export function validateTitle(title: string): boolean {
  return title.trim().length > 0;
}

export function filterByText(todos: Todo[], query: string): Todo[] {
  if (!query.trim()) return todos;
  const lower = query.toLowerCase();
  return todos.filter((t) => t.title.toLowerCase().includes(lower));
}

export function filterByStatus(todos: Todo[], status: StatusFilter): Todo[] {
  if (status === 'all') return todos;
  return todos.filter((t) => (status === 'completed' ? t.completed : !t.completed));
}

export function filterByCategory(todos: Todo[], category: CategoryFilter): Todo[] {
  if (category === 'all') return todos;
  return todos.filter((t) => t.category === category);
}

export function applyAllFilters(todos: Todo[], filters: Filters): Todo[] {
  let result = todos;
  result = filterByText(result, filters.search);
  result = filterByStatus(result, filters.status);
  result = filterByCategory(result, filters.category);
  return result;
}
