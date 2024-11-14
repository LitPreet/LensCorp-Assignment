import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { ITask } from '@/database/task.model';
import { Toggle } from '../ui/toggle';

interface CardProps{
    item: ITask;
}

const TaskCard = ({ item}:CardProps) => {
  const getPriorityColor = (priority:string) => {
    switch (priority) {
      case 'Low':
        return 'border-yellow-300';
      case 'Medium':
        return 'border-primary-500';
      case 'High':
        return 'border-red-500';
      default:
        return 'border-gray-300';
    }
  };

  const formatDate = (date:string) => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
    }).format(new Date(date));
  };

  return (
    <div className="space-y-4">
        <Card
          key={item.id}
          className={`flex items-center justify-between p-4 border-l-8  ${
            item.priority === "Low"
              ? "border-yellow-300"
              : item.priority === "Medium"
              ? "border-primary-500"
              : "border-red-500"
          }`}
        //   className={`relative border-l-8 ${getPriorityColor(item.priority)}`}
        >
          <div className="p-6 grid grid-cols-[2fr,auto] gap-4">
            {/* Task Content */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-xl text-primary">{item.title}</h2>
                <Badge variant={item.isCompleted ? "default" : "secondary"}>
                  {item.isCompleted ? "Completed" : "Pending"}
                </Badge>
              </div>
              
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Due Date: {formatDate(item.dueDate+'')}</p>
                <p>Created: {formatDate(item.createdAt+'')}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Toggle
                      pressed={item.isCompleted}
                    //   onPressedChange={() => onToggleCompletion(item.id)}
                      className="data-[state=on]:bg-green-500 data-[state=on]:text-white"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Toggle>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mark as {item.isCompleted ? 'incomplete' : 'complete'}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/view/${item.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View details</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/new/${item.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit task</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-destructive hover:text-destructive/90"
                    //   onClick={() => onDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete task</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </Card>
    </div>
  );
};

export default TaskCard;