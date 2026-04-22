import type { TaskStatus } from './task';

export type FilterValue = 'active' | 'completed' | 'all';

const VALUES: readonly FilterValue[] = ['active', 'completed', 'all'] as const;

export class Filter {
  private constructor(readonly value: FilterValue) {}

  static fromString(raw: string): Filter {
    const found = VALUES.find((v) => v === raw);
    if (!found) {
      throw new Error(`Invalid filter value: ${raw}`);
    }
    return new Filter(found);
  }

  static default(): Filter {
    return new Filter('all');
  }

  equals(other: Filter): boolean {
    return this.value === other.value;
  }

  matches(status: TaskStatus): boolean {
    if (this.value === 'all') {
      return true;
    }
    return this.value === status;
  }
}
