'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function DarkBackground() {
  const material = useRef(null);

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      // Muted, dark, professional colors for a coding environment.
      uColor1: { value: new THREE.Color('#191970') }, // Very dark navy (almost black)
      uColor2: { value: new THREE.Color('#468FEA') }, // A muted, deep blue
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      // This shader creates a subtle, slow-moving, dark atmospheric effect.
      // It's designed to be a non-distracting background for a focused workspace.
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;

      // --- NOISE FUNCTIONS ---
      // Standard noise functions to generate a procedural texture.
      float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
      }
      
      // Fractal Brownian Motion for a more organic, detailed noise.
      float fbm(vec2 st) {
          float value = 0.0;
          float amplitude = 0.5;
          // Using only 4 octaves for a softer, less detailed look.
          for (int i = 0; i < 4; i++) {
              value += amplitude * noise(st);
              st *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void main() {
        // --- COORDINATE SETUP ---
        // We use a larger scale (multiplying by a small number) to create
        // broad, slow-moving patterns rather than busy, detailed ones.
        vec2 st = vUv * 1.0;

        // --- MOTION ---
        // The time is slowed down significantly (multiplied by 0.02)
        // to make the motion extremely subtle. This is the key to a "quiet" background.
        float slowTime = uTime * 0.02;

        // We use the noise function itself to create a very slow, non-linear
        // warp. This looks more like a morphing haze than a scrolling pattern.
        float noisePattern = fbm(st + slowTime);
        
        // --- COLORING ---
        // The core of the effect. We are not creating sharp shapes.
        // We simply mix the two dark colors based on the noise value.
        // The result is a smooth, dark gradient that slowly changes shape.
        // background remains mostly dark. The range (0.3 to 0.7) creates soft transitions.
        float mixFactor = smoothstep(0.3, 0.7, noisePattern);
        vec3 color = mix(uColor1, uColor2, mixFactor);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `
  }), []);

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


// The main component export. Renamed for clarity.
export default function Background() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-20 bg-[#030617]">
      <Canvas>
        <DarkBackground />
      </Canvas>
    </div>
  );
}
