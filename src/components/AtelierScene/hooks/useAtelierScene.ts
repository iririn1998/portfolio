import { useCallback, useRef, useState } from "react";
import type { ViewConfig } from "../../../types";

/** @scope .. */
export const useAtelierScene = (activeView: ViewConfig) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const initialTarget = useRef(activeView.target).current;

  const handleTransitionStart = useCallback(() => {
    setIsTransitioning(true);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return {
    isTransitioning,
    initialTarget,
    handleTransitionStart,
    handleTransitionEnd,
  };
};
