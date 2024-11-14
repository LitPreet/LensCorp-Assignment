import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  priority: 'Low' | 'Medium' | 'High';
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: Schema.Types.ObjectId | IUser; // Reference to the User who created the task
}

const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model method to get task statistics for the dashboard
TaskSchema.statics.getTaskStatistics = async function () {
  const totalTasks = await this.countDocuments();
  const completedTasks = await this.countDocuments({ isCompleted: true });
  const pendingTasks = totalTasks - completedTasks;

  return {
    totalTasks,
    completedTasks,
    pendingTasks,
  };
};

const Task = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);

export default Task;
