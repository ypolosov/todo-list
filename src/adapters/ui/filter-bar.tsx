import { Filter } from '../../application/filter-tasks';

export interface FilterCounts {
  all: number;
  active: number;
  done: number;
}

export interface FilterBarProps {
  value: Filter;
  counts: FilterCounts;
  onChange: (filter: Filter) => void;
}

const LABELS: Record<Filter, string> = {
  all: 'Все',
  active: 'Активные',
  done: 'Выполненные',
};

const ORDER: Filter[] = ['all', 'active', 'done'];

export const FilterBar = ({ value, counts, onChange }: FilterBarProps) => (
  <div className="filter-bar" role="group" aria-label="Фильтр по статусу">
    {ORDER.map((key) => (
      <button
        key={key}
        type="button"
        className={`filter-bar__button ${value === key ? 'filter-bar__button--active' : ''}`}
        aria-pressed={value === key}
        onClick={() => onChange(key)}
      >
        {LABELS[key]} <span className="filter-bar__count">{counts[key]}</span>
      </button>
    ))}
  </div>
);
