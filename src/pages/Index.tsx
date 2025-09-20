import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Clock, CheckCircle2, Plus, FileText, AlertTriangle, Search, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TaskCard } from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";
import { useTaskManagement } from "@/hooks/useTaskManagement";

const Index = () => {
  const {
    // Timer
    timeRemaining,
    isTimeUp,
    formatTime,
    
    // Tasks
    tasks,
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
  } = useTaskManagement();
  

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Requirements Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 animate-in slide-in-from-left-2 duration-500">
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
            <div className="space-y-6 animate-in slide-in-from-right-2 duration-500">
              {/* Action Bar */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">My Tasks</h2>
                    <p className="text-muted-foreground">
                      {loading ? "Loading..." : 
                       !hasTasks ? "No tasks yet" : 
                       isSearching ? 
                         `${taskStats.filtered} of ${taskStats.total} tasks` :
                         `${taskStats.total} tasks (${taskStats.pending} pending)`}
                    </p>
                  </div>
                  <Button 
                    onClick={handleAddTask}
                    className="bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                    disabled={isTimeUp}
                  >
                    <Plus className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:rotate-90" />
                    Add Task
                  </Button>
                </div>

                {/* Search Bar */}
                {hasTasks && (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search tasks by title, description, or priority..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="pl-10 pr-10 transition-all duration-200 focus:scale-[1.01]"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearSearch}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
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
                  <Card className="border-dashed animate-pulse">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="relative">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary/20"></div>
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent absolute top-0 left-0"></div>
                      </div>
                      <h3 className="text-lg font-medium mb-2 mt-4">Loading tasks...</h3>
                      <p className="text-muted-foreground text-center max-w-sm">
                        Please wait while we load your tasks from storage.
                      </p>
                    </CardContent>
                  </Card>
                ) : !hasTasks ? (
                  <Card className="border-dashed animate-in fade-in-50 duration-500">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="relative mb-4">
                        <CheckCircle2 className="w-12 h-12 text-muted-foreground animate-bounce" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping"></div>
                      </div>
                      <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
                      <p className="text-muted-foreground text-center max-w-sm">
                        Get started by creating your first task. Click the "Add Task" button above.
                      </p>
                    </CardContent>
                  </Card>
                ) : !hasFilteredResults && isSearching ? (
                  <Card className="border-dashed animate-in fade-in-50 duration-500">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Search className="w-12 h-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No tasks found</h3>
                      <p className="text-muted-foreground text-center max-w-sm">
                        No tasks match your search for "{searchQuery}". Try a different search term.
                      </p>
                      <Button
                        variant="outline"
                        onClick={clearSearch}
                        className="mt-4"
                      >
                        Clear search
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {tasks.map((task, index) => (
                      <div
                        key={task.id}
                        className="animate-in slide-in-from-bottom-2 duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <TaskCard
                          task={task}
                          onToggleComplete={handleToggleComplete}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                        />
                      </div>
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