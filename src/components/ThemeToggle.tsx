import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

/**
 * ============================================================
 * ThemeToggle Component - Light/Dark Mode Switch
 * ============================================================
 * 
 * This component receives:
 * - isDark: boolean indicating current theme
 * - onToggle: function to switch themes
 * 
 * The actual theme logic is in useTheme hook
 * This component is just the visual button
 */
export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        relative p-3 rounded-xl
        bg-secondary/80 
        border border-border/50
        text-secondary-foreground
        hover:bg-muted hover:border-border
        active:scale-95
        transition-premium focus-ring
        shadow-xs
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Container for animated icon transition */}
      <div className="relative w-5 h-5">
        {/* Sun icon - visible in light mode */}
        <Sun 
          className={`
            absolute inset-0 w-5 h-5 
            transition-all duration-500 ease-out
            ${isDark 
              ? 'opacity-0 rotate-180 scale-0' 
              : 'opacity-100 rotate-0 scale-100'
            }
          `} 
          strokeWidth={2}
        />
        {/* Moon icon - visible in dark mode */}
        <Moon 
          className={`
            absolute inset-0 w-5 h-5 
            transition-all duration-500 ease-out
            ${isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-180 scale-0'
            }
          `}
          strokeWidth={2}
        />
      </div>
    </button>
  );
}
