import { useCameraAnimation } from "./hooks/useCameraAnimation";

type CameraAnimatorProps = Parameters<typeof useCameraAnimation>[0];

export const CameraAnimator = (props: CameraAnimatorProps) => {
  useCameraAnimation(props);
  return null;
};
