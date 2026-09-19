import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export const AtelierModel = () => {
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

  return <primitive object={clonedScene} position={[0, 0, 0]} />;
};

useGLTF.preload("/atelier.glb");
