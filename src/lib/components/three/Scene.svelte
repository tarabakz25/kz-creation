<script lang="ts">
  import { T } from '@threlte/core';
  import CameraRig from './CameraRig.svelte';
  import Stars from './Stars.svelte';
  import Sun from './Sun.svelte';
  import OrbitRing from './OrbitRing.svelte';
</script>

<CameraRig />
<Stars />

<T.Group position={[12, 0, 0]}>
  <Sun />
  <OrbitRing />
</T.Group>

<T.DirectionalLight position={[4, 4, 4]} color={0x4f4f4f} />
<T.DirectionalLight position={[-4, -4, -4]} color={0x4f4f4f} />