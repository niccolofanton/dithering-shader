import { memo, FC, useEffect, useRef, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Float, useGLTF } from '@react-three/drei';
import { PostProcessing } from './post-processing';
import { EnvironmentWrapper } from './environment';
import * as THREE from 'three';
import { useControls, folder, Leva } from 'leva';
import './styles.css';

{/* <header class="frame">
<h1 class="frame__title">Dithering Shader</h1>
<a class="frame__back" href="https://tympanus.net/codrops/?p=">Article</a>
<a class="frame__archive" href="https://tympanus.net/codrops/demos/">All demos</a>
<a class="frame__github" href="https://github.com/codrops/">GitHub</a>
<nav class="frame__tags">
  <a href="https://tympanus.net/codrops/demos/?tag=shader">#shader</a>
  <a href="https://tympanus.net/codrops/demos/?tag=three-js">#three.js</a>
  <a href="https://tympanus.net/codrops/demos/?tag=webgl">#webgl</a>
  <a href="https://tympanus.net/codrops/demos/?tag=post-processing">#post-processing</a>
</nav>
<nav class="frame__demos">
  <span>Basic Dithering</span>
  <a href="index2.html">With Bloom</a>
  <a href="index3.html">Animated</a>
</nav>
</header> */}

const DemoName: FC = () => (
  <div className="demo-container">
    <div className="demo-name">Dithering Shader</div>
    <div className="demo-author">
      made by <span className="underlined">
        <a href="https://niccolofanton.dev" target="_blank" rel="noopener noreferrer">niccolofanton</a>
      </span>

      {" • "}
      <a href="#" target="_blank" rel="noopener noreferrer" className="github-link">Article</a>

      {" • "}
      <a href="#" target="_blank" rel="noopener noreferrer" className="github-link">All demos</a>

      {" • "}
      <a href="https://github.com/niccolofanton/dithering-shader" target="_blank" rel="noopener noreferrer" className="github-link">GitHub</a>

    </div>

    <div className="demo-author" style={{ display: 'flex', gap: '10px', marginTop: '1px' }}>
      <a href="https://tympanus.net/codrops/demos/?tag=shader">#shader</a>
      <a href="https://tympanus.net/codrops/demos/?tag=three-js">#three.js</a>
      <a href="https://tympanus.net/codrops/demos/?tag=webgl">#webgl</a>
      <a href="https://tympanus.net/codrops/demos/?tag=post-processing">#post-processing</a>

    </div>
  </div>
);

// Pre-loading the model to avoid blocking the main thread later
useGLTF.preload('/jousting_helmet-transformed.glb');

/**
 * Main application component
 */
export default function App(): JSX.Element {
  const { bgColor } = useControls({
    'Scene Settings': folder({
      bgColor: {
        value: '#ffffff',
        label: 'Background Color'
      }
    })
  });

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [modelScale, setModelScale] = useState(3);

  const { intensity, highlight } = useControls({
    'Environment Settings': folder({
      intensity: {
        value: 1.5,
        min: 0,
        max: 5,
        step: 0.1,
        label: 'Environment Intensity'
      },
      highlight: {
        value: '#066aff',
        label: 'Highlight Color'
      }
    })
  });

  // Remove loading class when app is ready
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.remove('loading');
    }, 1000); // Small delay to show the loading animation

    return () => clearTimeout(timer);
  }, []);

  // Update renderer clear color when background color changes
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setClearColor(new THREE.Color(bgColor));
    }
  }, [bgColor]);

  // Responsive adjustment handler for model scale
  const handleResize = useCallback(() => {
    const isSmallScreen = window.innerWidth <= 768;
    setModelScale(isSmallScreen ? 2.4 : 3); // 20% reduction on small screens
  }, []);

  // Set up resize handling
  useEffect(() => {
    // Initial check
    handleResize();

    // Add listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <>
      <Leva collapsed hidden={false} />
      <Canvas
        shadows
        camera={{ position: [0, -1, 4], fov: 65 }}
        gl={{
          alpha: false
        }}
        onCreated={({ gl }) => {
          rendererRef.current = gl;
          gl.setClearColor(new THREE.Color(bgColor));
        }}
      >
        <group position={[0, -0.5, 0]}>
          <Float
            floatIntensity={2}
            rotationIntensity={1}
            speed={2}
          >
            <Center scale={modelScale} position={[0, .8, 0]} rotation={[0, -Math.PI / 3.5, -0.4]}>
              <Helmet />
            </Center>
          </Float>
        </group>
        <OrbitControls />
        <EnvironmentWrapper intensity={intensity} highlight={highlight} />
        <Effects />
      </Canvas>
      <DemoName />
    </>
  )
}

/**
 * Post-processing effects wrapper component
 * Memoized to prevent unnecessary re-renders
 */
const Effects: FC = memo(() => (
  <PostProcessing />
))

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 jousting_helmet.glb --transform --resolution=4098 
Files: jousting_helmet.glb [45.8MB] > jousting_helmet-transformed.glb [3.99MB] (91%)
Author: The Royal Armoury (Livrustkammaren) (https://sketchfab.com/TheRoyalArmoury)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/jousting-helmet-a4eea31d9d9441af9434a7da5ae46b54
Title: Jousting Helmet
*/
interface HelmetProps {
  [key: string]: any;
}

/**
 * 3D Helmet model component 
 */
function Helmet(props: HelmetProps): JSX.Element {
  const { nodes, materials } = useGLTF('/jousting_helmet-transformed.glb') as any;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        geometry={nodes.Object_2.geometry}
        material={materials.model_Material_u1_v1}
        material-roughness={0.15}
        position={[-2.016, -0.06, 1.381]}
        rotation={[-1.601, 0.068, 2.296]}
        scale={0.038}
      />
    </group>
  )
} 