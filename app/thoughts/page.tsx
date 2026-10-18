import { getAllThoughts } from "~/lib/thoughts";
import { EntryList } from "~/app/components/EntryList";

export default function ThoughtsPage() {
  const thoughts = getAllThoughts();

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="mb-6 text-title text-heading">
        Thoughts
      </h1>
      <EntryList
        entries={thoughts.map((thought) => ({
          href: `/thoughts/${thought.slug}`,
          title: thought.title,
          date: thought.date,
        }))}
      />
    </div>
  );
}
