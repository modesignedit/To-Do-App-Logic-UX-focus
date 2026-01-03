import { useState, useEffect } from 'react';

/**
 * Custom hook for persisting state to localStorage
 * Automatically syncs state changes to localStorage and handles hydration
 * 
 * @param key - The localStorage key to use
 * @param initialValue - Default value if nothing exists in localStorage
 * @returns [storedValue, setValue] - Tuple similar to useState
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Parse stored JSON or return initialValue if nothing exists
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error (e.g., invalid JSON), return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage whenever storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
