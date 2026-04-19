import { Task, isDone } from '../../domain/task';
import { TaskId } from '../../domain/task-id';

export interface TaskItemProps {
  task: Task;
  onToggle: (id: TaskId) => void;
  onDelete: (id: TaskId) => void;
}

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const done = isDone(task);
  return (
    <li className={`task-item ${done ? 'task-item--done' : ''}`}>
      <label className="task-item__label">
        <input type="checkbox" checked={done} onChange={() => onToggle(task.id)} />
        <span className="task-item__text">{task.text}</span>
      </label>
      <button
        type="button"
        className="task-item__delete"
        onClick={() => onDelete(task.id)}
        aria-label={`удалить задачу ${task.text}`}
      >
        ×
      </button>
    </li>
  );
};
