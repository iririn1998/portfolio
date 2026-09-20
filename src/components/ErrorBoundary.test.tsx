import { describe, expect, it, vi } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./ErrorBoundary";
import { SceneErrorFallback } from "./SceneErrorFallback";

// @ts-expect-error react act environment flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const ThrowingComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("GLTF load failed: /atelier.glb not found");
  }
  return <div data-testid="child">Normal Content</div>;
};

describe("ErrorBoundary component", () => {
  it("renders children normally when no error occurs", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        <ErrorBoundary>
          <ThrowingComponent shouldThrow={false} />
        </ErrorBoundary>,
      );
    });

    expect(container.textContent).toContain("Normal Content");

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });

  it("catches errors and renders the custom fallback UI", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    await act(async () => {
      root.render(
        <ErrorBoundary
          fallback={(error, reset) => (
            <div data-testid="fallback">
              <span>{error.message}</span>
              <button type="button" onClick={reset}>
                Retry
              </button>
            </div>
          )}
        >
          <ThrowingComponent shouldThrow={true} />
        </ErrorBoundary>,
      );
    });

    expect(container.textContent).toContain("GLTF load failed: /atelier.glb not found");
    expect(container.querySelector("button")?.textContent).toBe("Retry");

    consoleError.mockRestore();
    await act(async () => {
      root.unmount();
    });
    container.remove();
  });

  it("calls onError callback when error is caught", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    const onError = vi.fn();
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    await act(async () => {
      root.render(
        <ErrorBoundary onError={onError}>
          <ThrowingComponent shouldThrow={true} />
        </ErrorBoundary>,
      );
    });

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0].message).toContain("GLTF load failed");

    consoleError.mockRestore();
    await act(async () => {
      root.unmount();
    });
    container.remove();
  });
});

describe("SceneErrorFallback component", () => {
  it("renders error message and triggers onRetry callback", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    const onRetry = vi.fn();

    const testError = new Error("Network error fetching 3D asset");

    await act(async () => {
      root.render(<SceneErrorFallback error={testError} onRetry={onRetry} />);
    });

    expect(container.textContent).toContain("3D空間の読み込みに失敗しました");
    expect(container.textContent).toContain("Network error fetching 3D asset");

    const retryBtn = container.querySelector("button.scene-error-retry-btn");
    expect(retryBtn).not.toBeNull();

    await act(async () => {
      retryBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onRetry).toHaveBeenCalledTimes(1);

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });
});
