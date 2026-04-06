import type { Post } from './types';

const modules = import.meta.glob('/src/lib/contents/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '');
    data[key] = value;
  }

  return { data, content: raw.slice(match[0].length).trimStart() };
}

function toDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).getTime();
}

export function getAllPosts(): Post[] {
  const posts: Post[] = [];

  for (const path in modules) {
    const raw = modules[path];
    const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? '';
    if (!slug) continue;

    const { data } = parseFrontmatter(raw);
    posts.push({
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      content: raw,
    });
  }

  return posts.sort((a, b) => toDate(b.date) - toDate(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  for (const path in modules) {
    const pathSlug = path.split('/').pop()?.replace(/\.md$/, '');
    if (pathSlug !== slug) continue;

    const raw = modules[path];
    const { data } = parseFrontmatter(raw);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      content: raw,
    };
  }
  return null;
}
