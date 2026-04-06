import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import LinkCard from "./LinkCard";
import TextPercentage from "./PagePercentage";

interface ContentProps {
  content: string;
}

export default function Content({
  content,
}: ContentProps) {
  const contentRef = useRef<HTMLElement>(null);

  // Hydrate link cards after content is loaded
  useEffect(() => {
    if (!content || !contentRef.current) return;

    const linkCardPlaceholders =
      contentRef.current.querySelectorAll("[data-linkcard]");
    linkCardPlaceholders.forEach((placeholder) => {
      const url = placeholder.getAttribute("data-linkcard");
      if (url) {
        const root = createRoot(placeholder);
        root.render(<LinkCard url={url} />);
      }
    });
  }, [content]);

  return (
    <article
      className="w-full h-full px-16 flex flex-col items-center scrollbar-hide"
      ref={contentRef}
    >
      <div className="h-[10vh]" />
      <div
        className="prose w-full max-w-2xl"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <TextPercentage scrollContainerRef={contentRef} />
    </article>
  );
}
