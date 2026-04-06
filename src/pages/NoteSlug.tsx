import { useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkFrontmatter from 'remark-frontmatter';
import Menu from '$lib/components/layouts/Menu';
import ScrollProgress from '$lib/components/animations/ScrollProgress';
import PageTransition from '$lib/components/layouts/PageTransition';
import { formatDate } from '$lib/utils/formatDate';
import { getPostBySlug } from '$lib/utils/posts';

export default function NoteSlugPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) return <Navigate to="/notes" replace />;

  return (
    <PageTransition>
      <ScrollProgress />
      <main className="min-h-screen flex px-[5vw] py-[10vh] gap-12">
        <div className="flex flex-col items-start w-1/3 text-white gap-8 sticky top-[10vh] self-start">
          <h1
            className="text-3xl tracking-wider"
            style={{ fontFamily: 'var(--font-futura, futura-pt, sans-serif)' }}
          >
            Notes.
          </h1>
          <Menu />
        </div>
        <article className="flex-1 max-w-3xl pb-24">
          <h1 className="mb-2 text-3xl font-bold text-white">{post.title}</h1>
          <p className="mb-10 text-sm text-white/50">{formatDate(post.date)}</p>
          <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkFrontmatter]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
    </PageTransition>
  );
}
