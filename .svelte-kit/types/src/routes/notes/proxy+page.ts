// @ts-nocheck
import type { Post } from "$lib/utils/types";
import type { PageLoad } from "./$types";

export const load = async () => {
  const modules = import.meta.glob("/src/lib/contents/posts/*.md", {
    eager: true,
  });

  const posts: Post[] = [];

  for (const path in modules) {
    const file = modules[path];
    const slug = path.split("/").pop()?.replace(/\.md$/, "") ?? "";

    if (file && typeof file === "object" && "metadata" in file && slug) {
      const metadata = (file as { metadata: Omit<Post, "slug"> }).metadata;
      posts.push({ ...metadata, slug });
    }
  }

  const toDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d).getTime();
  };
  posts.sort((a, b) => toDate(b.date) - toDate(a.date));

  return { posts };
};
;null as any as PageLoad;