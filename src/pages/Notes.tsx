import Menu from '$lib/components/layouts/Menu';
import TitleCard from '$lib/components/layouts/TitleCard';
import PageTransition from '$lib/components/layouts/PageTransition';
import { getAllPosts } from '$lib/utils/posts';

const posts = getAllPosts();

export default function NotesPage() {
  return (
    <PageTransition>
      <main className="h-screen flex justify-between px-[5vw] py-[10vh] overflow-hidden">
        <div className="flex flex-col items-start w-1/3 h-full text-white gap-8">
          <h1
            className="text-3xl tracking-wider"
            style={{ fontFamily: 'var(--font-futura, futura-pt, sans-serif)' }}
          >
            Notes.
          </h1>
          <Menu />
        </div>
        <div className="w-2/3 h-full overflow-y-auto scrollbar-hide flex flex-col gap-6 pb-20 pr-2">
          {posts.length > 0 ? (
            posts.map((post) => <TitleCard key={post.slug} post={post} />)
          ) : (
            <p className="text-[#5f5f5f]" style={{ fontFamily: 'var(--font-sans)' }}>
              No posts yet.
            </p>
          )}
        </div>
      </main>
    </PageTransition>
  );
}
