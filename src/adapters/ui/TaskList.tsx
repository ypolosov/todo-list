import type { Task } from '../../domain/task';
import type { TaskId } from '../../domain/task-id';
import { TaskItem } from './TaskItem';

interface Props {
  tasks: readonly Task[];
  onToggle: (id: TaskId) => void;
  onRemove: (id: TaskId) => void;
}

export function TaskList({ tasks, onToggle, onRemove }: Props): JSX.Element {
  if (tasks.length === 0) {
    return <p>no tasks</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id.toString()} task={task} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </ul>
  );
}
