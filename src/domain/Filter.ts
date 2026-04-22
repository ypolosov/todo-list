export type Filter = 'all' | 'active' | 'completed';

export const FILTERS: readonly Filter[] = ['all', 'active', 'completed'] as const;

export function isFilter(value: unknown): value is Filter {
  return typeof value === 'string' && (FILTERS as readonly string[]).includes(value);
}
