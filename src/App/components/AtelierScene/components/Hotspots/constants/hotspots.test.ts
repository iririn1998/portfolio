import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { HOTSPOTS } from "./hotspots";

describe("Hotspots", () => {
  it("should define valid hotspots corresponding to presets", () => {
    expect(HOTSPOTS.length).toBe(3);
    const validPresetIds = ["desk", "bookshelf", "window"];

    for (const spot of HOTSPOTS) {
      expect(validPresetIds).toContain(spot.id);
      expect(spot.label).toBeTruthy();
      expect(spot.subLabel).toBeTruthy();
      expect(spot.description).toBeTruthy();
      expect(spot.icon).toBeTruthy();
      expect(spot.detailHint).toBeTruthy();
      expect(spot.position).toHaveLength(3);
    }
  });

  it("should project 3D point into screen space coordinates correctly", () => {
    const camera = new THREE.PerspectiveCamera(45, 1280 / 800, 0.1, 50);
    camera.position.set(5.2, 4.6, 5.2);
    camera.lookAt(0, 0.75, 0);
    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();

    const deskSpot = HOTSPOTS[0];
    const worldPos = new THREE.Vector3(...deskSpot.position);
    worldPos.project(camera);

    // Should be in front of the camera (NDC z between -1 and 1)
    expect(worldPos.z).toBeLessThan(1);
    expect(worldPos.z).toBeGreaterThan(-1);

    // Convert to pixel coordinates
    const screenX = ((worldPos.x + 1) * 1280) / 2;
    const screenY = ((-worldPos.y + 1) * 800) / 2;

    expect(screenX).toBeGreaterThan(0);
    expect(screenX).toBeLessThan(1280);
    expect(screenY).toBeGreaterThan(0);
    expect(screenY).toBeLessThan(800);
  });
});
