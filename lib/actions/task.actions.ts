// src/app/actions/taskActions.ts
import Task from '@/database/task.model';
import { IUser } from '@/database/user.model';
import { connectToDatabase } from '../mongoose';

interface CreateTaskInput {
  title: string;
  description?: string;
  dueDate: Date;
  priority?: 'Low' | 'Medium' | 'High';
  user: string; 
  latitude: string;
  longitude: string;
}

export async function createTask(input: CreateTaskInput) {
  try {
    connectToDatabase();
    const newTask = await Task.create({
      title: input.title,
      description: input.description || '',
      dueDate: input.dueDate,
      priority: input.priority || 'Medium',
      isCompleted: false,
      user: input.user, 
      location: {                
        latitude: input.latitude,
        longitude: input.longitude,
      },
    });

    await newTask.save();
    return { success: true, task: newTask };
  } catch (error) {
    console.error('Error creating task:', error);
    return { success: false, error: 'Failed to create task' };
  }
}

interface UpdateTaskInput {
  taskId: string;
  title?: string;
  description?: string;
  dueDate?: Date;
  priority?: 'Low' | 'Medium' | 'High';
  isCompleted?: boolean;
  user: string; 
  latitude: string;
  longitude: string;
}

export const fetchTasksForUser = async (userId: string) => {
    try {
      // Find all tasks associated with the given userId
      const tasks = await Task.find({ user: userId });
  
      return tasks;
    } catch (err) {
      console.error("Error fetching tasks for user:", err);
      throw new Error("Failed to fetch tasks for the user.");
    }
  };

  export const fetchSpecificTaskForUser = async (userId: string, taskId: string) => {
    try {
      await connectToDatabase();
      // Find the specific task associated with the given userId and taskId
      const task = await Task.findOne({ user: userId, _id: taskId });
  
      if (!task) {
        console.warn(`Task with ID ${taskId} for user ${userId} not found.`);
        return null; // Return null instead of throwing an error
      }
  
      return task;
    } catch (err) {
      console.error("Error fetching task for user:", err);
      return null; // Return null on error as well to avoid throwing an error
    }
  };
  
  

// Edit task details
export async function editTask(input: UpdateTaskInput) {
    try {
      await connectToDatabase();

      const task = await Task.findById(input.taskId);
  
      if (!task) {
        return { success: false, error: "Task not found" };
      }
  
      
      if (task.user.toString() !== input.user.toString()) {
        return { success: false, error: "You are not authorized to edit this task" };
      }
  
      
      task.title = input.title;
      task.description = input.description;
      task.dueDate = input.dueDate;
      task.priority = input.priority;
      task.isCompleted = input.isCompleted;
      task.location.latitude=input.latitude;
      task.location.longitude=input.latitude;
  
      // Save and return the updated task
      const updatedTask = await task.save();
      return { success: true, task: updatedTask };
  
    } catch (error) {
      console.error("Error updating task:", error);
      return { success: false, error: "Failed to update task" };
    }
  }
  

// Delete a task
export async function deleteTask(taskId: string, userId: string) {
  try {
    await connectToDatabase();

    // Check if the task exists and if the current user is the owner
    const task = await Task.findById(taskId);

    if (!task) {
      return { success: false, error: 'Task not found' };
    }

    if (task.user.toString() !== userId.toString()) {
      return { success: false, error: 'You are not authorized to delete this task' };
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    return { success: true, task: deletedTask };
  } catch (error) {
    console.error('Error deleting task:', error);
    return { success: false, error: 'Failed to delete task' };
  }
}

// Update the completion status of a task
export async function updateTaskStatus(taskId: string, isCompleted: boolean, userId: string) {
  try {
    await connectToDatabase();
    const task = await Task.findById(taskId);

    if (!task) {
      return { success: false, error: 'Task not found' };
    }

    if (task.user.toString() !== userId.toString()) {
      return { success: false, error: 'You are not authorized to update the status of this task' };
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { isCompleted },
      { new: true }
    );

    return { success: true, task: updatedTask };
  } catch (error) {
    console.error('Error updating task status:', error);
    return { success: false, error: 'Failed to update task status' };
  }
}

