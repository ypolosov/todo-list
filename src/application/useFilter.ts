import { useMemo, useState } from 'react';
import type { CategoryFilter, StatusFilter, Todo } from '../domain/todo';
import { filterByCategory, filterByStatus } from '../domain/todoService';

export function useFilter(todos: Todo[]) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  const filtered = useMemo(() => {
    let result = todos;
    result = filterByStatus(result, statusFilter);
    result = filterByCategory(result, categoryFilter);
    return result;
  }, [todos, statusFilter, categoryFilter]);

  return {
    statusFilter,
    categoryFilter,
    setStatusFilter,
    setCategoryFilter,
    filtered,
  };
}
