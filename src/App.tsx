import { useCallback, useState } from "react";
import { AtelierScene } from "./components/AtelierScene";
import { ConnectorLine } from "./components/ConnectorLine";
import { InfoCard } from "./components/InfoCard";
import { LoadingScreen } from "./components/LoadingScreen";
import { UIOverlay } from "./components/UIOverlay";
import { CARD_INFOS, VIEW_PRESETS } from "./constants";
import type { ScreenPosition, ViewPreset } from "./types";

const App = () => {
  const [currentPreset, setCurrentPreset] = useState<ViewPreset>("overview");
  const [cardPreset, setCardPreset] = useState<ViewPreset>("overview");
  const [autoRotate, setAutoRotate] = useState(false);
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

  const handleToggleAutoRotate = useCallback(() => {
    setAutoRotate((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentPreset("overview");
    setCardPreset("overview");
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

  return (
    <main className="atelier-container">
      <LoadingScreen />
      <AtelierScene
        activeView={activeView}
        autoRotate={autoRotate}
        transitionCount={transitionCount}
        hoveredPreset={hoveredPreset}
        onSelectPreset={handleSelectPreset}
        onHoverPreset={handleHoverMarker}
        onUpdateMarkerPos={handleUpdateMarkerPos}
      />

      {/* Dashed connector line between card anchor and hovered 3D marker */}
      <ConnectorLine
        startPos={cardAnchorPos}
        endPos={markerScreenPos}
        visible={Boolean(hoveredPreset)}
      />

      {/* Bottom-left information card: always visible */}
      <InfoCard
        cardInfo={activeCardInfo}
        currentPreset={currentPreset}
        showConnector={Boolean(hoveredPreset)}
        onSelectPreset={handleSelectPreset}
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
