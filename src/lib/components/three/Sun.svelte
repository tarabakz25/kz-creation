<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import * as THREE from "three";

  let mesh: THREE.Mesh;

  useTask(() => {
    if (mesh) mesh.rotation.x += 0.001;
  });
</script>

<T.Mesh bind:ref={mesh}>
  <T.IcosahedronGeometry args={[5, 1]} />
  <T.MeshBasicMaterial color={0xf66120} wireframe />
</T.Mesh>
