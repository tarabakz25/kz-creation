interface TableOfContentsItem {
  text: string;
  slug: string;
  depth: number;
}

interface TableOfContentsProps {
  title: string;
  pubDate: string;
  headings: TableOfContentsItem[];
  activeHeading: string;
  onHeadingClick: (slug: string) => void;
}

export default function TableOfContents({
  title,
  pubDate,
  headings,
  activeHeading,
  onHeadingClick,
}: TableOfContentsProps) {
  const formattedDate = new Date(pubDate).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <aside className="w-1/3 h-full py-[10vh] flex flex-col gap-6 sticky top-0">
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-sans-jp font-bold leading-tight">
          {title}
        </h1>
        <time className="text-sm text-gray-500 font-sans-jp">
          {formattedDate}
        </time>
      </div>

      {/* 目次 */}
      {headings && headings.length > 0 && (
        <nav className="flex flex-col gap-2 overflow-y-auto max-h-[60vh] toc-scroll">
          <ul className="flex flex-col gap-1.5 list-none">
            {headings.map((heading) => (
              <li
                key={heading.slug}
                className="pl-6 list-none"
              >
                <a
                  href={`#${heading.slug}`}
                  aria-current={
                    activeHeading === heading.slug ? "true" : undefined
                  }
                  className={`text-sm font-sans_jp block rounded-md pl-3 pr-2 py-1 transition-all hover:bg-gray-50 ${
                    activeHeading === heading.slug
                      ? "text-gray-900 font-semibold bg-gray-100 border-gray-900"
                      : "text-gray-500 border-transparent"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    onHeadingClick(heading.slug);
                    document.getElementById(heading.slug)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
}
