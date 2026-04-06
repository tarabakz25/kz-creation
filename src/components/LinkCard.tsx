import { useEffect, useState } from "react";

interface LinkMetadata {
  title: string;
  description: string;
  image?: string;
  domain: string;
}

export default function LinkCard({ url }: { url: string }) {
  const [metadata, setMetadata] = useState<LinkMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/link-metadata?url=${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((data) => {
        setMetadata(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [url]);

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-32 rounded-lg my-4" />;
  }

  if (!metadata) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 underline"
      >
        {url}
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block my-4 p-4 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors no-underline"
    >
      <div className="flex gap-4">
        {metadata.image && (
          <img
            src={metadata.image}
            alt={metadata.title}
            className="w-24 h-24 object-cover rounded flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-sans_jp font-semibold text-gray-900 text-lg mb-1 truncate">
            {metadata.title}
          </h3>
          <p className="font-sans_jp text-sm text-gray-600 line-clamp-2 mb-2">
            {metadata.description}
          </p>
          <p className="font-sans_en text-xs text-gray-500">
            {metadata.domain}
          </p>
        </div>
      </div>
    </a>
  );
}
