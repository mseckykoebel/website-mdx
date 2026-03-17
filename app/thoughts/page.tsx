import Link from "next/link";

import { getAllThoughts } from "~/lib/thoughts";
import { Badge } from "~/components/ui/badge";

function LatestBadge() {
  return <Badge variant="outline">Latest</Badge>;
}

export default function ThoughtsPage() {
  const thoughts = getAllThoughts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Thoughts
      </h1>
      <div className="space-y-6">
        {thoughts.map((thought, index) => (
          <article key={thought.slug}>
            <Link href={`/thoughts/${thought.slug}`} className="group block">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-medium text-gray-600 group-hover:text-gray-900 transition-colors underline">
                  {thought.title}
                </h2>
                {index === 0 && <LatestBadge />}
              </div>
              <time className="text-md text-gray-500">
                {new Date(thought.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
