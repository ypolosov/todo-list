import { describe, it, expect, beforeEach } from 'vitest';
import { LocalStorageRepository } from './localStorageRepository';
import type { Todo } from '../domain/todo';

const STORAGE_KEY = 'todo-list-data';

const sampleTodo: Todo = {
  id: '1',
  title: 'Test',
  completed: false,
  category: 'work',
  createdAt: '2026-01-01T00:00:00.000Z',
};

describe('LocalStorageRepository', () => {
  let repo: LocalStorageRepository;

  beforeEach(() => {
    localStorage.clear();
    repo = new LocalStorageRepository();
  });

  it('returns empty array when localStorage is empty', () => {
    expect(repo.getAll()).toEqual([]);
  });

  it('saves and retrieves todos', () => {
    repo.save([sampleTodo]);
    expect(repo.getAll()).toEqual([sampleTodo]);
  });

  it('overwrites previous data on save', () => {
    repo.save([sampleTodo]);
    repo.save([]);
    expect(repo.getAll()).toEqual([]);
  });

  it('returns empty array on corrupt data', () => {
    localStorage.setItem(STORAGE_KEY, 'not valid json');
    expect(repo.getAll()).toEqual([]);
  });
});
