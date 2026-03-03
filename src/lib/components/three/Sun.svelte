<script lang="ts">
  import { T } from '@threlte/core';
</script>

<T.Mesh>
  <T.SphereGeometry args={[2, 32, 32]} />
  <T.MeshPhongMaterial emissive="#ffffff" emissiveIntensity={0.3} color="#ffffff" />
</T.Mesh>
