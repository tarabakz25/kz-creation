import { Canvas } from '@react-three/fiber';
import Scene from './Scene';

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
