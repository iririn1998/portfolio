import { AtelierScene } from "../AtelierScene";
import { ConnectorLine } from "../ConnectorLine";
import { InfoCard } from "../InfoCard";
import { LoadingScreen } from "../LoadingScreen";
import { UIOverlay } from "../UIOverlay";
import { useAtelierNavigation } from "./hooks/useAtelierNavigation";

const App = () => {
  const {
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
  } = useAtelierNavigation();

  return (
    <main className="atelier-container">
      <LoadingScreen />
      <AtelierScene
        activeView={activeView}
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

      <UIOverlay currentPreset={currentPreset} onSelectPreset={handleSelectPreset} />
    </main>
  );
};

/** @scope ../.. */
export default App;
