import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loading() {
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const isFirstVisit = document.documentElement.hasAttribute('data-first-visit');

    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingBg = document.getElementById('loading-bg');
    const loadingText = document.getElementById('loading-text');
    const loadingLine = document.getElementById('loading-line');
    const smoothWrapper = document.getElementById('smooth-wrapper');

    if (!isFirstVisit) {
      if (loadingOverlay) loadingOverlay.style.display = 'none';
      if (smoothWrapper) gsap.set(smoothWrapper, { opacity: 1, y: 0 });
      return;
    }

    if (!loadingOverlay || !loadingBg || !loadingText || !loadingLine) {
      if (smoothWrapper) gsap.set(smoothWrapper, { opacity: 1, y: 0 });
      return;
    }

    tlRef.current = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('hasVisited', 'true');
        document.documentElement.removeAttribute('data-first-visit');
        loadingOverlay.style.display = 'none';

        if (smoothWrapper) {
          gsap.fromTo(
            smoothWrapper,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
          );
        }
      },
    });

    tlRef.current
      .to(loadingText, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(loadingLine, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, '-=0.3')
      .to(loadingText, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in', delay: 0.3 })
      .to(loadingLine, { opacity: 0, duration: 0.3 }, '-=0.3')
      .to(loadingBg, { yPercent: -100, duration: 0.8, ease: 'power3.inOut' });

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  return (
    <div
      id="loading-overlay"
      className="fixed inset-0 z-[100] w-full h-screen pointer-events-none"
    >
      <div
        id="loading-bg"
        className="absolute inset-0 bg-[#131313] flex flex-col items-center justify-center"
      >
        <div
          id="loading-text"
          className="font-futura_pt text-2xl tracking-[0.3em] text-white uppercase opacity-0"
          style={{ transform: 'translateY(20px)' }}
        >
          Kz Creation
        </div>
        <div
          id="loading-line"
          className="w-32 h-[1px] bg-white/50 mt-4 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  );
}
