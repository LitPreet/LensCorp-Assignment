import { SidebarLink } from "@/types/index";

export const themes = [
    { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
    { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
];

export const sidebarLinks: SidebarLink[] = [
    {
        imgURL: "/assets/icons/home.svg",
        route: "/dashboard",
        label: "Home",
    },
    {
        imgURL: "/assets/icons/star.svg",
        route: "/dashboard/task-summary",
        label: "Task Summary",
    },
];

