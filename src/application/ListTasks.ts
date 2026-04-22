import type { TaskList } from '../domain';
import type { TaskRepository } from './TaskRepository';

export class ListTasks {
  constructor(private readonly repo: TaskRepository) {}

  async execute(): Promise<TaskList> {
    return this.repo.load();
  }
}
