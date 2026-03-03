<script lang="ts">
  import { T } from '@threlte/core';
</script>

<T.Mesh rotation={[Math.PI / 2, 0, 0]}>
  <T.RingGeometry args={[5, 5.05, 64]} />
  <T.MeshBasicMaterial color="#ffffff" opacity={0.1} transparent />
</T.Mesh>
