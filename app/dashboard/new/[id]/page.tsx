import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { redirect } from "next/navigation";
import { editTask, fetchSpecificTaskForUser, } from "@/lib/actions/task.actions";
import { auth } from "@clerk/nextjs/server";


interface EditTaskRouteProps {
  params: { id: string };
}

export default async function EditTaskRoute({ params }: EditTaskRouteProps) {
  const { id  } = params;
  const {userId} = await auth();

  const task = await fetchSpecificTaskForUser(userId!,id);

  async function postData(formData: FormData) {
    "use server";
    if (!userId) {
      throw new Error("Not authenticated");
    }
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;
    const isCompleted = formData.get("isCompleted") === "on"; 
    const priority = formData.get("priority") as "Low" | "Medium" | "High";

    try {
      await editTask({
        taskId:id,
        dueDate: new Date(dueDate),
        priority,
        title,
        isCompleted,
        user: userId,
        description,
      });
      
      redirect(`/dashboard?status=success`);
    } catch (err) {
        redirect(`/dashboard?status=success`);
    }
  }

  return (
    <Card>
      <form action={postData}>
        <CardHeader>
          <CardTitle>Edit Task</CardTitle>
          <CardDescription>Edit your task details below.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col">
            <Label>Title</Label>
            <Input
              required
              type="text"
              name="title"
              placeholder="Title for your task"
              defaultValue={task?.title || ""}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Describe your task"
              required
              defaultValue={task?.description || ""}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Due Date</Label>
            <Input
              type="date"
              name="dueDate"
              required
              defaultValue={task?.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : ""}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Completed</Label>
            <input
              type="checkbox"
              name="isCompleted"
               className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              defaultChecked={task?.isCompleted || false}
              
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Priority</Label>
            <select
              name="priority"
              required
              className="border rounded px-2 py-1"
              defaultValue={task?.priority || "Medium"}
            >
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              <option value="High">High</option>
            </select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild variant="destructive" className="bg-primary-100 dark:text-black">
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <Button className="bg-primary-500">Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
