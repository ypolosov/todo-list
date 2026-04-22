export class TaskId {
  private constructor(private readonly value: string) {}

  static generate(): TaskId {
    return new TaskId(crypto.randomUUID());
  }

  static fromString(value: string): TaskId {
    if (value.length === 0) {
      throw new Error('TaskId must be a non-empty string');
    }
    return new TaskId(value);
  }

  equals(other: TaskId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
