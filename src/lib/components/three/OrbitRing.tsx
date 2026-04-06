import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function OrbitRing() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.0007;
      groupRef.current.rotation.y += 0.0007;
      groupRef.current.rotation.z += 0.0007;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[16, 0.03, 80, 90, Math.PI * 3]} />
        <meshLambertMaterial color={0x4f4f4f} emissive={0x4f4f4f} flatShading />
      </mesh>
    </group>
  );
}
