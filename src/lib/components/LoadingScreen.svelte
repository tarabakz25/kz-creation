<script lang="ts">
  import { fade } from 'svelte/transition';

  let { loaded, total }: { loaded: number; total: number } = $props();

  const progress = $derived(total === 0 ? 100 : Math.round((loaded / total) * 100));
  const isDone = $derived(total === 0 || loaded >= total);
</script>

{#if !isDone}
  <div
    class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-950"
    out:fade={{ duration: 600 }}
  >
    <!-- Site name -->
    <p class="mb-10 text-xs tracking-[0.4em] text-neutral-400 uppercase font-light select-none">
      Gallery
    </p>

    <!-- Progress bar track -->
    <div class="w-40 h-px bg-neutral-800 overflow-hidden">
      <div
        class="h-full bg-neutral-300 transition-[width] duration-300 ease-out"
        style="width: {progress}%"
      ></div>
    </div>

    <!-- Count -->
    <p class="mt-4 text-[10px] tracking-widest text-neutral-600 tabular-nums select-none">
      {loaded}&nbsp;/&nbsp;{total}
    </p>
  </div>
{/if}
