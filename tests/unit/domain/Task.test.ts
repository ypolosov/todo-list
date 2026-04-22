import { describe, expect, it } from 'vitest';
import { Task } from '../../../src/domain/Task';

describe('domain.Task', () => {
  it('create возвращает активную задачу с переданным названием', () => {
    const task = Task.create('id-1', 'купить хлеб');
    expect(task.id).toBe('id-1');
    expect(task.title).toBe('купить хлеб');
    expect(task.status).toBe('active');
  });

  it('toggle меняет статус active → completed', () => {
    const task = Task.create('id-1', 'купить хлеб');
    const toggled = task.toggle();
    expect(toggled.status).toBe('completed');
  });

  it('toggle меняет статус completed → active', () => {
    const task = Task.create('id-1', 'купить хлеб').toggle();
    expect(task.toggle().status).toBe('active');
  });

  it('toggle не мутирует исходную задачу', () => {
    const task = Task.create('id-1', 'купить хлеб');
    task.toggle();
    expect(task.status).toBe('active');
  });

  it('create отбрасывает пробелы в названии', () => {
    const task = Task.create('id-1', '   купить хлеб  ');
    expect(task.title).toBe('купить хлеб');
  });

  it('create бросает при пустом названии', () => {
    expect(() => Task.create('id-1', '   ')).toThrow('Task title must not be empty');
  });

  it('create бросает при пустом id', () => {
    expect(() => Task.create('', 'x')).toThrow('Task id must not be empty');
  });

  it('isActive true только для active', () => {
    const active = Task.create('a', 'x');
    expect(active.isActive()).toBe(true);
    expect(active.toggle().isActive()).toBe(false);
  });
});
