interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Поиск задач..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
