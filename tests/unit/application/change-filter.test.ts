import { describe, it, expect } from 'vitest';
import { ChangeFilterUseCase } from '../../../src/application/change-filter';

describe('ChangeFilterUseCase', () => {
  it('returns a Filter for a valid raw value', () => {
    const useCase = new ChangeFilterUseCase();
    expect(useCase.execute('active').value).toBe('active');
    expect(useCase.execute('completed').value).toBe('completed');
    expect(useCase.execute('all').value).toBe('all');
  });

  it('throws on an invalid raw value', () => {
    const useCase = new ChangeFilterUseCase();
    expect(() => useCase.execute('foo')).toThrow();
  });
});
