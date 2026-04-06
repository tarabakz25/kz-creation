import CameraRig from './CameraRig';
import Stars from './Stars';
import Sun from './Sun';
import OrbitRing from './OrbitRing';

export default function Scene() {
  return (
    <>
      <CameraRig />
      <Stars />
      <group position={[20, 0, 0]}>
        <Sun />
        <OrbitRing />
      </group>
      <directionalLight position={[4, 4, 4]} color={0x4f4f4f} />
      <directionalLight position={[-4, -4, -4]} color={0x4f4f4f} />
    </>
  );
}
