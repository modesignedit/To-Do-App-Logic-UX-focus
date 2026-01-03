import { useState, useEffect } from 'react';

/**
 * ============================================================
 * useLocalStorage Hook - Persistent State Management
 * ============================================================
 * 
 * WHAT IT DOES:
 * This hook works like useState, but automatically saves data
 * to the browser's localStorage. When the user refreshes the page,
 * the data is still there!
 * 
 * HOW LOCALSTORAGE WORKS:
 * - localStorage is a browser feature that stores key-value pairs
 * - Data persists even after closing the browser
 * - We store data as JSON strings (localStorage only stores strings)
 * 
 * FLOW:
 * 1. On first render: Check localStorage for existing data
 * 2. If found: Parse JSON and use as initial state
 * 3. If not found: Use the provided initialValue
 * 4. Whenever state changes: Save new value to localStorage
 * 
 * @param key - The name/identifier for storing data (like a filename)
 * @param initialValue - Default value if nothing exists in storage
 * @returns [storedValue, setValue] - Same as useState!
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  
  // ========================================
  // STEP 1: Initialize State
  // ========================================
  // useState accepts a function for lazy initialization
  // This function only runs ONCE when the component first mounts
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Try to get existing data from localStorage
      const item = window.localStorage.getItem(key);
      
      // If we found something, parse it from JSON string back to JavaScript
      // JSON.parse('{"text":"Buy milk"}') → {text: "Buy milk"}
      if (item) {
        return JSON.parse(item);
      }
      
      // Nothing found? Use the initial value provided
      return initialValue;
    } catch (error) {
      // If something goes wrong (corrupted data, etc), use initial value
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // ========================================
  // STEP 2: Sync State to localStorage
  // ========================================
  // useEffect runs AFTER the component renders
  // This effect runs whenever 'storedValue' or 'key' changes
  useEffect(() => {
    try {
      // Convert JavaScript object to JSON string
      // {text: "Buy milk"} → '{"text":"Buy milk"}'
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // Handle errors (storage full, private browsing, etc)
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]); // Dependency array - effect runs when these change

  // Return the value and setter, just like useState
  return [storedValue, setStoredValue];
}
