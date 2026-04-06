import { useState, useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafId = useRef(0);

  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0);
    }

    function onScroll() {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateProgress);
    }

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-6 z-40 flex flex-col items-center gap-2" aria-hidden="true">
      <span className="text-[0.6875rem] tabular-nums text-[var(--text-2)] tracking-[0.04em] leading-none select-none w-8 text-center">
        {progress}%
      </span>
    </div>
  );
}
