import { useMemo } from 'react';
import { useTodos } from './application/useTodos';
import { useSearch } from './application/useSearch';
import { useFilter } from './application/useFilter';
import { LocalStorageRepository } from './infrastructure/localStorageRepository';
import { Layout } from './ui/Layout';
import { TodoForm } from './ui/TodoForm';
import { SearchBar } from './ui/SearchBar';
import { CategoryFilter } from './ui/CategoryFilter';
import { TodoList } from './ui/TodoList';

export function App() {
  const repository = useMemo(() => new LocalStorageRepository(), []);
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodos(repository);

  const { searchQuery, setSearchQuery, filteredBySearch } = useSearch(todos);
  const {
    statusFilter,
    categoryFilter,
    setStatusFilter,
    setCategoryFilter,
    filtered,
  } = useFilter(filteredBySearch);

  return (
    <Layout>
      <TodoForm onAdd={addTodo} />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <CategoryFilter
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        onStatusChange={setStatusFilter}
        onCategoryChange={setCategoryFilter}
      />
      <TodoList
        todos={filtered}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
      />
    </Layout>
  );
}
