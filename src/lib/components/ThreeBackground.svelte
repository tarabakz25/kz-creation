<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';

  let canvas: HTMLCanvasElement;
  let animFrameId: number;

  onMount(() => {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 50);

    // Lights
    const dirLight1 = new THREE.DirectionalLight(0x4f4f4f);
    dirLight1.position.set(4, 4, 4);
    scene.add(dirLight1);
    const dirLight2 = new THREE.DirectionalLight(0x4f4f4f);
    dirLight2.position.set(-4, -4, -4);
    scene.add(dirLight2);

    // Stars
    const starMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < 500; i++) {
      const geo = new THREE.OctahedronGeometry(Math.random() * 0.8);
      const mat = new THREE.MeshPhongMaterial({ emissive: 0xffffff });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
      );
      scene.add(mesh);
      starMeshes.push(mesh);
    }

    // Sun (wireframe icosahedron)
    const sunGeo = new THREE.IcosahedronGeometry(5, 1);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xf66120, wireframe: true });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    const sunGroup = new THREE.Group();
    sunGroup.position.set(10, 0, 0);
    sunGroup.add(sun);

    // Orbit ring
    const ringGeo = new THREE.TorusGeometry(16, 0.03, 80, 90, Math.PI * 3);
    const ringMat = new THREE.MeshLambertMaterial({ color: 0x4f4f4f, emissive: 0x4f4f4f, flatShading: true });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    const orbitGroup = new THREE.Group();
    orbitGroup.add(ring);
    sunGroup.add(orbitGroup);
    scene.add(sunGroup);

    // Mouse tracking for camera
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const timer = 0.00001 * Date.now();

      // Stars orbit
      starMeshes.forEach((mesh, i) => {
        mesh.position.x = 400 * Math.sin(timer + i);
        mesh.position.z = 400 * Math.sin(timer + i * 1.1);
        mesh.rotation.x += 0.001;
      });

      // Sun rotation
      sun.rotation.x += 0.001;

      // Orbit ring
      orbitGroup.rotation.x += 0.0007;
      orbitGroup.rotation.y += 0.0007;
      orbitGroup.rotation.z += 0.0007;

      // Camera smooth follow mouse
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 3 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  });
</script>

<canvas
  bind:this={canvas}
  class="fixed inset-0 -z-5 pointer-events-none w-full h-full"
></canvas>
