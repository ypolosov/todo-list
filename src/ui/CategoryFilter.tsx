import type { CategoryFilter as CategoryFilterType, StatusFilter } from '../domain/todo';

interface Props {
  statusFilter: StatusFilter;
  categoryFilter: CategoryFilterType;
  onStatusChange: (status: StatusFilter) => void;
  onCategoryChange: (category: CategoryFilterType) => void;
}

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Выполненные' },
];

const CATEGORY_OPTIONS: { value: CategoryFilterType; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'work', label: 'Работа' },
  { value: 'home', label: 'Дом' },
];

export function CategoryFilter({
  statusFilter,
  categoryFilter,
  onStatusChange,
  onCategoryChange,
}: Props) {
  return (
    <div className="filters">
      <div className="filter-group">
        <span className="filter-label">Статус:</span>
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`btn btn-filter ${statusFilter === opt.value ? 'active' : ''}`}
            onClick={() => onStatusChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="filter-group">
        <span className="filter-label">Категория:</span>
        {CATEGORY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`btn btn-filter ${categoryFilter === opt.value ? 'active' : ''}`}
            onClick={() => onCategoryChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
