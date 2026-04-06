<script lang='ts'>
  import type { Post } from '$lib/utils/types';
  import { formatDate } from '$lib/utils/formatDate';
  let { post }: { post: Post } = $props();
</script>

<a
  href={`/notes/${post.slug}`}
  class="group flex flex-col items-end text-right opacity-70 hover:opacity-100 transition-all duration-300 hover:-translate-x-2.5"
>
  <span
    class="text-xl text-white tracking-wider leading-none mb-1"
    style="font-family: var(--font-futura, futura-pt, sans-serif)"
  >
    {post.title}
  </span>
  <time
    class="text-xs text-white/50 px-2 py-0.5"
    style="font-family: var(--font-sans)"
  >
    {formatDate(post.date)}
  </time>
</a>
