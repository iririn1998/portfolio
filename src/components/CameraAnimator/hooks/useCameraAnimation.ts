import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import type { ViewConfig } from "../../../types";

type CameraAnimationOptions = {
  activeView: ViewConfig;
  transitionCount: number;
  isTransitioning: boolean;
  onTransitionStart: () => void;
  onTransitionEnd: () => void;
};

/** @scope .. */
export const useCameraAnimation = ({
  activeView,
  transitionCount,
  isTransitioning,
  onTransitionStart,
  onTransitionEnd,
}: CameraAnimationOptions) => {
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
};
