import { Check, Trash2 } from 'lucide-react';
import { Task } from '@/types/todo';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Individual task item component
 * Features checkbox toggle, delete button, and completion styling
 */
export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div 
      className={`group flex items-center gap-4 p-4 rounded-lg bg-card border border-border shadow-sm transition-smooth hover:shadow-md animate-fade-in ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      {/* Custom checkbox with animation */}
      <button
        onClick={() => onToggle(task.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-smooth focus-ring flex items-center justify-center ${
          task.completed 
            ? 'bg-primary border-primary' 
            : 'border-muted-foreground hover:border-primary'
        }`}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {/* Check icon with bounce animation on complete */}
        <Check 
          className={`w-3.5 h-3.5 text-primary-foreground transition-all duration-200 ${
            task.completed ? 'opacity-100 animate-check-bounce' : 'opacity-0 scale-0'
          }`} 
        />
      </button>

      {/* Task text with strikethrough on complete */}
      <span 
        className={`flex-1 text-foreground transition-smooth ${
          task.completed ? 'line-through text-muted-foreground' : ''
        }`}
      >
        {task.text}
      </span>

      {/* Delete button - appears on hover */}
      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 p-2 rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive hover:bg-destructive/10 transition-smooth focus-ring"
        aria-label="Delete task"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
