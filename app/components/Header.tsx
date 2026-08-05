"use client";

import Link from "next/link";
import { Mail, Github, Rss } from "lucide-react";

import { Button } from "~/components/ui/button";

export function Header() {
  const name = "Mason Secky-Koebel";
  return (
    <header className="flex justify-between items-start max-w-4xl mx-auto p-6 gap-6">
      {/* name (left) */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
        >
          {name}
        </Link>
      </div>

      {/* contact (right) */}
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
      </div>
    </header>
  );
}
