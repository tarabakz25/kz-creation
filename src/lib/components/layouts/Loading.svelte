<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';

  let tl: gsap.core.Timeline | null = null;

  onMount(() => {
    // ① data-first-visit 属性で初回訪問か判定（Layout側でセットしておく）
    const isFirstVisit = document.documentElement.hasAttribute('data-first-visit');

    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingBg      = document.getElementById('loading-bg');
    const loadingText    = document.getElementById('loading-text');
    const loadingLine    = document.getElementById('loading-line');
    const smoothWrapper  = document.getElementById('smooth-wrapper');

    // ② 2回目以降: 即非表示にしてコンテンツを表示
    if (!isFirstVisit) {
      if (loadingOverlay) loadingOverlay.style.display = 'none';
      if (smoothWrapper)  gsap.set(smoothWrapper, { opacity: 1, y: 0 });
      return;
    }

    // ③ ローディング要素が見つからない場合のフォールバック
    if (!loadingOverlay || !loadingBg || !loadingText || !loadingLine) {
      if (smoothWrapper) gsap.set(smoothWrapper, { opacity: 1, y: 0 });
      return;
    }

    // ④ GSAPタイムラインでアニメーション実行
    tl = gsap.timeline({
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

    tl
      .to(loadingText, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(loadingLine, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, '-=0.3')
      .to(loadingText, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in', delay: 0.3 })
      .to(loadingLine, { opacity: 0, duration: 0.3 }, '-=0.3')
      .to(loadingBg,   { yPercent: -100, duration: 0.8, ease: 'power3.inOut' });
  });

  // ⑤ クリーンアップ（React の return () => tl.kill() に相当）
  onDestroy(() => {
    tl?.kill();
  });
</script>

<!-- ローディングオーバーレイのHTML -->
<div
  id="loading-overlay"
  class="fixed inset-0 z-[100] w-full h-screen pointer-events-none"
>
  <div
    id="loading-bg"
    class="absolute inset-0 bg-[#131313] flex flex-col items-center justify-center"
  >
    <div
      id="loading-text"
      class="font-futura_pt text-2xl tracking-[0.3em] text-white uppercase opacity-0"
      style="transform: translateY(20px)"
    >
      Kz Creation
    </div>
    <div
      id="loading-line"
      class="w-32 h-[1px] bg-white/50 mt-4 origin-left"
      style="transform: scaleX(0)"
    ></div>
  </div>
</div>