import { useProgress } from "@react-three/drei";

/** @scope .. */
export const useLoadingScreen = () => {
  const { progress } = useProgress();

  return { progress };
};
