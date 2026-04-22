import type { TaskList } from '../domain';
import type { TaskRepository } from './TaskRepository';

export class ToggleTask {
  constructor(private readonly repo: TaskRepository) {}

  async execute(id: string): Promise<TaskList> {
    const current = await this.repo.load();
    const next = current.toggle(id);
    if (next !== current) {
      await this.repo.save(next);
    }
    return next;
  }
}
