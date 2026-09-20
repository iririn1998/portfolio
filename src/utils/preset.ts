import type * as THREE from "three";
import type { ViewPreset } from "../types";

export const getPresetFromObject = (obj: THREE.Object3D): ViewPreset | null => {
  let curr: THREE.Object3D | null = obj;
  while (curr) {
    const name = curr.name.toLowerCase();
    if (
      name.includes("desk") ||
      name.includes("monitor") ||
      name.includes("keyboard") ||
      name.includes("chair") ||
      name.includes("mouse") ||
      name.includes("coffee")
    ) {
      return "desk";
    }
    if (name.includes("bookshelf") || name.includes("bookcase") || name.includes("book")) {
      return "bookshelf";
    }
    if (
      name.includes("plant") ||
      name.includes("pot") ||
      name.includes("leaf") ||
      name.includes("soil")
    ) {
      return "window";
    }
    curr = curr.parent;
  }
  return null;
};
