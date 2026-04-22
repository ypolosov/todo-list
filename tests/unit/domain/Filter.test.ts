import { describe, expect, it } from 'vitest';
import { FILTERS, isFilter } from '../../../src/domain/Filter';

describe('domain.Filter', () => {
  it('перечисляет все фильтры в порядке all, active, completed', () => {
    expect(FILTERS).toEqual(['all', 'active', 'completed']);
  });

  it('isFilter возвращает true только для валидных значений', () => {
    expect(isFilter('all')).toBe(true);
    expect(isFilter('active')).toBe(true);
    expect(isFilter('completed')).toBe(true);
    expect(isFilter('other')).toBe(false);
    expect(isFilter(42)).toBe(false);
    expect(isFilter(null)).toBe(false);
  });
});
