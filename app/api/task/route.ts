import Task from "@/database/task.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
      await connectToDatabase();  // Ensure the DB is connected
      const url = new URL(request.url);
      const userId = url.searchParams.get('userId');
      
      if (!userId) {
        return NextResponse.json({ message: "User ID is required" }, { status: 400 });
      }
      // Fetch tasks for the specific user
      const tasks = await Task.find({ userId }).sort({ createdAt: -1 }); 
     
      return NextResponse.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return NextResponse.json({ message: "Error fetching tasks" }, { status: 500 });
    }
  }


