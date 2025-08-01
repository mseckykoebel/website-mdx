import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "~/lib/posts";
import { CustomMDX } from "~/components/mdx";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// generate static params for all posts
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: `Blog post: ${post.title}`,
    openGraph: {
      title: post.title,
      description: `Blog post: ${post.title}`,
      type: "article",
      publishedTime: post.date,
      url: `/posts/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: `Blog post: ${post.title}`,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      {/* structured data for SEO */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            dateModified: post.date,
            description: `Blog post: ${post.title}`,
            url: `/posts/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Mason Secky-Koebel",
            },
          }),
        }}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 tracking-tight">{post.title}</h1>
        <div className="flex justify-between items-center mt-2 mb-4">
          <time className="text-sm text-gray-600">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </header>

      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
