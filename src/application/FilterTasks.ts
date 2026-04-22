import type { Filter, Task } from '../domain';
import type { TaskRepository } from './TaskRepository';

export class FilterTasks {
  constructor(private readonly repo: TaskRepository) {}

  async execute(filter: Filter): Promise<readonly Task[]> {
    const list = await this.repo.load();
    return list.filter(filter);
  }
}
