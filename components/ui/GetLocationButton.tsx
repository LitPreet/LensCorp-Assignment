"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Label } from "./label";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";
import Link from "next/link";
import { MapPin } from "lucide-react";

interface ClientWrapperProps {
  task: {
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    isCompleted: boolean;
    latitude?: string;
    longitude?: string;
  };
  onSubmit: (formData: FormData) => void;
  name: string;
}

export default function ClientWrapper({
  task,
  onSubmit,
  name,
}: ClientWrapperProps) {
  const [latitude, setLatitude] = useState(task.latitude || "");
  const [longitude, setLongitude] = useState(task.longitude || "");
  const [loading, setLoading] = useState(false);

  const handleGetLocation = async () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("latitude", latitude);
    formData.set("longitude", longitude);
    onSubmit(formData);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          {name === "edit" ? (
            <>
              <CardTitle>Edit Task</CardTitle>
              <CardDescription>Edit your task details below.</CardDescription>
            </>
          ) : (
            <>
              <CardTitle>New Task</CardTitle>
              <CardDescription>
                Right here you can now create your new Task
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col">
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              defaultValue={task.title || ""}
              placeholder="Title for your task"
              required
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
              defaultValue={
                task?.dueDate
                  ? new Date(task.dueDate).toISOString().slice(0, 10)
                  : ""
              }
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

          <div className="flex flex-col gap-y-2">
            <Label>Location</Label>
            <Button
              className="bg-primary-500 w-1/2"
              onClick={handleGetLocation}
              disabled={loading}
            >
              {loading ? "Fetching Location..." : "Get Current Location"}
              {<MapPin />}
            </Button>
            <Input
              type="text"
              name="latitude"
              value={latitude}
              readOnly
              placeholder="Latitude"
            />
            <Input
              type="text"
              name="longitude"
              value={longitude}
              readOnly
              placeholder="Longitude"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild variant="destructive" className="bg-primary-100">
            <Link href="/dashboard" className="dark:text-black">
              Cancel
            </Link>
          </Button>
          <Button className="bg-primary-500">Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
