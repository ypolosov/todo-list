import { describe, it, expect } from 'vitest';
import { createTask, complete, reopen, isActive, isDone } from './task';

describe('task', () => {
  it('создаёт задачу со статусом active по тексту', () => {
    const task = createTask('купить хлеб');
    expect(task.text).toBe('купить хлеб');
    expect(task.status).toBe('active');
    expect(task.id.length).toBeGreaterThan(0);
  });

  it('отклоняет пустой текст', () => {
    expect(() => createTask('')).toThrow();
  });

  it('отклоняет текст только из пробелов', () => {
    expect(() => createTask('   ')).toThrow();
  });

  it('обрезает пробелы по краям текста', () => {
    const task = createTask('  помыть посуду  ');
    expect(task.text).toBe('помыть посуду');
  });

  it('переводит задачу в done через complete', () => {
    const task = createTask('foo');
    const completed = complete(task);
    expect(completed.status).toBe('done');
    expect(completed.id).toBe(task.id);
    expect(completed.text).toBe(task.text);
  });

  it('возвращает задачу в active через reopen', () => {
    const task = complete(createTask('foo'));
    const reopened = reopen(task);
    expect(reopened.status).toBe('active');
  });

  it('complete на done-задаче оставляет done', () => {
    const task = complete(createTask('foo'));
    expect(complete(task).status).toBe('done');
  });

  it('reopen на active-задаче оставляет active', () => {
    const task = createTask('foo');
    expect(reopen(task).status).toBe('active');
  });

  it('isActive возвращает true только для active', () => {
    expect(isActive(createTask('a'))).toBe(true);
    expect(isActive(complete(createTask('a')))).toBe(false);
  });

  it('isDone возвращает true только для done', () => {
    expect(isDone(complete(createTask('a')))).toBe(true);
    expect(isDone(createTask('a'))).toBe(false);
  });
});
