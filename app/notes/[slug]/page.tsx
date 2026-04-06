import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Menu from "@/components/layouts/Menu";
import ScrollProgress from "@/components/animations/ScrollProgress";
import { formatDate } from "@/lib/formatDate";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "lib/contents/posts");
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ slug: f.replace(/\.md$/, "") }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "lib/contents/posts", `${slug}.md`);

  if (!fs.existsSync(filePath)) notFound();

  const source = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(source);

  return (
    <>
      <ScrollProgress />
      <main className="min-h-screen flex px-[5vw] py-[10vh] gap-12">
        {/* Left: nav */}
        <div
          className="flex flex-col items-start w-1/3 text-white gap-8 sticky top-[10vh] self-start"
        >
          <h1
            className="text-3xl tracking-wider"
            style={{ fontFamily: "var(--font-futura, futura-pt, sans-serif)" }}
          >
            Notes.
          </h1>
          <Menu />
        </div>

        {/* Right: article */}
        <article className="flex-1 max-w-3xl pb-24">
          <h1 className="mb-2 text-3xl font-bold text-white">{data.title}</h1>
          <p className="mb-10 text-sm text-white/50">{formatDate(String(data.date))}</p>
          <div className="prose">
            <MDXRemote source={content} />
          </div>
        </article>
      </main>
    </>
  );
}
