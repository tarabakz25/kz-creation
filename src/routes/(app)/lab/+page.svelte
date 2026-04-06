<script lang="ts">
  import MenuItem from '$lib/components/MenuItem.svelte';
  import worksData from '$lib/contents/works.json';

  type Work = (typeof worksData)[0];

  let selectedWork = $state<Work | null>(null);

  // Map image paths to static URLs
  const works = worksData.map((w) => ({
    ...w,
    imageSrc: '/images/works/' + w.image.split('/').pop(),
  }));

  function openWork(work: (typeof works)[0]) {
    selectedWork = work;
  }

  function closeWork() {
    selectedWork = null;
  }
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key === 'Escape') closeWork();
  }}
/>

<main class="h-screen flex justify-between px-[5vw] py-[10vh] overflow-hidden relative">
  <!-- Left: static nav -->
  <div class="flex flex-col items-start w-1/3 h-full text-white gap-8 z-20">
    <h1 class="text-3xl tracking-wider" style="font-family: var(--font-futura, futura-pt, sans-serif)">
      My Works.
    </h1>
    <MenuItem />
  </div>

  <!-- Right: scrollable work list -->
  <div class="w-2/3 h-full overflow-y-auto scrollbar-hide flex flex-col items-end gap-8 pb-20 pr-2">
    {#each works as work}
      <button
        onclick={() => openWork(work)}
        class="group flex flex-col items-end text-right transition-all duration-300 hover:opacity-100 opacity-70 hover:-translate-x-2.5"
      >
        <h2 class="text-2xl text-white tracking-wider leading-none mb-2" style="font-family: var(--font-futura, futura-pt, sans-serif)">
          {work.name}
        </h2>
        <div class="flex gap-2">
          {#each work.tags as tag}
            <span class="text-xs text-white/50 px-2 py-0.5" style="font-family: var(--font-sans)">
              #{tag}
            </span>
          {/each}
        </div>
      </button>
    {/each}
  </div>

  <!-- Popup modal -->
  {#if selectedWork}
    {@const work = works.find((w) => w.name === selectedWork!.name)!}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
      role="button"
      tabindex="0"
      aria-label="Close modal"
      onclick={closeWork}
      onkeydown={(e) => e.key === 'Enter' && closeWork()}
    >
      <div
        class="p-6 md:p-10 rounded-2xl max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row gap-8 bg-white/5 border border-white/10"
        onclick={(e) => e.stopPropagation()}
        role="presentation"
      >
        <!-- Close -->
        <button
          onclick={closeWork}
          class="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Image -->
        <div class="w-full md:w-1/2 aspect-video rounded-lg overflow-hidden border border-white/5 bg-white/5 flex-shrink-0">
          <img src={work.imageSrc} alt={work.name} class="w-full h-full object-cover" />
        </div>

        <!-- Content -->
        <div class="flex flex-col justify-between w-full md:w-1/2 text-white">
          <div>
            <h3 class="text-3xl font-bold mb-4" style="font-family: var(--font-sans)">{work.name}</h3>
            <div class="flex flex-wrap gap-1 mb-6">
              {#each work.tags as tag}
                <span class="text-sm text-white/70 px-2 py-1" style="font-family: var(--font-sans)">
                  #{tag}
                </span>
              {/each}
            </div>
          </div>

          {#if work.url}
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 tracking-wider text-white hover:text-gray-300 transition-colors mt-4 md:mt-0"
              style="font-family: var(--font-sans)"
            >
              <span>Visit Website</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          {:else}
            <div class="text-white/40 tracking-wider text-sm mt-4 md:mt-0" style="font-family: var(--font-sans)">
              No public URL available
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</main>
