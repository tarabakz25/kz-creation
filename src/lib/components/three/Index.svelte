<script lang="ts">
  import { Canvas } from '@threlte/core';
  import Scene from './Scene.svelte';
</script>

<div class="fixed inset-0 -z-10 pointer-events-none">
  <Canvas>
    <Scene />
  </Canvas>
</div>