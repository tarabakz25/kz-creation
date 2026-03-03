<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core';
  import { easing } from 'maath';
  import * as THREE from 'three';

  const { camera, pointer } = useThrelte();

  useTask((delta) => {
    easing.damp3(
      $camera.position,
      [$pointer.x * 5, $pointer.y * 3, 50],
      0.3,
      delta
    );
    $camera.lookAt(0, 0, 0);
  });
</script>