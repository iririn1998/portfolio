import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { getPresetFromObject } from "./preset";

describe("Object Click Detection", () => {
  it("should correctly resolve presets from object and hierarchy names", () => {
    const root = new THREE.Group();
    root.name = "Scene";

    const deskParent = new THREE.Group();
    deskParent.name = "Desk";
    root.add(deskParent);

    const monitorMesh = new THREE.Mesh();
    monitorMesh.name = "Monitor display";
    deskParent.add(monitorMesh);

    const bookshelfMesh = new THREE.Mesh();
    bookshelfMesh.name = "Bookcase shelf";
    root.add(bookshelfMesh);

    const plantLeaf = new THREE.Mesh();
    plantLeaf.name = "Leaf 0";
    root.add(plantLeaf);

    const randomMesh = new THREE.Mesh();
    randomMesh.name = "Unknown floor plank";
    root.add(randomMesh);

    expect(getPresetFromObject(monitorMesh)).toBe("desk");
    expect(getPresetFromObject(bookshelfMesh)).toBe("bookshelf");
    expect(getPresetFromObject(plantLeaf)).toBe("window");
    expect(getPresetFromObject(randomMesh)).toBeNull();
  });
});
