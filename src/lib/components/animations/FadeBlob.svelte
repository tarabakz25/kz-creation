<script lang="ts">
  import { goto } from '$app/navigation';
  import gsap from 'gsap';
  import { onMount } from 'svelte';

  export let href: string = '';
  export let className: string = '';

  let container: HTMLDivElement;
  let blob: HTMLDivElement;
  let text: HTMLAnchorElement;

  onMount(() => {
    const speed = 0.3;
    gsap.set(blob, { opacity: 0, x: -5 });

    container.addEventListener('mouseenter', () => {
      gsap.to(text, { x: 5, duration: speed });
      gsap.to(blob, { opacity: 1, x: 0, duration: speed });
    });
    container.addEventListener('mouseleave', () => {
      gsap.to(text, { x: 0, duration: speed });
      gsap.to(blob, { opacity: 0, x: -5, duration: speed });
    });

    return () => gsap.killTweensOf([text, blob]); // クリーンアップ
  });

  function handleClick(e: MouseEvent) {
    e.preventDefault();
    goto(href); // SvelteKit 組み込みナビゲーション
  }
</script>

<div bind:this={container} class="py-1 flex items-center">
  <div bind:this={blob} class="w-1.5 h-1.5 bg-white rounded-full mr-1 opacity-0" />
  <a bind:this={text} {href} on:click={handleClick} class={className}>
    <slot />
  </a>
</div>