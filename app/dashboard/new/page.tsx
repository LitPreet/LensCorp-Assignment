import { redirect } from "next/navigation";
import { createTask } from "@/lib/actions/task.actions";
import { auth } from "@clerk/nextjs/server";
import ClientWrapper from "@/components/ui/GetLocationButton";

export default async function NewTaskRoute() {
  const { userId } = await auth();
  
  const serializedTask = {
      title: "", 
      description: "", 
      dueDate: "", 
      priority: "", 
      isCompleted: false, 
      latitude: "", 
      longitude: "",
    };

  async function postData(formData: FormData) {
    "use server";
    if (!userId) {
      throw new Error("Not authenticated");
    }
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;
    const priority = formData.get("priority") as "Low" | "Medium" | "High";
    const latitude = formData.get("latitude") as string;
    const longitude = formData.get("longitude") as string;
    try {
      await createTask({
        dueDate: new Date(dueDate),
        priority: priority,
        title: title,
        user: userId!,
        description: description,
        latitude: latitude,
        longitude: longitude
      });

      return redirect("/dashboard?status=success");
    } catch (err) {
      return redirect("/dashboard?status=error");
    }
  }

  return  <ClientWrapper task={serializedTask} onSubmit={postData} name="new"/>
}
