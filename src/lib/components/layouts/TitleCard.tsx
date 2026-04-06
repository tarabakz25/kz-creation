import { Link } from 'react-router-dom';
import type { Post } from '$lib/utils/types';
import { formatDate } from '$lib/utils/formatDate';

export default function TitleCard({ post }: { post: Post }) {
  return (
    <Link
      to={`/notes/${post.slug}`}
      className="group flex flex-col items-end text-right opacity-70 hover:opacity-100 transition-all duration-300 hover:-translate-x-2.5"
    >
      <span
        className="text-xl text-white tracking-wider leading-none mb-1"
        style={{ fontFamily: 'var(--font-futura, futura-pt, sans-serif)' }}
      >
        {post.title}
      </span>
      <time className="text-xs text-white/50 px-2 py-0.5" style={{ fontFamily: 'var(--font-sans)' }}>
        {formatDate(post.date)}
      </time>
    </Link>
  );
}
