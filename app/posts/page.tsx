import Link from "next/link";

import { getAllPosts } from "~/lib/posts";
import { Badge } from "~/components/ui/badge";

function LatestBadge() {
  return <Badge variant="outline">Latest</Badge>;
}

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-xl font-bold mb-6 text-gray-900">
        Writing
      </h1>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <article key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="group block">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-medium text-gray-600 group-hover:text-gray-900 transition-colors underline">
                  {post.title}
                </h2>
                {index === 0 && <LatestBadge />}
              </div>
              <time className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString("en-US", {
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
