"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function EnergyVisualizer() {
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
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7.5;

    // 3. WebGL Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Create central wireframe sphere (Energy Core)
    const coreGeometry = new THREE.IcosahedronGeometry(1.4, 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6, // Violet-500
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // Inner glowing sphere core
    const innerGeometry = new THREE.SphereGeometry(0.7, 16, 16);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xd8b4fe, // Light purple
      transparent: true,
      opacity: 0.3,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerMesh);

    // 5. Orbiting charging nodes
    const numNodes = 5;
    const orbitRadius = 3.2;
    const nodes = [];
    const connectionLines = [];

    for (let i = 0; i < numNodes; i++) {
      // Node Mesh (Representing charging stations)
      const nodeGeometry = new THREE.SphereGeometry(0.18, 16, 16);
      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: 0xa78bfa, // Violet-400
        wireframe: false,
      });
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);

      const angle = (i / numNodes) * Math.PI * 2;
      nodeMesh.position.x = Math.cos(angle) * orbitRadius;
      nodeMesh.position.y = (Math.random() - 0.5) * 1.0;
      nodeMesh.position.z = Math.sin(angle) * orbitRadius;
      scene.add(nodeMesh);

      nodes.push({
        mesh: nodeMesh,
        angle: angle,
        speed: 0.004 + Math.random() * 0.003,
        orbitRadius: orbitRadius,
        yAmplitude: 0.4 + Math.random() * 0.3,
        yPhase: Math.random() * Math.PI * 2,
      });

      // Connecting line from Core to Node
      const points = [new THREE.Vector3(0, 0, 0), nodeMesh.position];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x6d28d9, // Violet-700
        transparent: true,
        opacity: 0.4,
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);

      connectionLines.push({
        line: line,
        node: nodeMesh,
      });
    }

    // 6. Floating energy particles (Starfield/Flow)
    const particleCount = 180;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    for (let i = 0; i < particleCount; i++) {
      // Distribute in a spherical cloud
      const r = Math.random() * 5.0 + 1.6; // radius range
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.004,
        y: (Math.random() - 0.5) * 0.004,
        z: (Math.random() - 0.5) * 0.004,
      });
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xc084fc, // Light magenta/purple
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // 7. Mouse Interaction (Parallax Effect)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 8. Resize Handler
    const handleResize = () => {
      if (!container || !canvas) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 9. Animation Loop
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate energy core
      coreMesh.rotation.y += 0.006;
      coreMesh.rotation.x += 0.003;
      innerMesh.rotation.y -= 0.003;

      // Animate orbiting charging nodes
      nodes.forEach((node) => {
        node.angle += node.speed;
        node.mesh.position.x = Math.cos(node.angle) * node.orbitRadius;
        node.mesh.position.z = Math.sin(node.angle) * node.orbitRadius;
        // Gentle wave motion vertically
        node.mesh.position.y = Math.sin(node.angle * 2 + node.yPhase) * node.yAmplitude;
        node.mesh.rotation.y += 0.01;
      });

      // Update pulsating connection lines
      connectionLines.forEach((connection) => {
        const positionAttr = connection.line.geometry.attributes.position;
        positionAttr.setXYZ(
          1,
          connection.node.position.x,
          connection.node.position.y,
          connection.node.position.z
        );
        positionAttr.needsUpdate = true;
      });

      // Animate floating energy particles
      const positionsArray = particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positionsArray[i * 3] += particleVelocities[i].x;
        positionsArray[i * 3 + 1] += particleVelocities[i].y;
        positionsArray[i * 3 + 2] += particleVelocities[i].z;

        // Reset particles that drift too far or too close
        const dist = Math.sqrt(
          positionsArray[i * 3] ** 2 +
            positionsArray[i * 3 + 1] ** 2 +
            positionsArray[i * 3 + 2] ** 2
        );
        if (dist > 5.5 || dist < 1.0) {
          const r = Math.random() * 3.5 + 1.6;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);
          positionsArray[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          positionsArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          positionsArray[i * 3 + 2] = r * Math.cos(phi);
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      // Parallax camera easing
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      scene.rotation.y = targetX * 0.4;
      scene.rotation.x = -targetY * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Memory Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();

      // Dispose resources
      coreGeometry.dispose();
      coreMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();

      nodes.forEach((n) => {
        n.mesh.geometry.dispose();
        n.mesh.material.dispose();
      });

      connectionLines.forEach((cl) => {
        cl.line.geometry.dispose();
        cl.line.material.dispose();
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[350px] relative select-none cursor-grab active:cursor-grabbing">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
