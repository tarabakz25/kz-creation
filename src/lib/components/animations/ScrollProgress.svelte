<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  let progress = $state(0);
  let rafId: number;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
  }

  function onScroll() {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(updateProgress);
  }

  onMount(() => {
    if (!browser) return;
    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
  });

  onDestroy(() => {
    if (!browser) return;
    window.removeEventListener('scroll', onScroll);
    cancelAnimationFrame(rafId);
  });
</script>

{#if browser}
<div class="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2" aria-hidden="true">
  <span class="text-[0.6875rem] tabular-nums text-[var(--text-2)] tracking-[0.04em] leading-none select-none w-8 text-center">
    {progress}%
  </span>
</div>
{/if}
