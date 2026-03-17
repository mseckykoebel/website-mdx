import { getAllPosts } from "~/lib/posts";
import { getAllThoughts } from "~/lib/thoughts";

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3005"
    : "https://masonseckykoebel.com";

export default async function sitemap() {
  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.date.split("T")[0],
  }));

  const thoughts = getAllThoughts().map((thought) => ({
    url: `${baseUrl}/thoughts/${thought.slug}`,
    lastModified: thought.date.split("T")[0],
  }));

  const routes = ["", "/posts", "/thoughts"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...posts, ...thoughts];
}
