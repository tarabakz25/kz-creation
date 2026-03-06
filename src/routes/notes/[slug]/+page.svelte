<script lang="ts">
  import { formatDate } from '$lib/utils/formatDate';
  import MenuItem from '$lib/components/MenuItem.svelte';

  export let data;
</script>

<main class="min-h-screen flex px-[5vw] py-[10vh] gap-12">
  <!-- Left: nav -->
  <div class="flex flex-col items-start w-48 shrink-0 text-white gap-8 pt-1">
    <h1 class="text-xl tracking-wider" style="font-family: var(--font-futura, futura-pt, sans-serif)">
      Notes.
    </h1>
    <MenuItem />
  </div>

  <!-- Right: article -->
  <article class="flex-1 max-w-3xl pb-24">
    <h1 class="mb-2 text-3xl font-bold text-white">{data.post.meta.title}</h1>
    <p class="mb-10 text-sm text-white/50">{formatDate(data.post.meta.date)}</p>

    <div class="prose">
      <svelte:component this={data.post.content} />
    </div>
  </article>
</main>