import ClientWrapper from "@/components/ui/GetLocationButton";
import { redirect } from "next/navigation";
import { editTask, fetchSpecificTaskForUser } from "@/lib/actions/task.actions";
import { auth } from "@clerk/nextjs/server";

interface EditTaskRouteProps {
  params: { id: string };
}

export default async function EditTaskRoute({ params }: EditTaskRouteProps) {
  const { id } = params;
  const { userId } = await auth();
  const task = await fetchSpecificTaskForUser(userId!, id);

  const serializedTask = {
    ...task.toObject(),
    dueDate: task.dueDate.toISOString(),
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
    _id: task._id.toString(),
    user: task.user.toString(),
    latitude: task.location.latitude.toString(),
    longitude: task.location.longitude!.toString(),
  };

  async function postData(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;
    const isCompleted = formData.get("isCompleted") === "on";
    const priority = formData.get("priority") as "Low" | "Medium" | "High";
    const latitude = formData.get("latitude") as string;
    const longitude = formData.get("longitude") as string;

    try {
      await editTask({
        taskId: id,
        dueDate: new Date(dueDate),
        priority,
        title,
        isCompleted,
        user: userId!,
        description,
        latitude,
        longitude,
      });

      redirect(`/dashboard?status=success`);
    } catch (err) {
      redirect(`/dashboard?status=error`);
    }
  }

  return (
    <ClientWrapper task={serializedTask} onSubmit={postData} name="edit" />
  );
}
