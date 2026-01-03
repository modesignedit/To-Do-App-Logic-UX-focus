import { useState } from 'react';
import { Check, Trash2, Sparkles } from 'lucide-react';
import { Task } from '@/types/todo';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * ============================================================
 * TaskItem Component - Individual Task Display
 * ============================================================
 * 
 * PROPS EXPLAINED:
 * - task: The task data object {id, text, completed, createdAt}
 * - onToggle: Function to call when checkbox is clicked
 * - onDelete: Function to call when delete button is clicked
 * 
 * EVENT HANDLING:
 * When user clicks checkbox → calls onToggle(task.id)
 * When user clicks delete → triggers exit animation, then calls onDelete
 */
export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  // Local state for managing deletion animation
  const [isDeleting, setIsDeleting] = useState(false);
  // State for the completion celebration effect
  const [showCelebration, setShowCelebration] = useState(false);

  /**
   * Handle checkbox toggle with celebration animation
   */
  const handleToggle = () => {
    // Only show celebration when completing (not uncompleting)
    if (!task.completed) {
      setShowCelebration(true);
      // Remove celebration after animation
      setTimeout(() => setShowCelebration(false), 600);
    }
    onToggle(task.id);
  };

  /**
   * Handle delete with exit animation
   * 1. Set deleting state to true (triggers CSS animation)
   * 2. Wait for animation to complete
   * 3. Call the actual delete function
   */
  const handleDelete = () => {
    setIsDeleting(true);
    // Wait for slide-out animation (300ms) before actually deleting
    setTimeout(() => {
      onDelete(task.id);
    }, 300);
  };

  return (
    <div 
      className={`
        group relative flex items-center gap-4 p-4 sm:p-5 rounded-xl
        bg-card border border-border/50
        shadow-sm hover:shadow-md hover:border-border
        transition-premium
        ${isDeleting ? 'animate-slide-out' : 'animate-fade-in'}
        ${task.completed ? 'bg-muted/30' : ''}
      `}
    >
      {/* Celebration sparkle effect on completion */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {[...Array(6)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-primary animate-confetti"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.05}s`,
                width: '16px',
                height: '16px',
              }}
            />
          ))}
        </div>
      )}

      {/* ========================================
          Custom Checkbox
          ======================================== */}
      <button
        onClick={handleToggle}
        className={`
          relative flex-shrink-0 w-6 h-6 rounded-full border-2
          transition-premium focus-ring
          flex items-center justify-center
          ${task.completed 
            ? 'bg-primary border-primary shadow-glow' 
            : 'border-muted-foreground/40 hover:border-primary hover:bg-primary/5'
          }
        `}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {/* Animated check icon */}
        <Check 
          className={`
            w-3.5 h-3.5 text-primary-foreground
            transition-all duration-300
            ${task.completed ? 'opacity-100 animate-check-pop' : 'opacity-0 scale-0'}
          `}
          strokeWidth={3}
        />
      </button>

      {/* ========================================
          Task Text
          ======================================== */}
      <span 
        className={`
          flex-1 text-[15px] leading-relaxed
          transition-premium select-none
          ${task.completed 
            ? 'line-through text-muted-foreground/70 decoration-muted-foreground/40' 
            : 'text-foreground'
          }
        `}
      >
        {task.text}
      </span>

      {/* ========================================
          Delete Button - Appears on Hover
          ======================================== */}
      <button
        onClick={handleDelete}
        className={`
          flex-shrink-0 p-2 rounded-lg
          text-muted-foreground/50
          opacity-0 group-hover:opacity-100
          hover:text-destructive hover:bg-destructive/10
          active:scale-95
          transition-premium focus-ring
        `}
        aria-label="Delete task"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
