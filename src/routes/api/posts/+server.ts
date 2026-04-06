import { json } from '@sveltejs/kit';
import type { Post } from '$lib/utils/types';

function importPosts(): Post[] {
	const modules = import.meta.glob('/src/lib/contents/posts/*.md', {
		eager: true
	});

	const posts: Post[] = [];

	for (const path in modules) {
		const file = modules[path];
		const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? '';

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = (file as { metadata: Omit<Post, 'slug'> }).metadata;
			const post: Post = { ...metadata, slug };

			posts.push(post);
		}
	}

	const toDate = (dateStr: string) => {
		const [y, m, d] = dateStr.split('-').map(Number);
		return new Date(y, m - 1, d).getTime();
	};
	posts.sort((a, b) => toDate(b.date) - toDate(a.date));

	return posts;
}

export function GET() {
	const posts = importPosts();
	return json(posts);
}