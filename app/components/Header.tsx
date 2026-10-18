"use client";

import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { Mail, Github, Rss } from "lucide-react";

import { Button } from "~/components/ui/button";

export function Header({ ...props }: ComponentPropsWithoutRef<"header">) {
  const name = "Mason Secky-Koebel";
  return (
    <header
      className="flex justify-between items-center max-w-2xl mx-auto p-6 gap-6"
      {...props}
    >
      {/* name (left) */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-base font-medium tracking-snug text-heading transition-colors hover:text-foreground"
        >
          {name}
        </Link>
      </div>

      {/* contact (right) */}
      <div className="flex items-center gap-1">
        <Link href="mailto:mseckykebel@mail.com" aria-label="Email contact">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Send email"
            className="text-muted-foreground hover:cursor-pointer hover:text-foreground"
          >
            <Mail className="size-4" />
          </Button>
        </Link>
        <Link
          href="https://github.com/mseckykoebel"
          target="_blank"
          aria-label="GitHub profile"
        >
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Visit GitHub profile"
            className="text-muted-foreground hover:cursor-pointer hover:text-foreground"
          >
            <Github className="size-4" />
          </Button>
        </Link>
        <Link href="/rss" target="_blank" aria-label="RSS feed">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Subscribe to RSS feed"
            className="text-muted-foreground hover:cursor-pointer hover:text-foreground"
          >
            <Rss className="size-4" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
