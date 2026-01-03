/**
 * Core task/todo item type
 */
export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}
