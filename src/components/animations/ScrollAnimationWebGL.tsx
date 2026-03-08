"use client";

import React, { useRef, useEffect } from "react";
// @ts-ignore - module installed via CI
import * as THREE from "three";

export function ScrollAnimationWebGL() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Setup Scene
    const scene = new THREE.Scene();
    
    // Setup Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Objects
    // Torus
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x3b82f6, 
        wireframe: true 
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // "Stars"
    const addStar = () => {
        const geometry = new THREE.SphereGeometry(0.25, 24, 24);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const star = new THREE.Mesh(geometry, material);
        
        const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100));
        star.position.set(x, y, z);
        scene.add(star);
    };

    Array(200).fill(0).forEach(addStar);

    // Initial Camera Position
    camera.position.z = 30;

    // Scroll Animation Event
    const moveCamera = () => {
        const t = document.body.getBoundingClientRect().top;
        
        // Spin the big torus
        torus.rotation.x += 0.05;
        torus.rotation.y += 0.075;
        torus.rotation.z += 0.05;

        // Move camera
        camera.position.z = t * -0.01 + 30;
        camera.position.x = t * -0.0002;
        camera.rotation.y = t * -0.0002;
    };

    window.addEventListener('scroll', moveCamera);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Idle animation
      torus.rotation.x += 0.001;
      torus.rotation.y += 0.005;
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle Resize
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('scroll', moveCamera);
        window.removeEventListener('resize', handleResize);
        if (mountRef.current) {
            mountRef.current.removeChild(renderer.domElement);
        }
        // Dispose
        geometry.dispose();
        material.dispose();
        renderer.dispose();
    };
  }, []);

  return (
    <div 
        ref={mountRef} 
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-30 mix-blend-screen"
        aria-hidden="true"
    />
  );
}
