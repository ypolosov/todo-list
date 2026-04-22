import { Filter } from '../domain/filter';

export class ChangeFilterUseCase {
  execute(raw: string): Filter {
    return Filter.fromString(raw);
  }
}
