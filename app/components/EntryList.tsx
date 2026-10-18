import Link from "next/link";

import { Badge } from "~/components/ui/badge";

type Entry = {
  href: string;
  title: string;
  date: string;
};

export function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ul className="space-y-2">
      {entries.map((entry, index) => (
        <li key={entry.href}>
          <Link
            href={entry.href}
            className="group flex items-baseline justify-between gap-4"
          >
            <span className="flex items-center gap-2 min-w-0">
              <span className="link-underline text-sm font-medium text-heading group-hover:decoration-current/60">
                {entry.title}
              </span>
              {index === 0 && (
                <Badge variant="outline" className="text-muted-foreground">
                  Latest
                </Badge>
              )}
            </span>
            <time
              dateTime={entry.date}
              className="shrink-0 text-xs tabular-nums text-muted-foreground"
            >
              {new Date(entry.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
