"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Stars() {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const { positions, sizes } = useMemo(() => {
    const positions = Array.from({ length: 500 }, () => [
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
    ] as [number, number, number]);
    const sizes = Array.from({ length: 500 }, () => Math.random());
    return { positions, sizes };
  }, []);

  useFrame(() => {
    const timer = 0.00001 * Date.now();
    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.x = 400 * Math.sin(timer + i);
        mesh.position.z = 400 * Math.sin(timer + i * 1.1);
        mesh.rotation.x += 0.001;
      }
    });
  });

  return (
    <>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={pos}
        >
          <octahedronGeometry args={[sizes[i]]} />
          <meshPhongMaterial emissive="#fff" />
        </mesh>
      ))}
    </>
  );
}
