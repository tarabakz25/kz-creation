<script lang="ts">
  import { T, useTask } from '@threlte/core';
  import * as THREE from 'three';

  // 500個のメッシュ参照
  let meshes: THREE.Mesh[] = [];

  // 初期位置をランダム生成
  const positions = Array.from({ length: 500 }, () => [
    Math.random() * 600 - 300,
    Math.random() * 600 - 300,
    Math.random() * 600 - 300,
  ] as [number, number, number]);

  const sizes = Array.from({ length: 500 }, () => Math.random());

  useTask(() => {
    const timer = 0.00001 * Date.now();
    meshes.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.x = 400 * Math.sin(timer + i);
        mesh.position.z = 400 * Math.sin(timer + i * 1.1);
        mesh.rotation.x += 0.001;
      }
    });
  });
</script>

<!-- function Stars() {
  const containerRef = useRef([]);

  useFrame((state) => {
    const timer = 0.00001 * Date.now();
    containerRef.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.x = 400 * Math.sin(timer + i);
        mesh.position.z = 400 * Math.sin(timer + i * 1.1);
        
        mesh.rotation.x += 0.001;
      }
    });
  });

  return (
    <group>
      {Array.from({ length: 500 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (containerRef.current[i] = el)}
          position={[
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
          ]}
        >
          <octahedronGeometry args={[Math.random() * 1]} />
          <meshPhongMaterial emissive="#fff" />
        </mesh>
      ))}
    </group>
  );
} -->


{#each positions as pos, i}
  <T.Mesh
    position={pos}
    bind:ref={meshes[i]}
  >
    <T.OctahedronGeometry args={[sizes[i]]} />
    <T.MeshPhongMaterial emissive="#fff" />
  </T.Mesh>
{/each}