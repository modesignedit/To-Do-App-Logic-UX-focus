import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useTheme } from '@/hooks/useTheme';
import { Task } from '@/types/todo';
import { TaskInput } from './TaskInput';
import { TaskList } from './TaskList';
import { ThemeToggle } from './ThemeToggle';
import { CheckCircle2 } from 'lucide-react';

/**
 * Main Todo Application Component
 * Manages all task state and orchestrates child components
 */
export function TodoApp() {
  // Persist tasks to localStorage
  const [tasks, setTasks] = useLocalStorage<Task[]>('todo-tasks', []);
  // Theme management
  const { isDark, toggleTheme } = useTheme();

  /**
   * Add a new task to the list
   * Generates unique ID using timestamp + random string
   */
  const addTask = (text: string) => {
    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      completed: false,
      createdAt: Date.now(),
    };
    // Add new task at the beginning of the list
    setTasks([newTask, ...tasks]);
  };

  /**
   * Toggle task completion status
   */
  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  /**
   * Remove a task from the list
   */
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Calculate stats for header
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Main container with max width and padding */}
      <div className="max-w-xl mx-auto px-4 py-8 sm:py-12">
        {/* Header section */}
        <header className="flex items-center justify-between mb-8">
          {/* Logo and title */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
                Tasks
              </h1>
              {/* Task count display */}
              {totalCount > 0 && (
                <p className="text-sm text-muted-foreground">
                  {completedCount} of {totalCount} completed
                </p>
              )}
            </div>
          </div>
          
          {/* Theme toggle button */}
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </header>

        {/* Task input form */}
        <div className="mb-6">
          <TaskInput onAddTask={addTask} />
        </div>

        {/* Task list */}
        <TaskList 
          tasks={tasks} 
          onToggle={toggleTask} 
          onDelete={deleteTask} 
        />
      </div>
    </div>
  );
}
