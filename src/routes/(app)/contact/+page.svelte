<script lang="ts">
  import MenuItem from '$lib/components/MenuItem.svelte';
</script>

<main class="h-screen flex justify-between px-[5vw] py-[10vh]">
  <div class="flex flex-col items-start w-full min-h-screen text-white gap-8">
    <h1 class="text-3xl tracking-wider" style="font-family: var(--font-futura, futura-pt, sans-serif)">
      Contact.
    </h1>
    <MenuItem />
  </div>

  <div class="w-full flex flex-col items-end justify-center text-white gap-8">
    <div class="text-right space-y-2">
      <p class="text-[#5f5f5f]" style="font-family: var(--font-sans)">Feel free to reach out</p>
      <a
        href="mailto:kizuki.aiki@gmail.com"
        class="text-2xl tracking-wider hover:text-gray-300 transition-colors"
        style="font-family: var(--font-futura, futura-pt, sans-serif)"
      >
        kizuki.aiki@gmail.com
      </a>
    </div>

    <div class="flex flex-col items-end gap-3">
      {#each [
        { name: 'X / Twitter', url: 'https://x.com/kz25_kmc/' },
        { name: 'GitHub', url: 'https://github.com/tarabakz25/' },
        { name: 'Instagram', url: 'https://instagram.com/kizu25_01/' },
      ] as link}
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-white hover:text-gray-300 tracking-wider transition-colors"
          style="font-family: var(--font-futura, futura-pt, sans-serif)"
        >
          {link.name}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      {/each}
    </div>
  </div>
</main>
