import type { Task } from '../domain/task';
import type { Filter } from '../domain/filter';
import { TodoList } from '../domain/todo-list';
import type { TaskRepository } from '../domain/task-repository';

export class ListTasksQuery {
  constructor(private readonly repo: TaskRepository) {}

  execute(filter: Filter): readonly Task[] {
    return TodoList.rehydrate(this.repo.load()).list(filter);
  }
}
