import { useEffect, useRef } from "react";
import type { ScreenPosition } from "../../../types";

/** @scope .. */
export const useCardAnchorPosition = (onAnchorPosChange: (pos: ScreenPosition | null) => void) => {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const updateAnchor = () => {
      if (anchorRef.current) {
        const rect = anchorRef.current.getBoundingClientRect();
        onAnchorPosChange({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    updateAnchor();
    window.addEventListener("resize", updateAnchor);
    return () => {
      window.removeEventListener("resize", updateAnchor);
    };
  }, [onAnchorPosChange]);

  return anchorRef;
};
