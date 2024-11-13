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
import { auth } from "@clerk/nextjs/server";

export default async function NewTaskRoute() {
  const { getToken, userId, sessionId } = await auth();

  async function postData(formData: FormData) {
    "use server";
    if (!userId) {
      throw new Error("Not authenticated");
    }
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;
    const priority = formData.get("priority") as "Low" | "Medium" | "High";
    const isCompleted = formData.get("isCompleted") === "true";

    // Placeholder for actual database logic
    // await prisma.task.create({
    //   data: {
    //     userId,
    //     title,
    //     description,
    //     dueDate: new Date(dueDate),
    //     priority,
    //     isCompleted,
    //   },
    // });
    return redirect("/dashboard");
  }

  return (
    <Card>
      <form action={postData}>
        <CardHeader>
          <CardTitle>New Task</CardTitle>
          <CardDescription>
            Right here you can now create your new Task
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col">
            <Label>Title</Label>
            <Input
              required
              type="text"
              name="title"
              placeholder="Title for your task"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Describe your task"
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Due Date</Label>
            <Input type="date" name="dueDate" required />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Priority</Label>
            <select name="priority" required className="border rounded px-2 py-1">
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Mark as Completed</Label>
            <select name="isCompleted" required className="border rounded px-2 py-1">
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild variant="destructive" className="bg-primary-100">
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <Button className="bg-primary-500">Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
}