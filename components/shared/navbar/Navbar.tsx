import Image from "next/image";
import Link from "next/link";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-md sm:px-12 dark:shadow-none">
      <Link href="/" className="flex">
        <Image
          src="/assets/images/completed-task.png"
          width={30}
          height={23}
          alt="DevOverFlow"
        />
        <p className="h2-bold ml-2 font-spaceGrotesk text-dark-100 max-sm:hidden dark:text-light-900">
          Task<span className="text-primary-500 ">App</span>
        </p>
      </Link>
     
      <div className="flex-between gap-5">
      <SignedOut>
        <div className="flex  gap-3 pt-2">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="log-in"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>
        </div>
      </SignedOut>
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
