import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

interface FadeBlobProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function FadeBlob({ href = '', className = '', children }: FadeBlobProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLAnchorElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = containerRef.current;
    const blob = blobRef.current;
    const text = textRef.current;
    if (!container || !blob || !text) return;

    const speed = 0.3;
    gsap.set(blob, { opacity: 0, x: -5 });

    const onEnter = () => {
      gsap.to(text, { x: 5, duration: speed });
      gsap.to(blob, { opacity: 1, x: 0, duration: speed });
    };
    const onLeave = () => {
      gsap.to(text, { x: 0, duration: speed });
      gsap.to(blob, { opacity: 0, x: -5, duration: speed });
    };

    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);

    return () => {
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf([text, blob]);
    };
  }, []);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    navigate(href);
  }

  return (
    <div ref={containerRef} className="py-1 flex items-center">
      <div ref={blobRef} className="w-1.5 h-1.5 bg-white rounded-full mr-1 opacity-0" />
      <a ref={textRef} href={href} onClick={handleClick} className={className}>
        {children}
      </a>
    </div>
  );
}
