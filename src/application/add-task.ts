import { TaskId } from '../domain/task-id';
import { TodoList } from '../domain/todo-list';
import type { TaskRepository } from '../domain/task-repository';

export class AddTaskUseCase {
  constructor(
    private readonly repo: TaskRepository,
    private readonly idFactory: () => TaskId = () => TaskId.generate(),
  ) {}

  execute(rawTitle: string): void {
    const tasks = this.repo.load();
    const updated = TodoList.rehydrate(tasks).add(this.idFactory(), rawTitle);
    this.repo.save(updated.tasks);
  }
}
