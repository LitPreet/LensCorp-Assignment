'use client'
import { useTaskFilter } from "@/app/context/TaskFilterContext";
import TaskBarChart from "@/components/charts/Chart";


export default function TaskSummary() {
    const { taskData } = useTaskFilter();

  return (
    <div>
     <h1 className="text-3xl md:text-4xl">Your Tasks</h1>
      <TaskBarChart completed={taskData.completed} pending={taskData.pending} all={taskData.all} />
    </div>
  );
}
