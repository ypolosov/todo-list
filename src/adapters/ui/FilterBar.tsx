import type { Filter, FilterValue } from '../../domain/filter';

interface Props {
  current: Filter;
  onChange: (raw: string) => void;
}

const OPTIONS: readonly FilterValue[] = ['all', 'active', 'completed'];

export function FilterBar({ current, onChange }: Props): JSX.Element {
  return (
    <div>
      {OPTIONS.map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={current.value === value}
          onClick={() => onChange(value)}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
