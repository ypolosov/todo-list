import { useCallback, useEffect, useMemo, useState } from 'react';
import { Task } from '../../domain/task';
import { TaskId } from '../../domain/task-id';
import { TaskRepository } from '../../application/task-repository';
import { addTask } from '../../application/add-task';
import { completeTask } from '../../application/complete-task';
import { deleteTask } from '../../application/delete-task';
import { listTasks } from '../../application/list-tasks';
import { filterTasks, Filter } from '../../application/filter-tasks';

export interface UseTasks {
  tasks: Task[];
  visible: Task[];
  filter: Filter;
  ready: boolean;
  add: (text: string) => Promise<void>;
  toggle: (id: TaskId) => Promise<void>;
  remove: (id: TaskId) => Promise<void>;
  setFilter: (filter: Filter) => void;
}

export const useTasks = (repo: TaskRepository): UseTasks => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    const list = await listTasks(repo);
    setTasks(list);
  }, [repo]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const list = await listTasks(repo);
      if (!cancelled) {
        setTasks(list);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [repo]);

  const add = useCallback(
    async (text: string) => {
      await addTask(repo, text);
      await refresh();
    },
    [repo, refresh],
  );

  const toggle = useCallback(
    async (id: TaskId) => {
      await completeTask(repo, id);
      await refresh();
    },
    [repo, refresh],
  );

  const remove = useCallback(
    async (id: TaskId) => {
      await deleteTask(repo, id);
      await refresh();
    },
    [repo, refresh],
  );

  const visible = useMemo(() => filterTasks(tasks, filter), [tasks, filter]);

  return { tasks, visible, filter, ready, add, toggle, remove, setFilter };
};
