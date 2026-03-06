import { error } from '@sveltejs/kit';

export async function load({ params }: { params: { slug: string } }) {
  try {
    const post = await import(`$lib/contents/posts/${params.slug}.md`);
    return {
      post: {
        content: post.default,
        meta: post.metadata,
      }
    };
  } catch {
    throw error(404, 'Post not found');
  }
}