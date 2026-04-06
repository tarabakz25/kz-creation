import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const targetUrl = url.searchParams.get("url");

  if (!targetUrl) {
    return new Response(
      JSON.stringify({ error: "URL is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const response = await fetch(targetUrl);
    const html = await response.text();

    // Extract Open Graph metadata
    const titleMatch = html.match(/<meta property="og:title" content="([^"]*)"/) ||
                      html.match(/<title>([^<]*)<\/title>/);
    const descriptionMatch = html.match(/<meta property="og:description" content="([^"]*)"/);
    const imageMatch = html.match(/<meta property="og:image" content="([^"]*)"/);

    const urlObj = new URL(targetUrl);

    return new Response(
      JSON.stringify({
        title: titleMatch?.[1] || targetUrl,
        description: descriptionMatch?.[1] || "",
        image: imageMatch?.[1],
        domain: urlObj.hostname,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching link metadata:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch metadata" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
