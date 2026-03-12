import { useMemo, useState } from 'react';
import type { Todo } from '../domain/todo';
import { filterByText } from '../domain/todoService';

export function useSearch(todos: Todo[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBySearch = useMemo(
    () => filterByText(todos, searchQuery),
    [todos, searchQuery],
  );

  return { searchQuery, setSearchQuery, filteredBySearch };
}
