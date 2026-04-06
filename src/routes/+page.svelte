<script lang="ts">
  import type { PageData } from "./$types";
  import type { Photo } from "$lib/types/photo";
  import LoadingScreen from "$lib/components/LoadingScreen.svelte";

  let { data }: { data: PageData } = $props();

  let selectedPhoto = $state<Photo | null>(null);
  let selectedIndex = $state(-1);
  let imageLoaded = $state(false);

  let loadedCount = $state(0);
  const totalCount = $derived(data.photos.length);

  function onImageSettle() {
    loadedCount++;
  }

  function openLightbox(photo: Photo, index: number) {
    selectedPhoto = photo;
    selectedIndex = index;
    imageLoaded = false;
  }

  function closeLightbox() {
    selectedPhoto = null;
    selectedIndex = -1;
  }

  function navigate(direction: 1 | -1) {
    const next = selectedIndex + direction;
    if (next >= 0 && next < data.photos.length) {
      selectedPhoto = data.photos[next];
      selectedIndex = next;
      imageLoaded = false;
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!selectedPhoto) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") navigate(1);
    if (e.key === "ArrowLeft") navigate(-1);
  }

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<LoadingScreen loaded={loadedCount} total={totalCount} />

<div class="min-h-screen bg-neutral-950 text-white">
  <main class="px-4 py-8">
    {#if data.photos.length === 0}
      <div
        class="flex flex-col items-center justify-center py-32 text-neutral-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-16 h-16 mb-4 opacity-30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p class="text-sm tracking-widest uppercase">No photos found</p>
      </div>
    {:else}
      <!-- Masonry grid -->
      <div class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3">
        {#each data.photos as photo, i}
          <button
            type="button"
            class="group relative w-full mb-3 break-inside-avoid overflow-hidden rounded-sm cursor-pointer block bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onclick={() => openLightbox(photo, i)}
          >
            <img
              src={photo.imageUrl}
              alt={photo.title ?? photo.slug}
              class="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
              onload={onImageSettle}
              onerror={onImageSettle}
            />
            <!-- Hover overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left"
            >
              {#if photo.title}
                <p class="text-sm font-medium text-white leading-snug">
                  {photo.title}
                </p>
              {/if}
              <div class="flex items-center gap-2 mt-1 text-neutral-300">
                <span class="text-xs">{formatDate(photo.date)}</span>
                {#if photo.location}
                  <span class="text-neutral-500">·</span>
                  <span class="text-xs">{photo.location}</span>
                {/if}
              </div>
            </div>
          </button>
        {/each}
      </div>
    {/if}
  </main>
</div>

<!-- Lightbox -->
{#if selectedPhoto}
  <!-- Backdrop -->
  <div
    role="dialog"
    aria-modal="true"
    aria-label={selectedPhoto.title ?? selectedPhoto.slug}
    tabindex="-1"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
    onclick={closeLightbox}
    onkeydown={(e) => e.key === "Escape" && closeLightbox()}
  >
    <!-- Close button -->
    <button
      type="button"
      class="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
      onclick={closeLightbox}
      aria-label="閉じる"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <!-- Prev button -->
    {#if selectedIndex > 0}
      <button
        type="button"
        class="absolute left-4 z-10 p-2 text-neutral-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
        onclick={(e) => {
          e.stopPropagation();
          navigate(-1);
        }}
        aria-label="前の写真"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    {/if}

    <!-- Next button -->
    {#if selectedIndex < data.photos.length - 1}
      <button
        type="button"
        class="absolute right-4 z-10 p-2 text-neutral-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
        onclick={(e) => {
          e.stopPropagation();
          navigate(1);
        }}
        aria-label="次の写真"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    {/if}

    <!-- Image + metadata -->
    <div
      class="flex flex-col items-center max-w-5xl w-full px-16 gap-4"
      onclick={(e) => e.stopPropagation()}
      role="presentation"
    >
      <!-- Skeleton while loading -->
      {#if !imageLoaded}
        <div
          class="w-full max-h-[75vh] min-h-48 bg-neutral-800 animate-pulse rounded-sm"
        ></div>
      {/if}

      {#key selectedPhoto.imageUrl}
        <img
          src={selectedPhoto.imageUrl}
          alt={selectedPhoto.title ?? selectedPhoto.slug}
          class="max-h-[75vh] max-w-full w-auto object-contain rounded-sm transition-opacity duration-300"
          class:opacity-0={!imageLoaded}
          class:opacity-100={imageLoaded}
          onload={() => (imageLoaded = true)}
        />
      {/key}

      <!-- Metadata -->
      {#if imageLoaded}
        <div class="flex items-center gap-3 text-sm text-neutral-400">
          {#if selectedPhoto.title}
            <span class="text-neutral-200 font-medium"
              >{selectedPhoto.title}</span
            >
            <span class="text-neutral-600">·</span>
          {/if}
          <span>{formatDate(selectedPhoto.date)}</span>
          {#if selectedPhoto.location}
            <span class="text-neutral-600">·</span>
            <span>{selectedPhoto.location}</span>
          {/if}
          <span class="text-neutral-600">·</span>
          <span class="text-neutral-600 text-xs"
            >{selectedIndex + 1} / {data.photos.length}</span
          >
        </div>
      {/if}
    </div>
  </div>
{/if}
