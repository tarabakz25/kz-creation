import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { parse } from "node-html-parser";
import { convertMarkdownToHtml } from "~/lib/markdown";

export const prerender = true;

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { id: post.id },
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ error: "Post ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const posts = await getCollection("blog");
    const entry = posts.find((post) => post.id === id);

    if (!entry) {
      return new Response(JSON.stringify({ error: "Post not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Convert Markdown to HTML using Zenn's processor
    const contentHtml = convertMarkdownToHtml(entry.body ?? '');

    // 見出しを抽出
    const root = parse(contentHtml);
    const headingElements = root.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const headings = headingElements.map((el, index) => {
      const depth = parseInt(el.tagName.substring(1));
      const text = el.text;
      // 日本語も含めて適切なslugを生成
      const slug = `heading-${index + 1}`;

      // IDを設定
      el.setAttribute("id", slug);

      return {
        text,
        slug,
        depth,
      };
    });

    return new Response(
      JSON.stringify({
        title: entry.data.title,
        description: entry.data.description,
        pubDate: entry.data.pubDate.toISOString(),
        content: root.toString(),
        headings,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
