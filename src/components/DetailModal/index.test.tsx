import { describe, expect, it, vi } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { DetailModal } from "./index";

// @ts-expect-error react act environment flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("DetailModal component", () => {
  it("keeps the same content during exit and removes it after the animation", async () => {
    vi.useFakeTimers();
    const container = document.createElement("div");
    const root = createRoot(container);
    const onClose = vi.fn();

    try {
      await act(async () => root.render(<DetailModal isOpen preset="desk" onClose={onClose} />));
      await act(async () =>
        root.render(<DetailModal isOpen={false} preset="bookshelf" onClose={onClose} />),
      );
      expect(container.textContent).toContain("自己紹介");
      expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
      await act(async () => vi.advanceTimersByTimeAsync(250));
      expect(container.innerHTML).toBe("");
    } finally {
      await act(async () => root.unmount());
      vi.useRealTimers();
    }
  });

  it("cancels the exit when reopened before it completes", async () => {
    vi.useFakeTimers();
    const container = document.createElement("div");
    const root = createRoot(container);
    const onClose = vi.fn();

    try {
      await act(async () => root.render(<DetailModal isOpen preset="desk" onClose={onClose} />));
      await act(async () =>
        root.render(<DetailModal isOpen={false} preset="desk" onClose={onClose} />),
      );
      await act(async () =>
        root.render(<DetailModal isOpen preset="bookshelf" onClose={onClose} />),
      );
      await act(async () => vi.advanceTimersByTimeAsync(250));
      expect(container.textContent).toContain("スキル");
      expect(container.querySelector('[role="dialog"]')).not.toBeNull();
    } finally {
      await act(async () => root.unmount());
      vi.useRealTimers();
    }
  });

  it("renders nothing when isOpen is false", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<DetailModal isOpen={false} preset="desk" onClose={vi.fn()} />);
    });

    expect(container.innerHTML).toBe("");

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });

  it("renders detail content when isOpen is true and closes on close button click", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    const onClose = vi.fn();

    await act(async () => {
      root.render(<DetailModal isOpen={true} preset="desk" onClose={onClose} />);
    });

    expect(container.textContent).toContain("自己紹介");
    expect(container.textContent).toContain("About Me");
    expect(container.textContent).toContain("プロフィール");

    const closeBtn = container.querySelector('button[aria-label="閉じる"]');
    expect(closeBtn).not.toBeNull();

    await act(async () => {
      closeBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onClose).toHaveBeenCalledTimes(1);

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });

  it("focuses the close button on opening and reopening and closes on Escape", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    const onClose = vi.fn();

    await act(async () => {
      root.render(<DetailModal isOpen={true} preset="desk" onClose={onClose} />);
    });

    const closeButton = container.querySelector<HTMLButtonElement>('button[aria-label="閉じる"]');
    expect(document.activeElement).toBe(closeButton);

    await act(async () => {
      closeButton?.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });

    expect(onClose).toHaveBeenCalledTimes(1);

    await act(async () => {
      root.render(<DetailModal isOpen={false} preset="desk" onClose={onClose} />);
    });
    await act(async () => {
      root.render(<DetailModal isOpen={true} preset="desk" onClose={onClose} />);
    });
    expect(document.activeElement).toBe(container.querySelector('button[aria-label="閉じる"]'));

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });

  it("renders only the selected item without tabs to select other items", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<DetailModal isOpen={true} preset="desk" onClose={vi.fn()} />);
    });

    // Navigation for switching items does not exist
    expect(container.querySelector("nav")).toBeNull();

    // Contains desk content
    expect(container.textContent).toContain("自己紹介");
    expect(container.textContent).toContain("About Me");

    // Does not contain skills or products content
    expect(container.textContent).not.toContain("開発スキル・技術領域");
    expect(container.textContent).not.toContain("制作実績・プロジェクト");

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });

  it("renders skills content specifically when preset is bookshelf", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<DetailModal isOpen={true} preset="bookshelf" onClose={vi.fn()} />);
    });

    expect(container.querySelector("nav")).toBeNull();
    expect(container.textContent).toContain("スキル");
    expect(container.textContent).toContain("Skills");
    expect(container.textContent).toContain("開発スキル・技術領域");
    expect(container.textContent).not.toContain("プロフィール");

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });
});
