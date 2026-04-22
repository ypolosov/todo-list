import type { TaskList } from '../domain';

export interface TaskRepository {
  load(): Promise<TaskList>;
  save(list: TaskList): Promise<void>;
}
