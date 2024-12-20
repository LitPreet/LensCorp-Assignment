"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { File, Edit, Trash, Loader, MapPin } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import Shimmer from "@/components/shimmer/Shimmer";
import { useRouter } from "next/navigation";
import PriorityCard from "@/components/cards/PriorityCard";
import { useTaskFilter } from "../context/TaskFilterContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getLocation } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Location {
  address: string;
  city: string;
  country: string;
  state: string;
  street: string;
}

interface ITask {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: "Low" | "Medium" | "High";
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: string;
  location: Location;
}

export default function Dashboard() {
  const { userId } = useAuth();
  const { setTaskData } = useTaskFilter();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true); // Loader for fetching tasks
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null); // Loader for specific delete
  const [error, setError] = useState<string | null>(null);
  const [openTaskIndex, setOpenTaskIndex] = useState<number | null>(null); 
  const BASE = process.env.NEXT_PUBLIC_BASE_URL;
  const { toast } = useToast();
  const router = useRouter();
  const { filter, setFilter } = useTaskFilter();

  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get("status");
    if (status === "success") {
      toast({
        title: "Task Managed Successfully",
        className: "bg-green-500 text-white",
        description: "task managed successfully.",
      });
    } else if (status === "error") {
      toast({
        title: "Task Managed Successfully",
        className: "bg-green-500 text-white",
        description: "task managed successfully.",
      });
    }
  }, [router]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE}/api/tasks/${userId}`);

      setTasks(response.data);

      // Fetch locations for tasks in parallel
      const enrichedTasks = await Promise.all(
        response.data.map(async (task: any) => {
          try {
            const location = await getLocation(
              task.location.longitude,
              task.location.latitude
            );
            return {
              ...task,
              location: location,
            };
          } catch (error) {
            console.error("Error fetching location for task:", task.id, error);
            return { ...task, location: "Unknown Location" }; // Default fallback
          }
        })
      );

      // Categorize tasks after enrichment
      const categorizedTasks = {
        completed: enrichedTasks.filter(
          (task: any) => task.isCompleted === true
        ).length,
        pending: enrichedTasks.filter((task: any) => task.isCompleted === false)
          .length,
        all: enrichedTasks.length,
      };

      setTasks(enrichedTasks);
      setTaskData(categorizedTasks);
    } catch (err: any) {
      console.error("Error fetching tasks:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  console.log(tasks, "jhgx");
  const handleDelete = async (taskId: string) => {
    setDeletingTaskId(taskId);
    try {
      await axios.delete(`${BASE}/api/tasks/${taskId}`, {
        data: { userId },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); // Optimistic update
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
      setDeletingTaskId(null);
    }
  };



  const handleToggle = (index:number) => {
    setOpenTaskIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle the clicked task's tooltip
  };
  const filteredTasks =
    tasks &&
    tasks.length > 0 &&
    tasks.filter((task) => {
      if (filter === "Pending") return !task.isCompleted;
      if (filter === "Completed") return task.isCompleted;
      return true;
    });
  return loading ? (
    <Shimmer />
  ) : (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Your Tasks</h1>
          <p className="sm:text-lg text-sm  text-muted-foreground">
            Here you can see and create new Tasks
          </p>
        </div>
        <Link href="/dashboard/new">
          <Button className="bg-primary-500">Create a new task</Button>
        </Link>
      </div>
      <div className="flex w-full justify-between items-center">
        <PriorityCard />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">Filter Tasks</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-10 dark:bg-black bg-white">
            <DropdownMenuItem onClick={() => setFilter("All")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("Pending")}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("Completed")}>
              Completed
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {!filteredTasks || filteredTasks.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <File className="w-10 h-10 text-primary" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">
            You don’t have any tasks created
          </h2>
          <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
            You currently don’t have any tasks. Please create some so that you
            can see them right here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
          {filteredTasks &&
            filteredTasks.length > 0 &&
            filteredTasks.map((item: ITask,index:number) => (
              <Card
                key={item._id}
                className={`flex flex-col p-4 border-l-8 ${
                  item.priority === "Low"
                    ? "border-yellow-300"
                    : item.priority === "Medium"
                    ? "border-primary-500"
                    : "border-red-500"
                }`}
              >
                <div className="">
                  <div className="flex justify-between w-full">
                    <h2 className="font-semibold text-xl text-primary">
                      {item.title.length > 10
                        ? `${item.title.slice(0, 10)}...`
                        : item.title}
                    </h2>
                    <Badge
                      variant={item.isCompleted ? "default" : "secondary"}
                      className={`bg-blue-600 text-white`}
                    >
                      {item.isCompleted ? "Completed" : "Pending"}
                    </Badge>
                  </div>
                  <p className="my-2 text-sm text-muted-foreground">
                    Due Date:{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                    }).format(new Date(item.dueDate))}
                  </p>
                  <p className="text-sm">
                    Created At:{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    }).format(new Date(item.createdAt))}
                  </p>
                </div>
                <div className="flex gap-x-4 justify-center my-2 items-center">
                  <Link href={`/dashboard/new/${item._id}`}>
                    <Button variant="outline" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <TooltipProvider>
                    <Tooltip   open={openTaskIndex === index}
            onOpenChange={(isOpen) => {
              if (!isOpen && openTaskIndex === index) {
                setOpenTaskIndex(null);
              }
            }}>
                      <TooltipTrigger asChild >
                        <Button variant="outline"  onClick={() => handleToggle(index)}>
                          <MapPin />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="z-10 bg-white text-black dark:bg-black dark:text-white">
                        <p>{item.location.address || item.location.city}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(item._id)}
                    disabled={deletingTaskId === item._id}
                  >
                    {deletingTaskId === item._id ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <Trash className="w-4 h-4 text-red-500" />
                    )}
                  </Button>
                </div>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
