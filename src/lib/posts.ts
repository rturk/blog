import { getCollection } from "astro:content";

// Drafts show up in `npm run dev` but never in a production build.
export async function getPosts() {
  const posts = await getCollection("posts", ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date, style: "month" | "long" = "long") {
  if (style === "month") return date.toISOString().slice(0, 7);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
