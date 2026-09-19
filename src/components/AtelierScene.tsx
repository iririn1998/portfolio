import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import type { ViewConfig, ViewPreset } from "../types";
import { AtelierModel } from "./AtelierModel";
import { Hotspots } from "./Hotspots";

type CameraAnimatorProps = {
  activeView: ViewConfig;
  transitionCount: number;
  isTransitioning: boolean;
  onTransitionStart: () => void;
  onTransitionEnd: () => void;
};

const CameraAnimator = ({
  activeView,
  transitionCount,
  isTransitioning,
  onTransitionStart,
  onTransitionEnd,
}: CameraAnimatorProps) => {
  const { camera } = useThree();
  const controls = useThree((state) => state.controls) as OrbitControlsImpl | null;
  const elapsedRef = useRef(0);

  const desiredPos = useMemo(
    () => new THREE.Vector3(...activeView.position),
    [activeView.position],
  );
  const desiredTarget = useMemo(() => new THREE.Vector3(...activeView.target), [activeView.target]);

  // Trigger animation when preset changes
  useEffect(() => {
    if (transitionCount > 0) {
      elapsedRef.current = 0;
      if (controls) {
        controls.autoRotate = false;
      }
      onTransitionStart();
    }
  }, [transitionCount, activeView, controls, onTransitionStart]);

  // If user starts interacting, cancel transition
  useEffect(() => {
    if (!controls) {
      return;
    }
    const handleStart = () => {
      onTransitionEnd();
    };
    controls.addEventListener("start", handleStart);
    return () => {
      controls.removeEventListener("start", handleStart);
    };
  }, [controls, onTransitionEnd]);

  useFrame((_, delta) => {
    if (!isTransitioning || !controls) {
      return;
    }

    elapsedRef.current += delta;

    const t = Math.min(delta * 4, 0.15);
    camera.position.lerp(desiredPos, t);
    controls.target.lerp(desiredTarget, t);
    controls.update();

    const distPos = camera.position.distanceTo(desiredPos);
    const distTarget = controls.target.distanceTo(desiredTarget);
    if ((distPos < 0.02 && distTarget < 0.02) || elapsedRef.current > 3.0) {
      camera.position.copy(desiredPos);
      controls.target.copy(desiredTarget);
      controls.update();
      onTransitionEnd();
    }
  });

  return null;
};

type AtelierSceneProps = {
  activeView: ViewConfig;
  autoRotate: boolean;
  transitionCount: number;
  onSelectPreset: (preset: ViewPreset) => void;
};

export const AtelierScene = ({
  activeView,
  autoRotate,
  transitionCount,
  onSelectPreset,
}: AtelierSceneProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const initialTarget = useRef(activeView.target).current;

  const handleTransitionStart = useCallback(() => {
    setIsTransitioning(true);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return (
    <div className="canvas-wrapper">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: activeView.position,
          fov: 42,
          near: 0.1,
          far: 50,
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        {/* Ambient & environmental lighting */}
        <ambientLight intensity={0.55} color="#ffffff" />
        <hemisphereLight args={["#fff2e0", "#dce5f0", 0.5]} position={[0, 10, 0]} />

        {/* Key light (sunlight through the open side / window) */}
        <directionalLight
          position={[6, 9, 5]}
          intensity={1.9}
          color="#fffdf7"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={0.5}
          shadow-camera-far={25}
          shadow-camera-left={-3.5}
          shadow-camera-right={3.5}
          shadow-camera-top={3.5}
          shadow-camera-bottom={-3.5}
          shadow-bias={-0.0003}
          shadow-radius={2}
        />

        {/* Soft fill light */}
        <directionalLight position={[-6, 4, -4]} intensity={0.4} color="#d0e2ff" />

        {/* Warm interior accent light */}
        <pointLight position={[0.2, 1.8, -0.3]} intensity={0.6} distance={5} color="#ffeed6" />

        <Suspense fallback={null}>
          <group position={[0, 0, 0]}>
            <AtelierModel onSelectPreset={onSelectPreset} />
          </group>

          {/* 3D Clickable Hotspots */}
          <Hotspots currentPreset={activeView.id} onSelectPreset={onSelectPreset} />

          {/* Contact shadow right under the diorama plinth */}
          <ContactShadows
            position={[0, -0.25, 0]}
            opacity={0.65}
            scale={7}
            blur={1.8}
            far={3}
            color="#2d241e"
          />
        </Suspense>

        <CameraAnimator
          activeView={activeView}
          transitionCount={transitionCount}
          isTransitioning={isTransitioning}
          onTransitionStart={handleTransitionStart}
          onTransitionEnd={handleTransitionEnd}
        />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.05}
          minDistance={2.5}
          maxDistance={12}
          minPolarAngle={0.2}
          maxPolarAngle={Math.PI / 2.05}
          target={initialTarget}
          autoRotate={autoRotate && !isTransitioning}
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
};
