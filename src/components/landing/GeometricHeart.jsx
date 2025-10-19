import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GeometricHeart() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(700, 700); // Adjusted for 30% smaller heart
    renderer.setClearColor(0x000000, 0);

    // Clear any existing canvas before appending
    if (mountRef.current.children.length > 0) {
      mountRef.current.innerHTML = '';
    }
    mountRef.current.appendChild(renderer.domElement);

    // Create heart geometry
    const heartShape = new THREE.Shape();

    // Draw heart path
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    heartShape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    heartShape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y);
    heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

    // Extrude settings for 3D
    const extrudeSettings = {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1
    };

    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    geometry.center();

    // Material
    const material = new THREE.MeshPhongMaterial({
      color: 0xE91E63,
      emissive: 0xFF1493,
      emissiveIntensity: 0.5,
      shininess: 100,
      flatShading: false,
      transparent: true,
      opacity: 0.95
    });

    const heart = new THREE.Mesh(geometry, material);

    // 30% smaller - scale 1.624 (2.32 * 0.7)
    heart.scale.set(1.624, 1.624, 1.624);

    // FLIP THE HEART - rotate 180 degrees on Z-axis to point upward
    heart.rotation.z = Math.PI; // 180 degrees

    scene.add(heart);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xFFB6C1, 2, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xDDA0DD, 1.5, 50);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Animation variables
    let pulseTime = 0;
    let baseScale = 1.624; // 30% smaller (2.32 * 0.7)
    let animationId;

    // Animation loop
    function animate() {
      animationId = requestAnimationFrame(animate);

      // Heartbeat pulse
      pulseTime += 0.05;

      const beatCycle = pulseTime % (Math.PI * 2);
      let scale = baseScale;
      let glowIntensity = 0.5;

      if (beatCycle < Math.PI * 0.25) {
        const progress = beatCycle / (Math.PI * 0.25);
        const curve = Math.sin(progress * Math.PI);
        scale = baseScale * (1 + curve * 0.15);
        glowIntensity = 0.5 + curve * 0.4;
      } else if (beatCycle < Math.PI * 0.35) {
        scale = baseScale * 1.05;
        glowIntensity = 0.6;
      } else if (beatCycle < Math.PI * 0.5) {
        const progress = (beatCycle - Math.PI * 0.35) / (Math.PI * 0.15);
        const curve = Math.sin(progress * Math.PI);
        scale = baseScale * (1.05 + curve * 0.06);
        glowIntensity = 0.6 + curve * 0.2;
      } else {
        const progress = (beatCycle - Math.PI * 0.5) / (Math.PI * 1.5);
        scale = baseScale * (1.05 - progress * 0.05);
        glowIntensity = 0.6 - progress * 0.1;
      }

      heart.scale.set(scale, scale, scale);
      material.emissiveIntensity = glowIntensity;

      // Keep Z rotation at 180 degrees (flipped upward) - NO OTHER ROTATION
      heart.rotation.z = Math.PI;

      renderer.render(scene, camera);
    }

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        right: '12%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '700px', // Adjusted for 30% smaller heart
        height: '700px', // Adjusted for 30% smaller heart
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
}
