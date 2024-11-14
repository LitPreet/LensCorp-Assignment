import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Task from "@/database/task.model";
import { connectToDatabase } from "@/lib/mongoose";
import { File, Edit } from "lucide-react";
import Link from "next/link";
import { ITask } from "@/database/task.model";
import { Card } from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";

async function getData(userId: string) {
const data = await Task.find({user:userId});
return data
}

export default async function Dashboard() {
  const { userId } = await auth();
  const tasks = await getData(userId!)
  
  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Your Tasks</h1>
          <p className="text-lg text-muted-foreground">
            Here you can see and create new Tasks
          </p>
        </div>
        <Link href="/dashboard/new">
          <Button className="bg-primary-500">Create a new task</Button>
        </Link>
      </div>
      {true ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">
            You dont have any tasks created
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            You currently dont have any tasks. please create some so that you
            can see them right here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {tasks &&
            tasks.length > 0 &&
            tasks.map((item:ITask) => (
              <Card
                key={item.id}
                className="flex items-center justify-between p-4"
              >
                <div>
                  <h2 className="font-semibold text-xl text-primary">
                    {item.title}
                  </h2>
                  <p>
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "full",
                    }).format(new Date(item.createdAt))}
                  </p>
                </div>

                <div className="flex gap-x-4">
                  <Link href={`/dashboard/new/${item.id}`}>
                    <Button variant="outline" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  {/* <form action={deleteNote}>
                  <input type="hidden" name="noteId" value={item.id} />
                  <TrashDelete />
                </form> */}
                </div>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const {userId} = useAuth();
//   try {
//     await connectToDatabase(); // Ensure DB connection

//     // Fetch tasks for the user
//     const tasks = await Task.find({ userId }).sort({ createdAt: -1 }).lean(); // .lean() for plain JavaScript objects

//     // Pass the tasks to the page component
//     return {
//       props: { tasks }
//     };
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     return {
//       props: { tasks: [] }
//     };
//   }
// };
