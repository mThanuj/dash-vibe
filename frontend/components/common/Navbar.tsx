import React from "react";
import { Button } from "../ui/button";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <nav className="h-20 bg-white flex items-center justify-between px-3">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-secondary-foreground">
          <Link href="/dashboard">Dash Vibe</Link>
        </h1>
      </div>
      <div className="hidden md:flex gap-2 items-center">
        <Button asChild>
          <Link href="/create-todo">Create Todo</Link>
        </Button>
        <Button>Communities</Button>
        <Button asChild variant={"outline"}>
          <SignOutButton>Log out</SignOutButton>
        </Button>
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Menu</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Welcome to Dash Vibe</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 mt-4">
              <Button asChild>
                <Link href="/create-todo">Create Todo</Link>
              </Button>
              <Button>Communities</Button>
              <Button asChild variant={"outline"}>
                <SignOutButton>Log out</SignOutButton>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
