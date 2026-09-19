import { useCallback, useRef, useState } from "react";
import { AtelierScene } from "./components/AtelierScene";
import { ConnectorLine } from "./components/ConnectorLine";
import { InfoCard } from "./components/InfoCard";
import { LoadingScreen } from "./components/LoadingScreen";
import { UIOverlay } from "./components/UIOverlay";
import { HOTSPOTS, VIEW_PRESETS } from "./constants";
import type { ScreenPosition, ViewPreset } from "./types";

const App = () => {
  const [currentPreset, setCurrentPreset] = useState<ViewPreset>("overview");
  const [autoRotate, setAutoRotate] = useState(false);
  const [transitionCount, setTransitionCount] = useState(0);

  // Hover state for 3D hotspots / objects
  const [hoveredPreset, setHoveredPreset] = useState<Exclude<ViewPreset, "overview"> | null>(null);
  const [markerScreenPos, setMarkerScreenPos] = useState<ScreenPosition | null>(null);
  const [cardAnchorPos, setCardAnchorPos] = useState<ScreenPosition | null>(null);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const unhoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeView = VIEW_PRESETS.find((v) => v.id === currentPreset) ?? VIEW_PRESETS[0];
  const activeHotspot = HOTSPOTS.find((h) => h.id === hoveredPreset) ?? null;

  const handleSelectPreset = useCallback((preset: ViewPreset) => {
    setCurrentPreset(preset);
    setTransitionCount((prev) => prev + 1);
    setHoveredPreset(null);
  }, []);

  const handleToggleAutoRotate = useCallback(() => {
    setAutoRotate((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentPreset("overview");
    setTransitionCount((prev) => prev + 1);
    setHoveredPreset(null);
  }, []);

  const handleHoverPreset = useCallback(
    (preset: Exclude<ViewPreset, "overview"> | null) => {
      if (unhoverTimerRef.current) {
        clearTimeout(unhoverTimerRef.current);
        unhoverTimerRef.current = null;
      }

      if (preset) {
        setHoveredPreset(preset);
      } else {
        unhoverTimerRef.current = setTimeout(() => {
          if (!isHoveringCard) {
            setHoveredPreset(null);
          }
        }, 250);
      }
    },
    [isHoveringCard],
  );

  const handleHoverCard = useCallback((hovering: boolean) => {
    setIsHoveringCard(hovering);
    if (!hovering) {
      unhoverTimerRef.current = setTimeout(() => {
        setHoveredPreset(null);
      }, 250);
    } else if (unhoverTimerRef.current) {
      clearTimeout(unhoverTimerRef.current);
      unhoverTimerRef.current = null;
    }
  }, []);

  const handleUpdateMarkerPos = useCallback((pos: ScreenPosition | null) => {
    setMarkerScreenPos(pos);
  }, []);

  const handleAnchorPosChange = useCallback((pos: ScreenPosition | null) => {
    setCardAnchorPos(pos);
  }, []);

  return (
    <main className="atelier-container">
      <LoadingScreen />
      <AtelierScene
        activeView={activeView}
        autoRotate={autoRotate}
        transitionCount={transitionCount}
        hoveredPreset={hoveredPreset}
        onSelectPreset={handleSelectPreset}
        onHoverPreset={handleHoverPreset}
        onUpdateMarkerPos={handleUpdateMarkerPos}
      />

      {/* Dashed connector line between card anchor and 3D marker */}
      <ConnectorLine
        startPos={cardAnchorPos}
        endPos={markerScreenPos}
        visible={Boolean(hoveredPreset && activeHotspot)}
      />

      {/* Info card in bottom-left */}
      <InfoCard
        hotspot={activeHotspot}
        visible={Boolean(hoveredPreset && activeHotspot)}
        onSelectPreset={handleSelectPreset}
        onHoverCard={handleHoverCard}
        onAnchorPosChange={handleAnchorPosChange}
      />

      <UIOverlay
        currentPreset={currentPreset}
        onSelectPreset={handleSelectPreset}
        autoRotate={autoRotate}
        onToggleAutoRotate={handleToggleAutoRotate}
        onReset={handleReset}
      />
    </main>
  );
};

export default App;
