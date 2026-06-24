"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Vehicle3DVisualizer() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(3.5, 2.0, 5.5);
    camera.lookAt(0, 0, 0);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Group for the entire vehicle
    const vehicleGroup = new THREE.Group();
    scene.add(vehicleGroup);

    // 5. Materials
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6, // Violet-500
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xd8b4fe, // Light purple
      transparent: true,
      opacity: 0.25,
    });

    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xa78bfa, // Violet-400
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });

    const wheelMaterial = new THREE.MeshBasicMaterial({
      color: 0x6d28d9, // Violet-700
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    // 6. Construct stylized 3D Van / EV primitives
    // A. Main Chassis (Lower Body)
    const bodyGeometry = new THREE.BoxGeometry(2.6, 0.6, 1.2);
    const bodyMesh = new THREE.Mesh(bodyGeometry, wireframeMaterial);
    bodyMesh.position.y = 0.2;
    vehicleGroup.add(bodyMesh);

    // B. Cabin (Upper Body)
    const cabinGeometry = new THREE.BoxGeometry(1.8, 0.6, 1.2);
    const cabinMesh = new THREE.Mesh(cabinGeometry, wireframeMaterial);
    cabinMesh.position.set(-0.2, 0.8, 0);
    vehicleGroup.add(cabinMesh);

    // C. Glowing Interior Solid Block (Represents battery compartment)
    const batteryGeometry = new THREE.BoxGeometry(1.2, 0.4, 0.9);
    const batteryMesh = new THREE.Mesh(batteryGeometry, glowMaterial);
    batteryMesh.position.y = 0.2;
    vehicleGroup.add(batteryMesh);

    // D. Central Energy Core (battery nucleus)
    const coreGeometry = new THREE.IcosahedronGeometry(0.3, 1);
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreMesh.position.set(0, 0.2, 0);
    vehicleGroup.add(coreMesh);

    // E. 4 Wheels (Spinning Cylinders)
    const wheelGeometry = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 12);
    // Rotate wheel geometry to align with axles
    wheelGeometry.rotateX(Math.PI / 2);

    const wheelFL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    const wheelFR = new THREE.Mesh(wheelGeometry, wheelMaterial);
    const wheelRL = new THREE.Mesh(wheelGeometry, wheelMaterial);
    const wheelRR = new THREE.Mesh(wheelGeometry, wheelMaterial);

    // Position wheels
    wheelFL.position.set(0.8, -0.15, 0.65);
    wheelFR.position.set(0.8, -0.15, -0.65);
    wheelRL.position.set(-0.8, -0.15, 0.65);
    wheelRR.position.set(-0.8, -0.15, -0.65);

    vehicleGroup.add(wheelFL, wheelFR, wheelRL, wheelRR);

    // F. Headlight rays (Laser cylinders extending forward)
    const headlightGeo = new THREE.CylinderGeometry(0.01, 0.1, 1.5, 8, 1, true);
    headlightGeo.rotateZ(Math.PI / 2); // align forward along X axis
    
    const headlightLeft = new THREE.Mesh(headlightGeo, glowMaterial);
    const headlightRight = new THREE.Mesh(headlightGeo, glowMaterial);
    
    headlightLeft.position.set(2.05, 0.15, 0.45);
    headlightRight.position.set(2.05, 0.15, -0.45);
    
    vehicleGroup.add(headlightLeft, headlightRight);

    // 7. Floating orbital charging nodes
    const particlesCount = 60;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const particleSpeeds = [];

    for (let i = 0; i < particlesCount; i++) {
      // Position around the car in an orbital flow
      const theta = Math.random() * Math.PI * 2;
      const r = 1.6 + Math.random() * 0.8;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.0;
      positions[i * 3 + 2] = Math.sin(theta) * r;

      particleSpeeds.push({
        angle: theta,
        speed: 0.008 + Math.random() * 0.012,
        radius: r,
        y: positions[i * 3 + 1],
      });
    }

    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xc084fc, // Purple-400
      size: 0.045,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMaterial);
    scene.add(particleSystem);

    // 8. Grid Helper underneath
    const gridHelper = new THREE.GridHelper(8, 16, 0x6d28d9, 0x2e1065);
    gridHelper.position.y = -0.55;
    gridHelper.material.opacity = 0.25;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // 9. Interactive Drag Orbit Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      if (isDragging) {
        vehicleGroup.rotation.y += deltaMove.x * 0.01;
        vehicleGroup.rotation.x += deltaMove.y * 0.01;
      }

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Support touch events
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaMove = {
          x: e.touches[0].clientX - previousMousePosition.x,
          y: e.touches[0].clientY - previousMousePosition.y,
        };
        vehicleGroup.rotation.y += deltaMove.x * 0.015;
        vehicleGroup.rotation.x += deltaMove.y * 0.015;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    container.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);

    // 10. Window Resize Observer
    const handleResize = () => {
      if (!container || !canvas) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 11. Animation Cycle
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Spin wheels
      wheelFL.rotation.z -= 0.03;
      wheelFR.rotation.z -= 0.03;
      wheelRL.rotation.z -= 0.03;
      wheelRR.rotation.z -= 0.03;

      // Pulsate Energy Core
      const time = Date.now() * 0.003;
      coreMesh.scale.setScalar(1 + Math.sin(time) * 0.12);
      coreMesh.rotation.y += 0.01;
      coreMesh.rotation.z += 0.005;

      // Gentle continuous rotation when not dragging
      if (!isDragging) {
        vehicleGroup.rotation.y += 0.003;
        // Easing back to level pitch
        vehicleGroup.rotation.x *= 0.95;
      }

      // Animate orbiting charging particles
      const posArray = particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const speedData = particleSpeeds[i];
        speedData.angle += speedData.speed;
        
        posArray[i * 3] = Math.cos(speedData.angle) * speedData.radius;
        posArray[i * 3 + 1] = speedData.y + Math.sin(time + i) * 0.1;
        posArray[i * 3 + 2] = Math.sin(speedData.angle) * speedData.radius;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 12. Complete GPU/CPU Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);

      // Dispose Geometries
      bodyGeometry.dispose();
      cabinGeometry.dispose();
      batteryGeometry.dispose();
      coreGeometry.dispose();
      wheelGeometry.dispose();
      headlightGeo.dispose();
      particlesGeo.dispose();
      gridHelper.geometry.dispose();

      // Dispose Materials
      wireframeMaterial.dispose();
      glowMaterial.dispose();
      coreMaterial.dispose();
      wheelMaterial.dispose();
      particlesMaterial.dispose();
      gridHelper.material.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[250px] relative select-none cursor-grab active:cursor-grabbing flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
