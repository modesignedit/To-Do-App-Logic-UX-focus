import { useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

/**
 * Input component for adding new tasks
 * Includes form handling and validation
 */
export function TaskInput({ onAddTask }: TaskInputProps) {
  const [text, setText] = useState('');

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    // Only add if there's actual content
    if (trimmed) {
      onAddTask(trimmed);
      setText(''); // Clear input after adding
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      {/* Text input with focus styles */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-3 rounded-lg bg-card border border-input text-foreground placeholder:text-muted-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent shadow-sm"
      />
      {/* Submit button with hover effect */}
      <button
        type="submit"
        disabled={!text.trim()}
        className="px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-smooth hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed focus-ring shadow-sm hover-lift"
      >
        <Plus className="w-5 h-5" />
      </button>
    </form>
  );
}
