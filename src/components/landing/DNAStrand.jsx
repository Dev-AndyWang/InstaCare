import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function DNAStrand() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const dnaGroupRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 15;
    camera.position.y = 0;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x9333EA, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3B82F6, 0.8, 100);
    pointLight2.position.set(-10, -10, 5);
    scene.add(pointLight2);

    // Create DNA Group
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);
    dnaGroupRef.current = dnaGroup;

    // DNA Helix Parameters
    const helixRadius = 2;
    const helixHeight = 10;
    const turns = 3;
    const pointsPerTurn = 10;
    const totalPoints = turns * pointsPerTurn;

    // Materials
    const backboneMaterial = new THREE.MeshPhongMaterial({
      color: 0xE0F2FE,
      transparent: true,
      opacity: 0.8,
      shininess: 100,
      emissive: 0x6B8CA5,
      emissiveIntensity: 0.2,
    });

    const atMaterial = new THREE.MeshPhongMaterial({
      color: 0x3B82F6,
      transparent: true,
      opacity: 0.85,
      shininess: 100,
      emissive: 0x3B82F6,
      emissiveIntensity: 0.3,
    });

    const gcMaterial = new THREE.MeshPhongMaterial({
      color: 0x9333EA,
      transparent: true,
      opacity: 0.85,
      shininess: 100,
      emissive: 0x9333EA,
      emissiveIntensity: 0.3,
    });

    const connectorMaterial = new THREE.MeshPhongMaterial({
      color: 0xCCDBFD,
      transparent: true,
      opacity: 0.6,
      shininess: 80,
    });

    // Geometry
    const sphereGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const basePairSphereGeometry = new THREE.SphereGeometry(0.18, 16, 16);

    // Build DNA Strands
    for (let i = 0; i < totalPoints; i++) {
      const t = (i / totalPoints) * Math.PI * 2 * turns;
      const y = (i / totalPoints) * helixHeight - helixHeight / 2;

      // Strand 1
      const x1 = Math.cos(t) * helixRadius;
      const z1 = Math.sin(t) * helixRadius;

      // Strand 2 (offset by π)
      const x2 = Math.cos(t + Math.PI) * helixRadius;
      const z2 = Math.sin(t + Math.PI) * helixRadius;

      // Backbone spheres
      const sphere1 = new THREE.Mesh(sphereGeometry, backboneMaterial);
      sphere1.position.set(x1, y, z1);
      dnaGroup.add(sphere1);

      const sphere2 = new THREE.Mesh(sphereGeometry, backboneMaterial);
      sphere2.position.set(x2, y, z2);
      dnaGroup.add(sphere2);

      // Add base pairs (every point)
      const isAT = i % 2 === 0;
      const basePairMat = isAT ? atMaterial : gcMaterial;

      // Base pair connecting spheres
      const basePair1 = new THREE.Mesh(basePairSphereGeometry, basePairMat);
      basePair1.position.set(x1, y, z1);
      basePair1.userData = { baseIndex: i }; // For animation
      dnaGroup.add(basePair1);

      const basePair2 = new THREE.Mesh(basePairSphereGeometry, basePairMat);
      basePair2.position.set(x2, y, z2);
      basePair2.userData = { baseIndex: i }; // For animation
      dnaGroup.add(basePair2);

      // Connector rod between strands
      const direction = new THREE.Vector3(x2 - x1, 0, z2 - z1);
      const distance = direction.length();
      const cylinderGeometry = new THREE.CylinderGeometry(0.08, 0.08, distance, 8);
      const cylinder = new THREE.Mesh(cylinderGeometry, connectorMaterial);

      // Position and rotate cylinder
      const midpoint = new THREE.Vector3((x1 + x2) / 2, y, (z1 + z2) / 2);
      cylinder.position.copy(midpoint);

      // Calculate rotation to align cylinder with connection
      const axis = new THREE.Vector3(0, 1, 0);
      const targetAxis = direction.clone().normalize();
      const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, targetAxis);
      cylinder.quaternion.copy(quaternion);

      cylinder.userData = { baseIndex: i }; // For animation
      dnaGroup.add(cylinder);
    }

    // Floating particles (optional enhancement)
    const particlesCount = 150;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPositions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const radius = helixRadius + 1 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * (helixHeight + 4);

      particlesPositions[i * 3] = Math.cos(theta) * radius;
      particlesPositions[i * 3 + 1] = y;
      particlesPositions[i * 3 + 2] = Math.sin(theta) * radius;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xE0F2FE,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation
    let time = 0;
    const baseRotationSpeed = 0.004;

    const animate = () => {
      time += 0.016; // ~60fps

      // Continuous rotation
      const rotationSpeed = isHovered ? baseRotationSpeed * 1.5 : baseRotationSpeed;
      dnaGroup.rotation.y += rotationSpeed;

      // Helical flow animation - pulse wave traveling up
      dnaGroup.children.forEach((child) => {
        if (child.userData.baseIndex !== undefined) {
          const waveSpeed = 2;
          const wavePhase = time * waveSpeed + child.userData.baseIndex * 0.3;
          const pulseIntensity = (Math.sin(wavePhase) + 1) * 0.5; // 0 to 1

          // Modify emissive intensity for glow effect
          if (child.material && child.material.emissive) {
            child.material.emissiveIntensity = 0.2 + pulseIntensity * 0.3;
          }

          // Subtle scale pulse
          const scaleAmount = 1 + pulseIntensity * 0.1;
          child.scale.set(scaleAmount, scaleAmount, scaleAmount);
        }
      });

      // Particle rotation
      particlesMesh.rotation.y += 0.001;

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[500px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
}
