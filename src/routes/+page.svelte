<script lang="ts">
  import MenuItem from '$lib/components/MenuItem.svelte';
</script>

<main class="px-[5vw] py-[10vh] h-screen flex justify-between">
  <div class="flex flex-col items-start w-full min-h-screen text-white gap-8">
    <h1 class="text-3xl tracking-wider" style="font-family: var(--font-futura, futura-pt, sans-serif)">
      Welcome to Kz Creation portfolio.
    </h1>
    <MenuItem />
  </div>

  <div class="w-full flex flex-col items-end justify-center text-white">
    <div class="text-right">
      <h1 class="text-3xl italic tracking-wide" style="font-family: var(--font-sans)">
        A thrill-seeking explorer in a wild world
      </h1>
      <p class="text-xl" style="font-family: var(--font-sans)">激動の世を楽しむ探求者</p>
    </div>
  </div>
</main>
