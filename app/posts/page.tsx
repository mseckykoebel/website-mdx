import { getAllPosts } from "~/lib/posts";
import { EntryList } from "~/app/components/EntryList";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="mb-6 text-title text-heading">
        Writing
      </h1>
      <EntryList
        entries={posts.map((post) => ({
          href: `/posts/${post.slug}`,
          title: post.title,
          date: post.date,
        }))}
      />
    </div>
  );
}
