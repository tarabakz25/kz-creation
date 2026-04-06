<script lang="ts">
  import gsap from 'gsap';

  const menuItems = [
    { title: 'top', url: '/' },
    { title: 'about', url: '/about' },
    { title: 'lab', url: '/lab' },
    { title: 'notes', url: '/notes' },
    { title: 'contact', url: '/contact' },
  ];

  function fadeBlob(container: HTMLElement) {
    const blob = container.querySelector<HTMLElement>('.blob-dot');
    const text = container.querySelector<HTMLElement>('.blob-text');
    if (!blob || !text) return {};

    const speed = 0.3;
    gsap.set(blob, { opacity: 0, x: -5 });

    const onEnter = () => {
      gsap.to(text, { x: 5, duration: speed });
      gsap.to(blob, { opacity: 1, x: 0, duration: speed });
    };
    const onLeave = () => {
      gsap.to(text, { x: 0, duration: speed });
      gsap.to(blob, { opacity: 0, x: -5, duration: speed });
    };

    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);

    return {
      destroy() {
        container.removeEventListener('mouseenter', onEnter);
        container.removeEventListener('mouseleave', onLeave);
      },
    };
  }
</script>

<nav class="flex flex-col gap-1">
  {#each menuItems as item}
    <div class="py-1 flex items-center" use:fadeBlob>
      <div class="blob-dot w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
      <a href={item.url} class="blob-text text-xl text-white" style="font-family: var(--font-sans)">
        {item.title}
      </a>
    </div>
  {/each}
</nav>
