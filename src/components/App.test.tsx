import { act, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import App from "./App";

const model = vi.hoisted(() => ({ read: vi.fn() }));
vi.mock("@react-three/drei", () => ({
  useGLTF: Object.assign(() => model.read(), { clear: vi.fn() }),
  useProgress: () => ({ progress: 100 }),
}));
vi.mock("./AtelierScene", () => ({ AtelierScene: () => <div>3D scene</div> }));
vi.mock("./InfoCard", () => ({ InfoCard: () => <div>Information card</div> }));
vi.mock("./UIOverlay", () => ({ UIOverlay: () => <div>Navigation</div> }));
vi.mock("./ConnectorLine", () => ({ ConnectorLine: () => null }));

// @ts-expect-error react act environment flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const container = document.createElement("div");
let root: ReturnType<typeof createRoot>;
beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(async () => {
  await act(async () => root.unmount());
  vi.useRealTimers();
  vi.restoreAllMocks();
});

it("keeps the entire page suspended until the model resolves, even at 100% progress", async () => {
  let resolve!: () => void;
  const pending = new Promise<void>((done) => {
    resolve = done;
  });
  model.read.mockImplementation(() => {
    throw pending;
  });
  root = createRoot(container);
  await act(async () => root.render(<App />));

  expect(container.querySelector('[role="status"]')).not.toBeNull();
  expect(container.textContent).not.toContain("3D scene");
  expect(container.textContent).not.toContain("Information card");
  expect(container.textContent).not.toContain("Navigation");

  await act(async () => vi.advanceTimersByTimeAsync(2000));
  expect(container.querySelector('[role="status"]')).not.toBeNull();

  await act(async () => {
    model.read.mockImplementation(() => ({}));
    resolve();
    await pending;
  });
  expect(container.querySelector('[role="status"]')).toBeNull();
  expect(container.textContent).toContain("3D scene");
  expect(container.textContent).toContain("Information card");
  expect(container.textContent).toContain("Navigation");
});

it("shows the load error and allows retrying the page", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  model.read.mockImplementation(() => {
    throw new Error("Model unavailable");
  });
  root = createRoot(container);
  await act(async () => root.render(<App />));
  expect(container.textContent).toContain("Model unavailable");
  expect(container.querySelector('[role="status"]')).toBeNull();

  model.read.mockImplementation(() => ({}));
  await act(async () => container.querySelector("button")!.click());
  await act(async () => vi.advanceTimersByTimeAsync(2000));
  expect(container.textContent).toContain("3D scene");
  expect(container.textContent).not.toContain("Model unavailable");
});

it("waits at least two seconds even when the model is already cached in StrictMode", async () => {
  model.read.mockImplementation(() => ({}));
  root = createRoot(container);
  await act(async () =>
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    ),
  );
  await act(async () => vi.advanceTimersByTimeAsync(1999));
  expect(container.querySelector('[role="status"]')).not.toBeNull();
  expect(container.textContent).not.toContain("Navigation");

  await act(async () => vi.advanceTimersByTimeAsync(1));
  expect(container.querySelector('[role="status"]')).toBeNull();
  expect(container.textContent).toContain("3D scene");
  expect(container.textContent).toContain("Navigation");
});
