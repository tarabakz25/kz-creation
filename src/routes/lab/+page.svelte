<script lang="ts">
  import Menu from '$lib/components/layouts/Menu.svelte';
  import worksData from '$lib/components/contents/works.json';

  const imagesGlob = import.meta.glob<{ default: string }>(
    '/src/lib/assets/content/works/*.{webp,png,jpg,jpeg}',
    { eager: true },
  );

  const getImage = (path: string): string | null => {
    const normalized = path.replace(/^~\//, '/src/lib/');
    const mod = imagesGlob[normalized];
    return mod ? mod.default : null;
  };

  const works = worksData.map((work) => ({
    ...work,
    imageUrl: getImage(work.image),
  }));

  type Work = (typeof works)[0];

  let selectedWork: Work | null = $state(null);
</script>

<main class="h-screen flex justify-between px-[5vw] py-[10vh] overflow-hidden relative">
  <!-- Left Section: Static -->
  <div class="flex flex-col items-start w-1/3 h-full text-white gap-8 z-20">
    <h1 class="text-3xl font-futura_pt tracking-wider">My Works.</h1>
    <div>
      <Menu />
    </div>
  </div>

  <!-- Right Section: Scrollable List -->
  <div class="w-2/3 h-full overflow-y-auto flex flex-col items-end gap-8 pb-20 pr-2">
    {#each works as work, index (index)}
      <button
        onclick={() => (selectedWork = work)}
        class="group flex flex-col items-end text-right transition-all duration-300 hover:opacity-100 opacity-70"
      >
        {#if selectedWork?.name === work.name}
          <h2 class="text-2xl text-white/30 tracking-wider font-futura_pt leading-none mb-2">
            {work.name}
          </h2>
        {:else}
          <h2 class="text-2xl text-white tracking-wider font-futura_pt leading-none mb-2">
            {work.name}
          </h2>
        {/if}
        <div class="flex gap-2">
          {#each work.tags as tag (tag)}
            <span class="text-xs font-avenir text-white/50 px-2 py-0.5">
              #{tag}
            </span>
          {/each}
        </div>
      </button>
    {/each}
  </div>

  <!-- Popup -->
  {#if selectedWork}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-transparent"
      onclick={() => (selectedWork = null)}
      role="button"
      tabindex="0"
      onkeydown={(e) => e.key === 'Escape' && (selectedWork = null)}
    >
      <div
        class="p-6 md:p-10 rounded-2xl max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row gap-8"
        onclick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        onkeydown={(e) => e.stopPropagation()}
      >
        <!-- Close Button -->
        <button
          onclick={() => (selectedWork = null)}
          aria-label="Close"
          class="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Image -->
        {#if selectedWork.imageUrl}
          <div class="w-full md:w-1/2 aspect-video rounded-lg overflow-hidden border border-white/5 bg-white/5 flex-shrink-0">
            <img
              src={selectedWork.imageUrl}
              alt={selectedWork.name}
              class="w-full h-full object-cover"
            />
          </div>
        {/if}

        <!-- Content -->
        <div class="flex flex-col justify-between w-full {selectedWork.imageUrl ? 'md:w-1/2' : ''} text-white">
          <div>
            <h3 class="text-3xl font-bold font-avenir mb-4">
              {selectedWork.name}
            </h3>
            <div class="flex flex-wrap gap-1 mb-6">
              {#each selectedWork.tags as tag (tag)}
                <span class="text-sm text-white/70 font-avenir px-2 py-1">
                  #{tag}
                </span>
              {/each}
            </div>
          </div>

          {#if selectedWork.url}
            <a
              href={selectedWork.url}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 font-avenir tracking-wider text-white px-6 py-3 hover:text-white/60 transition-colors mt-4 md:mt-0"
            >
              <span>Visit Website</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          {:else}
            <div class="text-white/40 font-avenir tracking-wider text-sm mt-4 md:mt-0">
              No public URL available
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</main>
