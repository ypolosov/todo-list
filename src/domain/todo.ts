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

export const CATEGORIES: Category[] = ['work', 'home'];

export const CATEGORY_LABELS: Record<Category, string> = {
  work: 'Работа',
  home: 'Дом',
};

export function isCategory(value: string): value is Category {
  return CATEGORIES.includes(value as Category);
}
