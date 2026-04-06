import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Menu from "@/components/layouts/Menu";
import TitleCard from "@/components/layouts/TitleCard";
import type { Post } from "@/lib/types";

function getPosts(): Post[] {
  const postsDir = path.join(process.cwd(), "lib/contents/posts");
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  const posts: Post[] = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const source = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data } = matter(source);
    return {
      slug,
      title: data.title ?? slug,
      date: String(data.date ?? ""),
      content: "",
    };
  });

  const toDate = (d: string) => {
    const [y, m, day] = d.split("-").map(Number);
    return new Date(y, m - 1, day).getTime();
  };

  return posts.sort((a, b) => toDate(b.date) - toDate(a.date));
}

export default function NotesPage() {
  const posts = getPosts();

  return (
    <main className="h-screen flex justify-between px-[5vw] py-[10vh] overflow-hidden">
      {/* Left: nav */}
      <div className="flex flex-col items-start w-1/3 h-full text-white gap-8">
        <h1
          className="text-3xl tracking-wider"
          style={{ fontFamily: "var(--font-futura, futura-pt, sans-serif)" }}
        >
          Notes.
        </h1>
        <Menu />
      </div>

      {/* Right: posts list */}
      <div className="w-2/3 h-full overflow-y-auto flex flex-col gap-6 pb-20 pr-2">
        {posts.length > 0 ? (
          posts.map((post) => <TitleCard key={post.slug} post={post} />)
        ) : (
          <p className="text-[#5f5f5f]" style={{ fontFamily: "var(--font-sans)" }}>
            No posts yet.
          </p>
        )}
      </div>
    </main>
  );
}
