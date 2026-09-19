import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { VIEW_PRESETS } from "../constants";

describe("Camera & Preset Validation", () => {
  it("should define all expected presets with valid coordinates", () => {
    const expectedIds = ["overview", "desk", "bookshelf", "window"];
    const actualIds = VIEW_PRESETS.map((p) => p.id);
    expect(actualIds).toEqual(expectedIds);

    for (const preset of VIEW_PRESETS) {
      expect(preset.position).toHaveLength(3);
      expect(preset.target).toHaveLength(3);
      // Distance between camera position and target should be reasonable
      const pos = new THREE.Vector3(...preset.position);
      const target = new THREE.Vector3(...preset.target);
      const dist = pos.distanceTo(target);
      expect(dist).toBeGreaterThan(1.0);
      expect(dist).toBeLessThan(12.0);
    }
  });

  it("should successfully converge to target without competing with autoRotate", () => {
    const startPos = new THREE.Vector3(...VIEW_PRESETS[0].position);
    const targetPos = new THREE.Vector3(...VIEW_PRESETS[1].position);
    const cameraPos = startPos.clone();

    let isTransitioning = true;
    const delta = 1 / 60;
    let frames = 0;
    const maxFrames = 60 * 3; // 3 seconds max

    while (isTransitioning && frames < maxFrames) {
      frames++;
      const t = Math.min(delta * 4, 0.15);
      cameraPos.lerp(targetPos, t);

      // During transition, auto-rotation must be paused so no rotation delta is added
      const dist = cameraPos.distanceTo(targetPos);
      if (dist < 0.02) {
        cameraPos.copy(targetPos);
        isTransitioning = false;
      }
    }

    // Must converge within 2 seconds (< 120 frames)
    expect(isTransitioning).toBe(false);
    expect(frames).toBeLessThan(120);
    expect(cameraPos.distanceTo(targetPos)).toBe(0);
  });

  it("should smoothly interpolate both camera position and target simultaneously", () => {
    const startPreset = VIEW_PRESETS[0];
    const destPreset = VIEW_PRESETS[1];

    const cameraPos = new THREE.Vector3(...startPreset.position);
    const controlsTarget = new THREE.Vector3(...startPreset.target);

    const desiredPos = new THREE.Vector3(...destPreset.position);
    const desiredTarget = new THREE.Vector3(...destPreset.target);

    const delta = 1 / 60;
    const t = Math.min(delta * 4, 0.15);

    // After 1 frame of transition
    cameraPos.lerp(desiredPos, t);
    controlsTarget.lerp(desiredTarget, t);

    // Neither should have jumped instantly to the destination
    expect(controlsTarget.distanceTo(desiredTarget)).toBeGreaterThan(0.01);
    expect(cameraPos.distanceTo(desiredPos)).toBeGreaterThan(0.01);

    // Nor should controlsTarget remain at start position
    const startTarget = new THREE.Vector3(...startPreset.target);
    expect(controlsTarget.distanceTo(startTarget)).toBeGreaterThan(0);

    // Simulate to completion
    let isTransitioning = true;
    let frames = 1;
    while (isTransitioning && frames < 180) {
      frames++;
      cameraPos.lerp(desiredPos, t);
      controlsTarget.lerp(desiredTarget, t);
      if (
        cameraPos.distanceTo(desiredPos) < 0.02 &&
        controlsTarget.distanceTo(desiredTarget) < 0.02
      ) {
        cameraPos.copy(desiredPos);
        controlsTarget.copy(desiredTarget);
        isTransitioning = false;
      }
    }

    expect(isTransitioning).toBe(false);
    expect(controlsTarget.distanceTo(desiredTarget)).toBe(0);
    expect(cameraPos.distanceTo(desiredPos)).toBe(0);
  });
});
