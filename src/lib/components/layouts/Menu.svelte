<script lang="ts">
  import { page } from '$app/state';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/lab', label: 'Lab' },
    { href: '/notes', label: 'Notes' },
    { href: '/contact', label: 'Contact' },
  ];
</script>

<nav class="flex flex-col gap-2">
  {#each links as link}
    <a
      href={link.href}
      class="font-futura_pt tracking-wider text-lg transition-opacity duration-200 {page.url.pathname === link.href ? 'text-white opacity-100' : 'text-white/40 hover:text-white/80'}"
    >
      {link.label}
    </a>
  {/each}
</nav>
