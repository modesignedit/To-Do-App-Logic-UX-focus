import { useState, FormEvent, useRef } from 'react';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

/**
 * ============================================================
 * TaskInput Component - Add New Tasks
 * ============================================================
 * 
 * EVENT HANDLING EXPLAINED:
 * 
 * 1. onChange: Fires every time user types a character
 *    - Updates local state with current input value
 *    - Controlled input: React controls the input value
 * 
 * 2. onSubmit: Fires when form is submitted (Enter key or button click)
 *    - e.preventDefault() stops page from refreshing
 *    - Validates input (not empty)
 *    - Calls parent's onAddTask function
 *    - Clears the input field
 */
export function TaskInput({ onAddTask }: TaskInputProps) {
  // Local state for input value - controlled component pattern
  const [text, setText] = useState('');
  // Track focus state for styling
  const [isFocused, setIsFocused] = useState(false);
  // Reference to input element for programmatic focus
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Form submission handler
   * Triggered by: pressing Enter or clicking the Add button
   */
  const handleSubmit = (e: FormEvent) => {
    // Prevent default form behavior (page refresh)
    e.preventDefault();
    
    // Trim whitespace and validate
    const trimmed = text.trim();
    if (trimmed) {
      // Call parent function to add the task
      onAddTask(trimmed);
      // Clear input for next task
      setText('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`
        flex gap-3 p-2 rounded-2xl
        bg-card border-2 
        shadow-sm
        transition-premium
        ${isFocused 
          ? 'border-primary/30 shadow-glow' 
          : 'border-border/50 hover:border-border'
        }
      `}
    >
      {/* ========================================
          Text Input - Controlled Component
          ======================================== */}
      <input
        ref={inputRef}
        type="text"
        value={text}              // Value controlled by React state
        onChange={(e) => setText(e.target.value)}  // Update state on every keystroke
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="What needs to be done?"
        className={`
          flex-1 px-4 py-3.5 
          bg-transparent
          text-foreground text-[15px]
          placeholder:text-muted-foreground/60
          focus:outline-none
        `}
      />
      
      {/* ========================================
          Submit Button
          ======================================== */}
      <button
        type="submit"
        disabled={!text.trim()}   // Disabled when input is empty
        className={`
          px-5 py-3.5 rounded-xl
          bg-primary text-primary-foreground
          font-medium text-sm
          transition-premium
          hover:opacity-90 hover-lift
          active:scale-[0.98]
          disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
          focus-ring
          flex items-center gap-2
        `}
      >
        <Plus className="w-5 h-5" strokeWidth={2.5} />
        <span className="hidden sm:inline">Add</span>
      </button>
    </form>
  );
}
