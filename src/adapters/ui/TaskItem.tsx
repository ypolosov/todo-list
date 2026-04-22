import type { Task } from '../../domain/task';
import type { TaskId } from '../../domain/task-id';

interface Props {
  task: Task;
  onToggle: (id: TaskId) => void;
  onRemove: (id: TaskId) => void;
}

export function TaskItem({ task, onToggle, onRemove }: Props): JSX.Element {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={() => onToggle(task.id)}
        />
        <span>{task.title}</span>
      </label>
      <button type="button" onClick={() => onRemove(task.id)}>
        remove
      </button>
    </li>
  );
}
