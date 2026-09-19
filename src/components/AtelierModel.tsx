import type { ThreeEvent } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import type { ViewPreset } from "../types";
import { getPresetFromObject } from "../utils";

type AtelierModelProps = {
  onSelectPreset?: (preset: ViewPreset) => void;
  onHoverPreset?: (preset: Exclude<ViewPreset, "overview"> | null) => void;
};

export const AtelierModel = ({ onSelectPreset, onHoverPreset }: AtelierModelProps) => {
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

  return (
    <primitive
      object={clonedScene}
      position={[0, 0, 0]}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        const preset = getPresetFromObject(e.object);
        if (preset && onSelectPreset) {
          e.stopPropagation();
          onSelectPreset(preset);
        }
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        const preset = getPresetFromObject(e.object);
        if (preset) {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          if (preset !== "overview" && onHoverPreset) {
            onHoverPreset(preset);
          }
        }
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
        if (onHoverPreset) {
          onHoverPreset(null);
        }
      }}
    />
  );
};

useGLTF.preload("/atelier.glb");
