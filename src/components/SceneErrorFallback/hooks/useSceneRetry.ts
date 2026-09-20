import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useCallback } from "react";

/** @scope .. */
export const useSceneRetry = (onRetry: () => void) => {
  const handleRetry = useCallback(() => {
    try {
      useGLTF.clear("/atelier.glb");
      THREE.Cache.clear();
    } catch {
      // Ignore cleanup error if already cleared
    }
    onRetry();
  }, [onRetry]);

  return handleRetry;
};
