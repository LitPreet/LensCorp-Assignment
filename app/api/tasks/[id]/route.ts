import Task from "@/database/task.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest,{ params }: { params: { id: string } }) {
  const { id } = params;
    try {
    if (!id) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
      }
  
      // Connect to the database
      await connectToDatabase();

      // Find all tasks associated with the given userId
      const tasks = await Task.find({ user: id });
    
      return NextResponse.json(tasks);
    } catch (err) {
      return NextResponse.json({ error: "Failed to fetch tasks for the user." }, { status: 500 });
    }
  }

  export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const {id} = params;
  
    try {
      const { userId } = await request.json(); 
  
      if (!userId) {
        return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
      }
  
      await connectToDatabase();
  
      // Check if the task exists and if the current user is the owner
      const task = await Task.findById(id);
  
      if (!task) {
        return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 });
      }
  
      if (task.user.toString() !== userId) {
        return NextResponse.json({ success: false, error: 'You are not authorized to delete this task' }, { status: 403 });
      }
  
      await Task.findByIdAndDelete(id);
  
      return NextResponse.json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      return NextResponse.json({ success: false, error: 'Failed to delete task' }, { status: 500 });
    }
  }

