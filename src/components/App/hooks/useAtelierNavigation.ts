import { useCallback, useState } from "react";
import { CARD_INFOS, VIEW_PRESETS } from "../../../constants";
import type { ScreenPosition, ViewPreset } from "../../../types";

/** @scope .. */
export const useAtelierNavigation = () => {
  const [currentPreset, setCurrentPreset] = useState<ViewPreset>("overview");
  const [cardPreset, setCardPreset] = useState<ViewPreset>("overview");
  const [transitionCount, setTransitionCount] = useState(0);

  // Hover state only for 3D marker pins
  const [hoveredPreset, setHoveredPreset] = useState<Exclude<ViewPreset, "overview"> | null>(null);
  const [markerScreenPos, setMarkerScreenPos] = useState<ScreenPosition | null>(null);
  const [cardAnchorPos, setCardAnchorPos] = useState<ScreenPosition | null>(null);

  const activeView = VIEW_PRESETS.find((v) => v.id === currentPreset) ?? VIEW_PRESETS[0];
  const activeCardInfo = CARD_INFOS[cardPreset] ?? CARD_INFOS.overview;

  const handleSelectPreset = useCallback((preset: ViewPreset) => {
    setCurrentPreset(preset);
    setCardPreset(preset);
    setTransitionCount((prev) => prev + 1);
    setHoveredPreset(null);
  }, []);

  // Update card and line ONLY when hovering over 3D markers
  const handleHoverMarker = useCallback((preset: Exclude<ViewPreset, "overview"> | null) => {
    setHoveredPreset(preset);
    if (preset) {
      setCardPreset(preset);
    }
  }, []);

  const handleUpdateMarkerPos = useCallback((pos: ScreenPosition | null) => {
    setMarkerScreenPos(pos);
  }, []);

  const handleAnchorPosChange = useCallback((pos: ScreenPosition | null) => {
    setCardAnchorPos(pos);
  }, []);

  return {
    currentPreset,
    hoveredPreset,
    markerScreenPos,
    cardAnchorPos,
    activeView,
    activeCardInfo,
    transitionCount,
    handleSelectPreset,
    handleHoverMarker,
    handleUpdateMarkerPos,
    handleAnchorPosChange,
  };
};
