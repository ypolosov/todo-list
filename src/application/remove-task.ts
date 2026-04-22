import type { TaskId } from '../domain/task-id';
import { TodoList } from '../domain/todo-list';
import type { TaskRepository } from '../domain/task-repository';

export class RemoveTaskUseCase {
  constructor(private readonly repo: TaskRepository) {}

  execute(id: TaskId): void {
    const updated = TodoList.rehydrate(this.repo.load()).remove(id);
    this.repo.save(updated.tasks);
  }
}
