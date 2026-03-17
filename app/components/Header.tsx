"use client";

import Link from "next/link";
import { Mail, Github, Twitter, Rss, Menu } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

function NavLinks() {
  return (
    <>
      <Link
        href="/thoughts"
        className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline"
      >
        Thoughts
      </Link>
      <Link
        href="/posts"
        className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline"
      >
        Writing
      </Link>
    </>
  );
}

export function Header() {
  const name = "Mason Secky-Koebel";
  return (
    <header className="flex justify-between items-start max-w-4xl mx-auto p-6 gap-6">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
        >
          {name}
        </Link>
        {/* Desktop nav - hidden on md and below */}
        <nav className="hidden md:flex gap-4">
          <NavLinks />
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <Link href="mailto:mseckykebel@mail.com" aria-label="Email contact">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Send email"
            className="hover:cursor-pointer"
          >
            <Mail className="h-5 w-5" />
          </Button>
        </Link>
        <Link
          href="https://github.com/mseckykoebel"
          target="_blank"
          aria-label="GitHub profile"
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="Visit GitHub profile"
            className="hover:cursor-pointer"
          >
            <Github className="h-5 w-5" />
          </Button>
        </Link>
        <Link
          href="https://twitter.com/mseckykoebel"
          target="_blank"
          aria-label="Twitter profile"
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="Visit Twitter profile"
            className="hover:cursor-pointer"
          >
            <Twitter className="h-5 w-5" />
          </Button>
        </Link>
        <Link href="/rss" target="_blank" aria-label="RSS feed">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Subscribe to RSS feed"
            className="hover:cursor-pointer"
          >
            <Rss className="h-5 w-5" />
          </Button>
        </Link>

        {/* Hamburger + Sheet - visible on md and below */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="hover:cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-2 pt-4">
              <SheetClose asChild>
                <Link
                  href="/thoughts"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline py-2"
                >
                  Thoughts
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/posts"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline py-2"
                >
                  Writing
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
