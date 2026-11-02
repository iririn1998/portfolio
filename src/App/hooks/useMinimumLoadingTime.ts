import { useEffect, useState } from "react";

const MINIMUM_LOADING_TIME_MS = 2000;

/** @scope .. */
export const useMinimumLoadingTime = () => {
  // Keep the promise outside the suspended tree so retries reuse the same wait.
  const [wait] = useState(() => {
    let complete!: () => void;
    const promise = new Promise<void>((resolve) => {
      complete = resolve;
    });
    return { promise, complete };
  });

  useEffect(() => {
    const timer = setTimeout(wait.complete, MINIMUM_LOADING_TIME_MS);
    return () => clearTimeout(timer);
  }, [wait]);

  return wait.promise;
};
