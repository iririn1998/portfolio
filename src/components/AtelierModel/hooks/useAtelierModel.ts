import type { ThreeEvent } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useCallback, useMemo } from "react";
import * as THREE from "three";
import type { ViewPreset } from "../../../types";
import { getPresetFromObject } from "../../../utils";

/** @scope .. */
export const useAtelierModel = (onSelectPreset?: (preset: ViewPreset) => void) => {
  const { scene } = useGLTF("/atelier.glb");

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              mat.roughness = Math.max(mat.roughness, 0.4);
            });
          } else {
            child.material.roughness = Math.max(child.material.roughness, 0.4);
          }
        }
      }
    });

    return clone;
  }, [scene]);

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      const preset = getPresetFromObject(e.object);
      if (preset && onSelectPreset) {
        e.stopPropagation();
        onSelectPreset(preset);
      }
    },
    [onSelectPreset],
  );

  return { clonedScene, handleClick };
};

useGLTF.preload("/atelier.glb");
