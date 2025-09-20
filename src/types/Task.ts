export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  completed: boolean;
  dueDate?: Date;
  createdAt: Date;
}

export type TaskFormData = {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: Date;
};