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
  user: string;
  location?: {
    latitude: string;
    longitude: string;
  };
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
    location: {
      latitude: { type: String},
      longitude: { type: String },
    },
    user: {
      type: String,
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
