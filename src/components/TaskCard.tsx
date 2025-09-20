import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2, Calendar } from "lucide-react";
import { Task, Priority } from "@/types/Task";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case 'high':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'medium':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'low':
      return 'bg-success/10 text-success border-success/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getPriorityLabel = (priority: Priority) => {
  switch (priority) {
    case 'high':
      return 'High';
    case 'medium':
      return 'Medium';
    case 'low':
      return 'Low';
    default:
      return priority;
  }
};

export const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) => {
  return (
    <Card className={`transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
      task.completed ? 'opacity-75 bg-muted/30' : 'hover:bg-card/50'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggleComplete(task.id)}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold text-lg leading-tight ${
                task.completed ? 'line-through text-muted-foreground' : ''
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 ${
                  task.completed ? 'text-muted-foreground' : 'text-muted-foreground'
                }`}>
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task.id)}
              className="h-8 w-8 p-0 transition-all duration-200 hover:bg-primary/10 hover:scale-110"
              aria-label={`Edit task: ${task.title}`}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-200 hover:scale-110"
              aria-label={`Delete task: ${task.title}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Badge 
            variant="outline" 
            className={`${getPriorityColor(task.priority)} text-xs font-medium`}
          >
            {getPriorityLabel(task.priority)}
          </Badge>
          
          {task.dueDate && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span className="text-xs">
                {format(new Date(task.dueDate), 'dd/MM/yyyy')}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};