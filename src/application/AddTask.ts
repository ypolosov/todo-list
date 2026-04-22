import { Task, TaskList } from '../domain';
import type { TaskRepository } from './TaskRepository';

export type IdGenerator = () => string;

export class AddTask {
  constructor(
    private readonly repo: TaskRepository,
    private readonly nextId: IdGenerator,
  ) {}

  async execute(title: string): Promise<TaskList> {
    const current = await this.repo.load();
    const task = Task.create(this.nextId(), title);
    const next = current.add(task);
    await this.repo.save(next);
    return next;
  }
}
