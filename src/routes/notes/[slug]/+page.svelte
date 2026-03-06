<script lang="ts">
  import { formatDate } from '$lib/utils/formatDate';
  import Menu from '$lib/components/layouts/Menu.svelte';
  import ScrollProgress from '$lib/components/animations/ScrollProgress.svelte';

  export let data;
</script>

<ScrollProgress />

<main class="min-h-screen flex px-[5vw] py-[10vh] gap-12">
  <!-- Left: nav -->
  <div class="flex flex-col items-start w-1/3 text-white gap-8 sticky top-[10vh] self-start">
    <h1 class="text-3xl tracking-wider" style="font-family: var(--font-futura, futura-pt, sans-serif)">
      Notes.
    </h1>
    <Menu />
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