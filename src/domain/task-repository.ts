import type { Task } from './task';

export interface TaskRepository {
  load(): readonly Task[];
  save(tasks: readonly Task[]): void;
}
