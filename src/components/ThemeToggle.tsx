import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

/**
 * Theme toggle button with smooth icon transition
 * Switches between sun and moon icons based on current theme
 */
export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-muted transition-smooth focus-ring"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Icon transitions with scale animation */}
      <div className="relative w-5 h-5">
        <Sun 
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`} 
        />
        <Moon 
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`} 
        />
      </div>
    </button>
  );
}
