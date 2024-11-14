import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const Shimmer = () => {
  return (
    <section>
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
      <div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5 ">
        <Skeleton className="h-14 flex-1" />
        <div className="hidden max-md:block">
          <Skeleton className="h-14 w-28" />
        </div>
      </div>

      <div className="my-10 hidden flex-wrap gap-6 md:flex ">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-40" />
      </div>

      <div className="flex flex-col gap-6 ">
        {[1, 2, 3, 4, 5, 6, 10].map((item) => (
          <Skeleton key={item} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default Shimmer;