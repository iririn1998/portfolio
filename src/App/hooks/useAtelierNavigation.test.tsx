import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { useAtelierNavigation } from "./useAtelierNavigation";

// @ts-expect-error react act environment flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let navigation: ReturnType<typeof useAtelierNavigation>;
const Harness = () => {
  navigation = useAtelierNavigation();
  return null;
};
const container = document.createElement("div");
let root: ReturnType<typeof createRoot>;

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  vi.restoreAllMocks();
  window.history.replaceState(null, "", "/");
});

it.each([
  ["desk", "/about"],
  ["bookshelf", "/skills"],
  ["window", "/products"],
] as const)("opens %s at %s and responds to history navigation", async (preset, path) => {
  await act(async () => root.render(<Harness />));
  await act(async () => navigation.handleSelectPreset(preset));
  await act(async () => navigation.handleOpenDetail(preset));
  expect(window.location.pathname).toBe(path);
  expect(navigation.detailPreset).toBe(preset);

  await act(async () => {
    window.history.replaceState(null, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
  expect(navigation.isDetailOpen).toBe(false);

  await act(async () => {
    window.history.replaceState(null, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
  expect(navigation.detailPreset).toBe(preset);
  expect(navigation.currentPreset).toBe(preset);
});

it("opens a direct link and closes it without leaving the site", async () => {
  window.history.replaceState(null, "", "/skills?ref=share#section");
  await act(async () => root.render(<Harness />));
  expect(navigation.detailPreset).toBe("bookshelf");
  expect(navigation.currentPreset).toBe("bookshelf");

  await act(async () => navigation.handleCloseDetail());
  expect(window.location.pathname).toBe("/");
  expect(window.location.search).toBe("?ref=share");
  expect(window.location.hash).toBe("#section");
  expect(navigation.isDetailOpen).toBe(false);
});

it("uses browser history to close a modal opened in the app", async () => {
  await act(async () => root.render(<Harness />));
  await act(async () => navigation.handleOpenDetail("desk"));
  const back = vi.spyOn(window.history, "back").mockImplementation(() => {});
  await act(async () => navigation.handleCloseDetail());
  expect(back).toHaveBeenCalledOnce();
});

it("only zooms when a preset is selected", async () => {
  await act(async () => root.render(<Harness />));
  await act(async () => navigation.handleSelectPreset("bookshelf"));
  expect(navigation.currentPreset).toBe("bookshelf");
  expect(window.location.pathname).toBe("/");
  expect(navigation.isDetailOpen).toBe(false);
  expect(navigation.transitionCount).toBe(1);
});
