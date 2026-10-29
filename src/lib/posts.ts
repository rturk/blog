import { getCollection } from "astro:content";

// Drafts show up in `npm run dev` but never in a production build.
export async function getPosts() {
  const posts = await getCollection("posts", ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date, style: "short" | "long" = "long") {
  if (style === "short") return date.toLocaleDateString("en-US", { year: "numeric", month: "short", timeZone: "UTC" });
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export function readingTime(body = "") {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 230))} min read`;
}
