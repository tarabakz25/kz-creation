<script lang="ts">
  import MenuItem from '$lib/components/MenuItem.svelte';
  import TitleCard from '$lib/components/TitleCard.svelte';

  export let data;
</script>

<main class="h-screen flex justify-between px-[5vw] py-[10vh] overflow-hidden">
  <!-- Left: nav -->
  <div class="flex flex-col items-start w-1/3 h-full text-white gap-8">
    <h1 class="text-3xl tracking-wider" style="font-family: var(--font-futura, futura-pt, sans-serif)">
      Notes.
    </h1>
    <MenuItem />
  </div>

  <!-- Right: posts list -->
  <div class="w-2/3 h-full overflow-y-auto scrollbar-hide flex flex-col gap-6 pb-20 pr-2">
    {#if data.posts && data.posts.length > 0}
      {#each data.posts as post}
        <TitleCard {post} />
      {/each}
    {:else}
      <p class="text-[#5f5f5f]" style="font-family: var(--font-sans)">No posts yet.</p>
    {/if}
  </div>
</main>