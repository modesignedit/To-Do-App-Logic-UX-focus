import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useTheme } from '@/hooks/useTheme';
import { Task } from '@/types/todo';
import { TaskInput } from './TaskInput';
import { TaskList } from './TaskList';
import { ThemeToggle } from './ThemeToggle';
import { CheckCircle2, Trash2 } from 'lucide-react';

/**
 * ============================================================
 * TodoApp - Main Application Component
 * ============================================================
 * 
 * STATE MANAGEMENT OVERVIEW:
 * 
 * 1. tasks (useLocalStorage)
 *    - Array of all task objects
 *    - Automatically saved to localStorage
 *    - Persists across page refreshes
 * 
 * 2. isDark (useTheme)
 *    - Boolean for current theme
 *    - Saved to localStorage
 *    - Applies 'dark' class to <html>
 * 
 * 
 * DATA FLOW DIAGRAM:
 * 
 *        ┌─────────────────────────────────────────┐
 *        │             TodoApp (Parent)             │
 *        │                                         │
 *        │  State: tasks = [{...}, {...}, ...]     │
 *        │                                         │
 *        │  Functions:                             │
 *        │  - addTask(text)                        │
 *        │  - toggleTask(id)                       │
 *        │  - deleteTask(id)                       │
 *        └───────────┬───────────────┬─────────────┘
 *                    │               │
 *         Props: onAddTask    Props: tasks, onToggle, onDelete
 *                    │               │
 *                    ▼               ▼
 *        ┌───────────────┐   ┌───────────────────┐
 *        │   TaskInput   │   │     TaskList      │
 *        │               │   │         │         │
 *        │ Calls addTask │   │    ┌────┴────┐    │
 *        │ when submitted│   │    ▼         ▼    │
 *        └───────────────┘   │ TaskItem TaskItem │
 *                            └───────────────────┘
 */
export function TodoApp() {
  // ========================================
  // STATE: Tasks array with localStorage persistence
  // ========================================
  // useLocalStorage works like useState, but saves to browser storage
  // 'todo-tasks' is the key in localStorage
  // [] is the default value for new users
  const [tasks, setTasks] = useLocalStorage<Task[]>('todo-tasks', []);
  
  // ========================================
  // STATE: Theme (light/dark mode)
  // ========================================
  const { isDark, toggleTheme } = useTheme();

  // ========================================
  // ACTION: Add a new task
  // ========================================
  const addTask = (text: string) => {
    // Create new task object with unique ID
    const newTask: Task = {
      // Generate unique ID using timestamp + random string
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      completed: false,
      createdAt: Date.now(),
    };
    
    // Add new task at the BEGINNING of the array
    // Spread operator: [...oldArray] creates a copy
    // [newTask, ...tasks] puts newTask first
    setTasks([newTask, ...tasks]);
  };

  // ========================================
  // ACTION: Toggle task completion
  // ========================================
  const toggleTask = (id: string) => {
    // map() creates a new array with modified items
    setTasks(tasks.map(task => 
      // If this is the task we want to toggle
      task.id === id 
        // Create new object with flipped 'completed' value
        ? { ...task, completed: !task.completed } 
        // Otherwise, keep the task unchanged
        : task
    ));
  };

  // ========================================
  // ACTION: Delete a task
  // ========================================
  const deleteTask = (id: string) => {
    // filter() creates new array with only items that pass the test
    // Keep all tasks where id does NOT match the deleted id
    setTasks(tasks.filter(task => task.id !== id));
  };

  // ========================================
  // ACTION: Clear all completed tasks
  // ========================================
  const clearCompleted = () => {
    // Keep only tasks that are NOT completed
    setTasks(tasks.filter(task => !task.completed));
  };

  // ========================================
  // COMPUTED: Statistics for display
  // ========================================
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // ========================================
  // RENDER: UI Layout
  // ========================================
  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      {/* Subtle background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.02] pointer-events-none" />
      
      {/* Main content container */}
      <div className="relative max-w-lg mx-auto px-4 py-8 sm:py-16">
        
        {/* ========================================
            Header Section
            ======================================== */}
        <header className="flex items-start justify-between mb-10">
          <div className="flex items-center gap-4">
            {/* Logo/Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl" />
              <div className="relative p-3 rounded-2xl bg-primary/10 border border-primary/20">
                <CheckCircle2 className="w-7 h-7 text-primary" strokeWidth={2} />
              </div>
            </div>
            
            {/* Title and stats */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Tasks
              </h1>
              
              {/* Progress indicator - only show when tasks exist */}
              {totalCount > 0 && (
                <div className="flex items-center gap-3 mt-1.5">
                  {/* Text stats */}
                  <p className="text-sm text-muted-foreground">
                    {completedCount} of {totalCount} done
                  </p>
                  
                  {/* Progress bar */}
                  <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Theme toggle button */}
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </header>

        {/* ========================================
            Task Input Section
            ======================================== */}
        <div className="mb-8">
          {/* Pass addTask function as prop - called when user submits */}
          <TaskInput onAddTask={addTask} />
        </div>

        {/* ========================================
            Task List Section
            ======================================== */}
        {/* Pass tasks array and action handlers as props */}
        <TaskList 
          tasks={tasks} 
          onToggle={toggleTask} 
          onDelete={deleteTask} 
        />
        
        {/* ========================================
            Clear Completed Button
            ======================================== */}
        {completedCount > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={clearCompleted}
              className="group flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-destructive bg-muted/50 hover:bg-destructive/10 rounded-xl border border-border/50 hover:border-destructive/30 transition-all duration-200"
            >
              <Trash2 className="w-4 h-4 transition-transform group-hover:scale-110" />
              Clear {completedCount} completed
            </button>
          </div>
        )}
        
        {/* Footer tip */}
        {totalCount > 0 && (
          <p className="text-center text-xs text-muted-foreground/50 mt-10">
            Your tasks are saved locally in your browser
          </p>
        )}
      </div>
    </div>
  );
}
