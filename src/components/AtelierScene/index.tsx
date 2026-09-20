import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import type { ScreenPosition, ViewConfig, ViewPreset } from "../../types";
import { useAtelierScene } from "./hooks/useAtelierScene";
import { CameraAnimator } from "../CameraAnimator";
import { AtelierModel } from "../AtelierModel";
import { ErrorBoundary } from "../ErrorBoundary";
import { Hotspots } from "../Hotspots";
import { SceneErrorFallback } from "../SceneErrorFallback";
import styles from "./index.module.css";

type AtelierSceneProps = {
  activeView: ViewConfig;
  autoRotate?: boolean;
  transitionCount: number;
  hoveredPreset: Exclude<ViewPreset, "overview"> | null;
  onSelectPreset: (preset: ViewPreset) => void;
  onHoverPreset: (preset: Exclude<ViewPreset, "overview"> | null) => void;
  onUpdateMarkerPos: (pos: ScreenPosition | null) => void;
};

export const AtelierScene = ({
  activeView,
  autoRotate = false,
  transitionCount,
  hoveredPreset,
  onSelectPreset,
  onHoverPreset,
  onUpdateMarkerPos,
}: AtelierSceneProps) => {
  const {
    retryKey,
    isTransitioning,
    initialTarget,
    handleTransitionStart,
    handleTransitionEnd,
    handleReset,
  } = useAtelierScene(activeView);

  return (
    <div className={styles.canvasWrapper}>
      <ErrorBoundary
        key={retryKey}
        onReset={handleReset}
        fallback={(error, reset) => <SceneErrorFallback error={error} onRetry={reset} />}
      >
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
            <Hotspots
              currentPreset={activeView.id}
              hoveredPreset={hoveredPreset}
              onSelectPreset={onSelectPreset}
              onHoverPreset={onHoverPreset}
              onUpdateMarkerPos={onUpdateMarkerPos}
            />

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
      </ErrorBoundary>
    </div>
  );
};
