import { describe, it, expect, beforeEach } from 'vitest';
import { LocalStorageTaskRepository } from './local-storage-task-repository';
import { createTask, complete } from '../../domain/task';

describe('LocalStorageTaskRepository', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('возвращает пустой список для пустого хранилища', async () => {
    const repo = new LocalStorageTaskRepository('todo-list:tasks');
    expect(await repo.findAll()).toEqual([]);
  });

  it('сохраняет и возвращает задачу', async () => {
    const repo = new LocalStorageTaskRepository('todo-list:tasks');
    const task = createTask('foo');
    await repo.save(task);
    expect(await repo.findAll()).toEqual([task]);
  });

  it('переживает пересоздание репозитория', async () => {
    const key = 'todo-list:tasks';
    const repoA = new LocalStorageTaskRepository(key);
    const task = createTask('foo');
    await repoA.save(task);
    const repoB = new LocalStorageTaskRepository(key);
    expect(await repoB.findAll()).toEqual([task]);
  });

  it('обновляет задачу при повторном save', async () => {
    const repo = new LocalStorageTaskRepository('todo-list:tasks');
    const task = createTask('foo');
    await repo.save(task);
    const done = complete(task);
    await repo.save(done);
    expect(await repo.findAll()).toEqual([done]);
  });

  it('удаляет задачу по id', async () => {
    const repo = new LocalStorageTaskRepository('todo-list:tasks');
    const task = createTask('foo');
    await repo.save(task);
    await repo.delete(task.id);
    expect(await repo.findAll()).toEqual([]);
  });

  it('игнорирует повреждённый JSON и возвращает пустой список', async () => {
    localStorage.setItem('todo-list:tasks', 'not json');
    const repo = new LocalStorageTaskRepository('todo-list:tasks');
    expect(await repo.findAll()).toEqual([]);
  });
});
