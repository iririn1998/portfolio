import { describe, expect, it, vi } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { InfoCard } from "./index";
import { CARD_INFOS } from "../../../constants";

// @ts-expect-error react act environment flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("InfoCard component", () => {
  it("renders detail button and triggers onOpenDetail on click", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    const onOpenDetail = vi.fn();
    const onAnchorPosChange = vi.fn();

    await act(async () => {
      root.render(
        <InfoCard
          cardInfo={CARD_INFOS.desk}
          showConnector={false}
          onOpenDetail={onOpenDetail}
          onAnchorPosChange={onAnchorPosChange}
        />,
      );
    });

    expect(container.textContent).toContain("自己紹介");
    expect(container.textContent).not.toContain("視点をフォーカス");
    expect(container.textContent).not.toContain("現在のフォーカス視点");

    const detailBtn = container.querySelector("button");
    expect(detailBtn).not.toBeNull();
    expect(detailBtn?.textContent).toContain("詳細を見る");

    await act(async () => {
      detailBtn?.click();
    });

    expect(onOpenDetail).toHaveBeenCalledTimes(1);

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });

  it("shows guide message in overview mode and does not render detail button", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    const onOpenDetail = vi.fn();
    const onAnchorPosChange = vi.fn();

    await act(async () => {
      root.render(
        <InfoCard
          cardInfo={CARD_INFOS.overview}
          showConnector={false}
          onOpenDetail={onOpenDetail}
          onAnchorPosChange={onAnchorPosChange}
        />,
      );
    });

    expect(container.textContent).toContain("空間内のピンにカーソルを合わせて探索");
    expect(container.textContent).not.toContain("詳細を見る");

    const detailBtn = container.querySelector("button");
    expect(detailBtn).toBeNull();

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });
});
