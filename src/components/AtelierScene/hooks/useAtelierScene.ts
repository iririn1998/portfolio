import { useCallback, useRef, useState } from "react";
import type { ViewConfig } from "../../../types";

/** @scope .. */
export const useAtelierScene = (activeView: ViewConfig) => {
  const [retryKey, setRetryKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const initialTarget = useRef(activeView.target).current;

  const handleTransitionStart = useCallback(() => {
    setIsTransitioning(true);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  const handleReset = useCallback(() => {
    setRetryKey((prev) => prev + 1);
  }, []);

  return {
    retryKey,
    isTransitioning,
    initialTarget,
    handleTransitionStart,
    handleTransitionEnd,
    handleReset,
  };
};
