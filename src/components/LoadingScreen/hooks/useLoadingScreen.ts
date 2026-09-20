import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export const useLoadingScreen = () => {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

  return { progress, visible, isLoaded: !active && progress === 100 };
};
