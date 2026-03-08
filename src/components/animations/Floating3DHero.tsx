"use client";

import React, { useRef, useMemo } from "react";
// @ts-ignore - module installed via CI
import { Canvas, useFrame } from "@react-three/fiber";
// @ts-ignore - module installed via CI
import { OrbitControls, Float, Sparkles, PerspectiveCamera, Environment } from "@react-three/drei";
// @ts-ignore - module installed via CI
import * as THREE from "three";

// Procedural geometry for a simplified chess piece (Pawn / Bishop hybrid) since we don't have a `.gltf` model loader ready with assets
function ProceduralChessPiece() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transmission: 0.2, // glass-like
        thickness: 0.5,
      }),
    []
  );

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {/* Base */}
      <mesh position={[0, 0, 0]} material={material}>
        <cylinderGeometry args={[1.5, 1.8, 0.5, 32]} />
      </mesh>
      <mesh position={[0, 0.5, 0]} material={material}>
        <cylinderGeometry args={[1.2, 1.4, 0.5, 32]} />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 2.2, 0]} material={material}>
        <cylinderGeometry args={[0.5, 1.0, 3, 32]} />
      </mesh>
      
      {/* Collar */}
      <mesh position={[0, 3.8, 0]} material={material}>
        <torusGeometry args={[0.6, 0.2, 16, 32]} />
      </mesh>

      {/* Head (Sphere) */}
      <mesh position={[0, 4.8, 0]} material={material}>
        <sphereGeometry args={[0.8, 32, 32]} />
      </mesh>
      
      {/* Crown */}
      <mesh position={[0, 5.8, 0]} material={material}>
        <sphereGeometry args={[0.3, 16, 16]} />
      </mesh>
    </group>
  );
}

export default function Floating3DHero() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none">
      <Canvas className="pointer-events-auto">
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, 5, -10]} intensity={1} color="#3b82f6" />
        <pointLight position={[0, -5, 5]} intensity={0.5} color="#ef4444" />
        
        <Environment preset="city" />

        <Float
          speed={2} // Animation speed, defaults to 1
          rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
          floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          floatingRange={[-0.5, 0.5]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          <ProceduralChessPiece />
        </Float>

        <Sparkles
          count={100}
          scale={10}
          size={2}
          speed={0.4}
          opacity={0.3}
          color="#ffffff"
        />

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 3}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
