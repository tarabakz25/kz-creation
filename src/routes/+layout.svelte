<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { fade, fly } from 'svelte/transition';
	import { navigating } from '$app/state';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

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
</svelte:head>

{#key $page.url.pathname}
  <div
    in:fly={{ y: 20, duration: 400, opacity: 0 }}
    out:fade={{ duration: 200 }}
  >
    <slot />
  </div>
{/key}
