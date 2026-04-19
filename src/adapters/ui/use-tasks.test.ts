import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useTasks } from './use-tasks';
import { InMemoryTaskRepository } from '../../application/in-memory-task-repository';

describe('useTasks', () => {
  let repo: InMemoryTaskRepository;

  beforeEach(() => {
    repo = new InMemoryTaskRepository();
  });

  it('при инициализации возвращает пустой список и фильтр all', async () => {
    const { result } = renderHook(() => useTasks(repo));
    await waitFor(() => expect(result.current.ready).toBe(true));
    expect(result.current.tasks).toEqual([]);
    expect(result.current.filter).toBe('all');
    expect(result.current.visible).toEqual([]);
  });

  it('add добавляет задачу', async () => {
    const { result } = renderHook(() => useTasks(repo));
    await waitFor(() => expect(result.current.ready).toBe(true));
    await act(async () => {
      await result.current.add('foo');
    });
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].text).toBe('foo');
  });

  it('toggle меняет статус задачи', async () => {
    const { result } = renderHook(() => useTasks(repo));
    await waitFor(() => expect(result.current.ready).toBe(true));
    await act(async () => {
      await result.current.add('foo');
    });
    const id = result.current.tasks[0].id;
    await act(async () => {
      await result.current.toggle(id);
    });
    expect(result.current.tasks[0].status).toBe('done');
  });

  it('remove удаляет задачу', async () => {
    const { result } = renderHook(() => useTasks(repo));
    await waitFor(() => expect(result.current.ready).toBe(true));
    await act(async () => {
      await result.current.add('foo');
    });
    const id = result.current.tasks[0].id;
    await act(async () => {
      await result.current.remove(id);
    });
    expect(result.current.tasks).toEqual([]);
  });

  it('setFilter меняет фильтр и visible', async () => {
    const { result } = renderHook(() => useTasks(repo));
    await waitFor(() => expect(result.current.ready).toBe(true));
    await act(async () => {
      await result.current.add('a');
      await result.current.add('b');
    });
    const firstId = result.current.tasks[0].id;
    await act(async () => {
      await result.current.toggle(firstId);
    });
    act(() => {
      result.current.setFilter('done');
    });
    expect(result.current.visible).toHaveLength(1);
    expect(result.current.visible[0].status).toBe('done');
  });
});
