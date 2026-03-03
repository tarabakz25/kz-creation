<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core';
  import { easing } from 'maath';
  import { onMount } from 'svelte';

  const { camera } = useThrelte();

  let pointer = { x: 0, y: 0 };

  onMount(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  });

  useTask((delta) => {
    easing.damp3(
      $camera.position,
      [pointer.x * 5, pointer.y * 3, 50],
      0.3,
      delta
    );
    $camera.lookAt(0, 0, 0);
  });
</script>
