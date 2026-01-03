import { Task } from '@/types/todo';
import { TaskItem } from './TaskItem';
import { ClipboardList, Sparkles } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * ============================================================
 * TaskList Component - Container for All Tasks
 * ============================================================
 * 
 * RENDERING EXPLAINED:
 * - Receives array of tasks from parent (TodoApp)
 * - Maps over array to create TaskItem for each task
 * - Key prop is essential: React uses it to track which items changed
 * 
 * WHY KEY MATTERS:
 * Without key, React can't efficiently update the list
 * With key (task.id), React knows exactly which items to add/remove/update
 */
export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  
  // ========================================
  // Empty State - No tasks yet
  // ========================================
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        {/* Decorative icon */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl scale-150" />
          <div className="relative p-4 rounded-2xl bg-muted/50 border border-border/50">
            <ClipboardList className="w-10 h-10 opacity-50" />
          </div>
        </div>
        
        <p className="text-lg font-medium text-foreground/70 mb-1">
          All clear!
        </p>
        <p className="text-sm text-muted-foreground/70 flex items-center gap-1.5">
          Add your first task to get started
          <Sparkles className="w-4 h-4 text-primary/60" />
        </p>
      </div>
    );
  }

  // ========================================
  // Task List Rendering
  // ========================================
  return (
    <div className="space-y-3">
      {/* 
        Array.map() transforms each task object into a TaskItem component
        
        For each task in tasks array:
        1. Create a TaskItem component
        2. Pass the task data and event handlers as props
        3. Use task.id as the key for React's reconciliation
      */}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}           // Unique identifier for React
          task={task}             // Pass task data
          onToggle={onToggle}     // Pass toggle function down
          onDelete={onDelete}     // Pass delete function down
        />
      ))}
    </div>
  );
}
