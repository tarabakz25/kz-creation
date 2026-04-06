<script lang="ts">
  import { onMount } from 'svelte';
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import ThreeBackground from '$lib/components/ThreeBackground.svelte';

  let { children } = $props();

  onMount(() => {
    const d = document;
    const config = {
      kitId: 'vza3sdw',
      scriptTimeout: 3000,
      async: true,
    };

    const h = d.documentElement;
    const t = setTimeout(() => {
      h.className = h.className.replace(/\bwf-loading\b/g, '') + ' wf-inactive';
    }, config.scriptTimeout);

    const tk = d.createElement('script');
    const legacyTk = tk as HTMLScriptElement & {
      onreadystatechange?: ((this: HTMLScriptElement & { readyState?: string }, ev: Event) => unknown) | null;
      readyState?: string;
    };
    let f = false;
    const s = d.getElementsByTagName('script')[0];
    let a: string | undefined;

    h.className += ' wf-loading';
    tk.src = `https://use.typekit.net/${config.kitId}.js`;
    tk.async = true;
    const handleLoad = function (this: HTMLScriptElement & { readyState?: string }) {
      a = this.readyState;
      if (f || (a && a !== 'complete' && a !== 'loaded')) return;
      f = true;
      clearTimeout(t);
      try {
        (window as Window & { Typekit?: { load: (cfg: unknown) => void } }).Typekit?.load(config);
      } catch {
        // no-op
      }
    };
    tk.addEventListener('load', () => handleLoad.call(legacyTk));
    legacyTk.onreadystatechange = function () {
      handleLoad.call(legacyTk);
    };

    s.parentNode?.insertBefore(tk, s);
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Kz Creation</title>
</svelte:head>

<!-- Grid pattern background -->
<div
  class="fixed inset-0 -z-10 pointer-events-none"
  style="
    background-color: #121212;
    background-image:
      linear-gradient(to right, rgba(128,128,128,0.08) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(128,128,128,0.08) 1px, transparent 1px);
    background-size: 6rem 6rem;
  "
></div>

<!-- Three.js stars background -->
<ThreeBackground />

{@render children()}

<!-- Footer -->
<footer class="fixed left-0 bottom-0 w-full px-16 py-5 flex justify-between text-[#5f5f5f] pointer-events-none z-10" style="font-family: var(--font-eurostile, eurostile, sans-serif)">
  <p>A developer</p>
  <p>© Kz Creation</p>
</footer>
