import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { HOTSPOTS } from "../../../constants";
import type { ScreenPosition, ViewPreset } from "../../../types";

export const useMarkerScreenPosition = (
  hoveredPreset: Exclude<ViewPreset, "overview"> | null,
  onUpdateMarkerPos: (pos: ScreenPosition | null) => void,
) => {
  const { camera, size } = useThree();
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  // Continuously project 3D marker coordinate to 2D screen coordinate in real time
  useFrame(() => {
    if (!hoveredPreset) {
      onUpdateMarkerPos(null);
      return;
    }

    const activeSpot = HOTSPOTS.find((s) => s.id === hoveredPreset);
    if (!activeSpot) {
      onUpdateMarkerPos(null);
      return;
    }

    tempVec.set(...activeSpot.position);
    tempVec.project(camera);

    // If point is behind camera, do not display connector line
    if (tempVec.z > 1) {
      onUpdateMarkerPos(null);
      return;
    }

    const screenX = ((tempVec.x + 1) * size.width) / 2;
    const screenY = ((-tempVec.y + 1) * size.height) / 2;

    onUpdateMarkerPos({ x: screenX, y: screenY });
  });
};
