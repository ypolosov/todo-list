import type { TaskList } from '../domain';
import type { TaskRepository } from './TaskRepository';

export class RemoveTask {
  constructor(private readonly repo: TaskRepository) {}

  async execute(id: string): Promise<TaskList> {
    const current = await this.repo.load();
    const next = current.remove(id);
    if (next !== current) {
      await this.repo.save(next);
    }
    return next;
  }
}
