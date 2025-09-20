import { useState } from "react";
import type { Task, TaskFormData } from "@/types/Task";
import { useTasks } from "./useTasks";
import { useTimer } from "./useTimer";

export const useTaskManagement = () => {
  // Timer state
  const { timeRemaining, isTimeUp, formatTime, startTimer, resetTimer } = useTimer(3600); // 60 minutes
  
  // Tasks state management
  const { 
    tasks, 
    loading, 
    addTask, 
    updateTask, 
    toggleTaskComplete, 
    deleteTask, 
    clearAllTasks,
    getTaskById
  } = useTasks();
  
  // UI state
  const [showForm, setShowForm] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Test management functions
  const handleStartTest = () => {
    setTestStarted(true);
    startTimer();
    
    // Add sample tasks for testing if no tasks exist
    if (tasks.length === 0) {
      addTask({
        title: 'Complete technical test',
        description: 'Implement task management application in 60 minutes',
        priority: 'high',
        completed: false,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // Tomorrow
      });
      
      addTask({
        title: 'Review code',
        description: 'Review and optimize the implemented code',
        priority: 'medium',
        completed: false,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // Day after tomorrow
      });
      
      addTask({
        title: 'Document features',
        description: 'Create documentation for implemented features',
        priority: 'low',
        completed: true
      });
    }
  };

  const handleResetTest = () => {
    setTestStarted(false);
    resetTimer();
    clearAllTasks();
    setShowForm(false);
    setEditingTask(null);
    setSearchQuery('');
  };

  // Task management functions
  const handleToggleComplete = (id: string) => {
    toggleTaskComplete(id);
  };

  const handleEditTask = (id: string) => {
    const task = getTaskById(id);
    if (task) {
      setEditingTask(task);
      setShowForm(true);
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  // Form handling functions
  const handleFormSubmit = (taskData: TaskFormData) => {
    if (editingTask) {
      // Update existing task
      updateTask(editingTask.id, taskData);
    } else {
      // Add new task
      addTask({
        ...taskData,
        completed: false
      });
    }
    
    // Reset form state
    setShowForm(false);
    setEditingTask(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  // Search functionality
  const filteredTasks = tasks.filter(task => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query) ||
      task.priority.toLowerCase().includes(query)
    );
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // Computed values
  const taskStats = {
    total: tasks.length,
    pending: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
    filtered: filteredTasks.length
  };

  const isSearching = searchQuery.trim().length > 0;
  const hasTasks = tasks.length > 0;
  const hasFilteredResults = filteredTasks.length > 0;

  return {
    // Timer
    timeRemaining,
    isTimeUp,
    formatTime,
    
    // Tasks
    tasks: filteredTasks,
    loading,
    taskStats,
    
    // UI State
    showForm,
    testStarted,
    editingTask,
    searchQuery,
    
    // Search
    isSearching,
    hasTasks,
    hasFilteredResults,
    
    // Actions
    handleStartTest,
    handleResetTest,
    handleToggleComplete,
    handleEditTask,
    handleDeleteTask,
    handleFormSubmit,
    handleFormCancel,
    handleAddTask,
    handleSearchChange,
    clearSearch
  };
};
