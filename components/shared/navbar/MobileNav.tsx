"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from '@clerk/nextjs'
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="mb-2 flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : " text-dark300_light900 "
              } flex items-center justify-start gap-4 bg-transparent p-4 `}
            >
              <Image
                className={`${isActive ? "" : "invert-colors"}`}
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  const {  userId, sessionId} = useAuth()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="h-6 w-6 cursor-pointer text-black sm:hidden dark:text-white " />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 scrollbar-hidden overflow-y-auto border-none "
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/completed-task.png"
            width={23}
            height={23}
            alt="DevVault"
          />
          <p className="h2-bold text-dark100_light900 ml-2 font-spaceGrotesk">
            Task<span className="text-primary-500 ">App</span>
          </p>
        </Link>

        <div>
          {userId && (<SheetClose asChild>
            <NavContent />
          </SheetClose>)}
          <SignedOut>
            <div className={`flex flex-col justify-center ${userId ? 'h-[1vh]': 'h-[90vh]'} gap-3`}>
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button
                    className=" text-dark400_light900 small-medium light-border-2 btn-tertiary
                   min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
                  >
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;