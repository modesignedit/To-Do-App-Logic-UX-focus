import { Task } from '@/types/todo';
import { TaskItem } from './TaskItem';
import { ClipboardList } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Container for rendering list of tasks
 * Shows empty state when no tasks exist
 */
export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  // Empty state with friendly message
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <ClipboardList className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-lg font-medium">No tasks yet</p>
        <p className="text-sm">Add a task to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Render tasks in reverse chronological order (newest first) */}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
