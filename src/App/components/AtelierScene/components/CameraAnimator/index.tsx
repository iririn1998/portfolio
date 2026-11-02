import { useCameraAnimation } from "./hooks/useCameraAnimation";

type CameraAnimatorProps = Parameters<typeof useCameraAnimation>[0];

/** @scope ../.. */
export const CameraAnimator = (props: CameraAnimatorProps) => {
  useCameraAnimation(props);
  return null;
};
