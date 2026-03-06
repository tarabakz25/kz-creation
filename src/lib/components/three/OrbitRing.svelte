<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import * as THREE from "three";

  let group: THREE.Group;

  useTask(() => {
    if (group) {
      group.rotation.x += 0.0007;
      group.rotation.y += 0.0007;
      group.rotation.z += 0.0007;
    }
  });
</script>

<T.Group bind:ref={group}>
  <T.Mesh>
    <T.TorusGeometry args={[16, 0.03, 80, 90, Math.PI * 3]} />
    <T.MeshLambertMaterial color={0x4f4f4f} emissive={0x4f4f4f} flatShading />
  </T.Mesh>
</T.Group>
