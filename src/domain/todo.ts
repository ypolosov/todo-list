export type Category = 'work' | 'home';
export type StatusFilter = 'all' | 'active' | 'completed';
export type CategoryFilter = 'all' | Category;

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  category: Category;
  createdAt: string;
}

export interface Filters {
  search: string;
  status: StatusFilter;
  category: CategoryFilter;
}
