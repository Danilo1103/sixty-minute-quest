import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle2, Plus, FileText, AlertTriangle } from "lucide-react";
import { useTimer } from "@/hooks/useTimer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TaskCard } from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";
import type { Task, Priority, TaskFormData } from "@/types/Task";
import { useTasks } from "@/hooks/useTasks";

const Index = () => {
  // State management with localStorage persistence
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
  
  const [showForm, setShowForm] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const { timeRemaining, isTimeUp, formatTime, startTimer, resetTimer } = useTimer(3600); // 60 minutes
  
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
                60-Minute Frontend Test
              </h1>
              <p className="text-muted-foreground mt-2">
                Build a Task Management Application
              </p>
            </div>
            <div className="flex items-center gap-4">
              {!testStarted ? (
                <Button onClick={handleStartTest} size="lg" className="bg-primary hover:bg-primary/90">
                  Start Test
                </Button>
              ) : (
                <>
                  <div className={`flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full ${
                    timeRemaining <= 300 ? 'bg-destructive/20 text-destructive' : 
                    timeRemaining <= 900 ? 'bg-warning/20 text-warning' : 
                    'bg-muted text-muted-foreground'
                  }`}>
                    <Clock className="w-4 h-4" />
                    <span>Time Remaining: {formatTime(timeRemaining)}</span>
                  </div>
                  <Button onClick={handleResetTest} variant="outline" size="sm">
                    Reset Test
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Time Up Alert */}
        {isTimeUp && (
          <Alert className="mb-6 border-destructive bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive font-medium">
              Time's up! The 60-minute test period has ended. Please stop coding and review your work.
            </AlertDescription>
          </Alert>
        )}
        
        {/* Test Not Started State */}
        {!testStarted && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="max-w-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Ready to Start Your 60-Minute Test?</CardTitle>
                <CardDescription className="text-lg">
                  Once you click "Start Test", the timer will begin and you'll have exactly 60 minutes to complete the task management application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">What you'll be building:</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• TaskCard component with proper TypeScript interfaces</li>
                    <li>• CRUD operations with localStorage persistence</li>
                    <li>• Validated task form with error handling</li>
                    <li>• Responsive design with smooth animations</li>
                    <li>• One advanced feature (search, sort, or drag & drop)</li>
                  </ul>
                </div>
                <div className="flex justify-center pt-4">
                  <Button onClick={handleStartTest} size="lg" className="bg-primary hover:bg-primary/90">
                    <Clock className="w-4 h-4 mr-2" />
                    Start 60-Minute Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Test Content - Only show when test is started */}
        {testStarted && (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Requirements Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Test Requirements
                </CardTitle>
                <CardDescription>
                  Complete these features within 60 minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">✅ Project Setup (5min)</h4>
                  <p className="text-xs text-muted-foreground">Understanding the codebase and technologies</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">🔲 TaskCard Component (15min)</h4>
                  <p className="text-xs text-muted-foreground">Create reusable task display component</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">🔲 State Management (10min)</h4>
                  <p className="text-xs text-muted-foreground">CRUD operations with localStorage</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">🔲 Task Form (15min)</h4>
                  <p className="text-xs text-muted-foreground">Form with validation and error handling</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">🔲 Styling & UX (10min)</h4>
                  <p className="text-xs text-muted-foreground">Animations, responsive design, accessibility</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">🔲 Advanced Feature (5min)</h4>
                  <p className="text-xs text-muted-foreground">Search, sort, or drag & drop</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Application Area */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Action Bar */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">My Tasks</h2>
                  <p className="text-muted-foreground">
                    {loading ? "Loading..." : 
                     tasks.length === 0 ? "No tasks yet" : 
                     `${tasks.length} tasks (${tasks.filter(t => !t.completed).length} pending)`}
                  </p>
                </div>
                <Button 
                  onClick={handleAddTask}
                  className="bg-primary hover:bg-primary/90"
                  disabled={isTimeUp}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>

              {/* TaskForm component */}
              {showForm && (
                <TaskForm
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                  initialData={editingTask ? {
                    title: editingTask.title,
                    description: editingTask.description,
                    priority: editingTask.priority,
                    dueDate: editingTask.dueDate
                  } : undefined}
                  isEditing={!!editingTask}
                />
              )}

              {/* Task List Area */}
              <div className="space-y-4">
                {loading ? (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                      <h3 className="text-lg font-medium mb-2">Loading tasks...</h3>
                      <p className="text-muted-foreground text-center max-w-sm">
                        Please wait while we load your tasks from storage.
                      </p>
                    </CardContent>
                  </Card>
                ) : tasks.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <CheckCircle2 className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
                      <p className="text-muted-foreground text-center max-w-sm">
                        Get started by creating your first task. Click the "Add Task" button above.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {tasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onToggleComplete={handleToggleComplete}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Getting Started Instructions:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">1. Create TypeScript Interfaces</h4>
                  <p className="text-muted-foreground">Define the Task interface with proper types</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">2. Build TaskCard Component</h4>
                  <p className="text-muted-foreground">Display task info with edit/delete actions</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">3. Implement State Management</h4>
                  <p className="text-muted-foreground">CRUD operations with localStorage persistence</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">4. Create Task Form</h4>
                  <p className="text-muted-foreground">Validated form with error handling</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm">
                  <strong>💡 Pro tip:</strong> Focus on functionality first, then polish the styling. 
                  Use the design system tokens (priority.high, priority.medium, priority.low) for consistent colors.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default Index;