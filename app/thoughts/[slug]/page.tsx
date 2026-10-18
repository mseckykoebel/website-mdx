import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAllThoughts, getThoughtBySlug } from "~/lib/thoughts";
import { CustomMDX } from "~/components/mdx";

type ThoughtPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/** generate static params for all thoughts */
export async function generateStaticParams() {
  const thoughts = getAllThoughts();

  return thoughts.map((thought) => ({
    slug: thought.slug,
  }));
}

/** generate metadata for SEO */
export async function generateMetadata({
  params,
}: ThoughtPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const thought = getThoughtBySlug(resolvedParams.slug);

  if (!thought) return {};

  return {
    title: thought.title,
    description: `Thought: ${thought.title}`,
    openGraph: {
      title: thought.title,
      description: `Thought: ${thought.title}`,
      type: "article",
      publishedTime: thought.date,
      url: `/thoughts/${thought.slug}`,
    },
    twitter: {
      card: "summary",
      title: thought.title,
      description: `Thought: ${thought.title}`,
    },
  };
}

export default async function ThoughtPage({ params }: ThoughtPageProps) {
  const resolvedParams = await params;
  const thought = getThoughtBySlug(resolvedParams.slug);

  if (!thought) notFound();

  return (
    <section className="max-w-2xl mx-auto px-6 py-8">
      <header className="mb-8">
        <h1 className="mb-1 text-title text-heading">
          {thought.title}
        </h1>
        <div className="flex justify-between items-center">
          <time className="text-caption uppercase text-muted-foreground">
            {new Date(thought.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </header>

      {thought.content.trim() ? (
        <article className="prose">
          <CustomMDX source={thought.content} />
        </article>
      ) : null}
    </section>
  );
}
