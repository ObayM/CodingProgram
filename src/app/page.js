import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function Stars(props) {
  const ref = useRef();
  const [sphere] = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = 4 + Math.random() * 4;
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return [new Float32Array(positions)];
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 25;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#38bdf8" size={0.01} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}


function FloatingLogo() {
    const ref = useRef();
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.x = Math.sin(t / 4) / 4;
        ref.current.rotation.y = Math.cos(t / 2) / 4;
        ref.current.position.y = Math.sin(t / 1.5) / 10;
    });

    return (
        <Icosahedron ref={ref} args={[0.6, 1]}>
            <meshStandardMaterial 
                color="#0369a1" 
                emissive="#0ea5e9"
                emissiveIntensity={2}
                roughness={0.2} 
                metalness={0.8}
            />
        </Icosahedron>
    )
}

export function CanvasScene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars />
        <FloatingLogo />
      </Canvas>
    </div>
  );
}