import { useState, useEffect } from 'react';

interface TextPercentageProps {
  scrollContainerRef: React.RefObject<HTMLElement | null>;
}

export default function TextPercentage({ scrollContainerRef }: TextPercentageProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrolled = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollProgress(scrolled);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  return (
    <div className="fixed bottom-8 right-8 z-50 font-mono text-2xl font-bold text-stone-300 tracking-tighter mix-blend-multiply">
      {Math.round(scrollProgress).toString().padStart(3, '0')}%
    </div>
  )
}
