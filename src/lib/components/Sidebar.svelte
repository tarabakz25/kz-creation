<script lang='ts'>
  import { SquareArrowOutUpRight } from '@lucide/svelte';

  export let menu: Record<string, { url: string; external?: boolean }> = {
    'about': { url: 'about/' },
    'notes': { url: 'notes/' },
    'source': { url: 'https://github.com/tarabakz25', external: true },
  }
</script>

<header class="fixed top-1/2 -translate-y-1/2 left-0 z-10 bg-[var(--secondary)] rounded-3xl flex flex-col items-start px-10 py-12 gap-5">
  {#each Object.entries(menu) as [name, item]}
    <a
      href="{item.url}"
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      class="flex items-center gap-1.5 text-xl text-[var(--text-1)] hover:text-[var(--text-0)] transition-colors"
    >
      {name}
      {#if item.external}
        <SquareArrowOutUpRight class="w-3.5 h-3.5" strokeWidth={1.5} />
      {/if}
    </a>
  {/each}
</header>
