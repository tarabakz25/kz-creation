interface BlogCardProps {
  id: string;
  title: string;
  description?: string;
  pubDate: string;
}

export default function BlogCard({
  id,
  title,
  description,
  pubDate,
}: BlogCardProps) {
  const formattedDate = new Date(pubDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="w-full">
      <a
        href={`/blog/${id}`}
        className="flex flex-col items-end w-full cursor-pointer"
      >
        <h2 className="text-xl font-sans-jp font-semibold mb-2">{title}</h2>
        <time className="text-sm text-gray-500 font-sans-en">
          {formattedDate}
        </time>
      </a>
    </article>
  );
}
