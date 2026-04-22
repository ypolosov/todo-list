import type { Task } from '../../src/domain/task';
import type { TaskRepository } from '../../src/domain/task-repository';

export class FakeRepo implements TaskRepository {
  private tasks: readonly Task[] = [];
  saveCalls = 0;

  seed(tasks: readonly Task[]): void {
    this.tasks = [...tasks];
  }

  load(): readonly Task[] {
    return this.tasks;
  }

  save(tasks: readonly Task[]): void {
    this.tasks = [...tasks];
    this.saveCalls += 1;
  }
}
