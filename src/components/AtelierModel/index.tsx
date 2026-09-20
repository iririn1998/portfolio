import { useAtelierModel } from "./hooks/useAtelierModel";
import type { ViewPreset } from "../../types";

type AtelierModelProps = {
  onSelectPreset?: (preset: ViewPreset) => void;
};

export const AtelierModel = ({ onSelectPreset }: AtelierModelProps) => {
  const { clonedScene, handleClick } = useAtelierModel(onSelectPreset);

  return <primitive object={clonedScene} position={[0, 0, 0]} onClick={handleClick} />;
};
