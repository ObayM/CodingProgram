'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// This is the final, polished component.
function DarkLiquidBackground() {
  const material = useRef(null);

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
uColor1: { value: new THREE.Color('#1a3d7c') },
uColor2: { value: new THREE.Color('#2c4a63') },
uColor3: { value: new THREE.Color('#3a2f5d') }, 


    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        // Full-screen plane setup
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      // This shader uses advanced noise techniques to create a fluid, smoky effect.
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      varying vec2 vUv;

      // Noise functions - the building blocks of our effect
      float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123); }
      float noise(vec2 st) {
          vec2 i = floor(st); vec2 f = fract(st);
          vec2 u = f*f*(3.0-2.0*f);
          return mix(random(i), random(i + vec2(1.0, 0.0)), u.x) +
                 (random(i + vec2(0.0, 1.0)) - random(i)) * u.y * (1.0 - u.x) +
                 (random(i + vec2(1.0, 1.0)) - random(i + vec2(1.0, 0.0))) * u.x * u.y;
      }
      // Fractal Brownian Motion - adds detail and texture
      float fbm(vec2 st) {
          float value = 0.0; float amplitude = 0.5;
          for (int i = 0; i < 6; i++) {
              value += amplitude * noise(st);
              st *= 2.0; amplitude *= 0.5;
          }
          return value;
      }

      void main() {
        vec2 st = vUv;
        // Scale the texture to see more of the pattern
        st *= 2.0;

        // --- DOMAIN WARPING for fluid motion ---
        // This is the core of the "flowing" effect. We use noise to distort the coordinates.
        vec2 q = vec2(fbm(st + uTime * 0.1), fbm(st + vec2(1.2, 2.8)));
        vec2 r = vec2(fbm(st + q * 0.7 + uTime * 0.05), fbm(st + q * 0.9 + vec2(3.2, 5.4)));
        float f = fbm(st + r);

        // --- GUARANTEED VISIBLE COLOR MAPPING ---
        // Create a high-contrast version of the noise.
        // This makes the dark parts darker and the bright parts brighter.
        float intensity = pow(f, 2.5);

        // Mix from the darkest color to the mid-tone to form the smoke body.
        vec3 color = mix(uColor1, uColor2, intensity);

        // Add the bright highlight color on the very "hottest" parts of the smoke.
        // This creates vibrant, glowing veins within the darker smoke.
        color = mix(color, uColor3, smoothstep(0.5, 1.0, intensity));
        
        gl_FragColor = vec4(color, 1.0);
      }
    `
  }), []);

  // Animate the uTime uniform
  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={material} args={[shaderArgs]} />
    </mesh>
  );
}


// The main component export.
export function CelestialBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-20 bg-black">
      <Canvas>
        <DarkLiquidBackground />
      </Canvas>
    </div>
  );
}