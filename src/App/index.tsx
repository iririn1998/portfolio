import { Suspense, use } from "react";
import { useGLTF } from "@react-three/drei";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { SceneErrorFallback } from "./components/SceneErrorFallback";
import { AtelierScene } from "./components/AtelierScene";
import { ConnectorLine } from "./components/ConnectorLine";
import { DetailModal } from "./components/DetailModal";
import { InfoCard } from "./components/InfoCard";
import { LoadingScreen } from "./components/LoadingScreen";
import { UIOverlay } from "./components/UIOverlay";
import { useAtelierNavigation } from "./hooks/useAtelierNavigation";

import { useMinimumLoadingTime } from "./hooks/useMinimumLoadingTime";
import styles from "./index.module.css";

const AtelierPage = ({ minimumLoadingTime }: { minimumLoadingTime: Promise<void> }) => {
  // Suspend before mounting the page; AtelierModel reuses the same GLTF cache.
  useGLTF("/atelier.glb");
  use(minimumLoadingTime);

  const {
    currentPreset,
    cardPreset,
    hoveredPreset,
    markerScreenPos,
    cardAnchorPos,
    activeView,
    activeCardInfo,
    transitionCount,
    isDetailOpen,
    detailPreset,
    handleOpenDetail,
    handleCloseDetail,
    handleSelectPreset,
    handleHoverMarker,
    handleUpdateMarkerPos,
    handleAnchorPosChange,
  } = useAtelierNavigation();

  return (
    <div className={styles.pageReveal}>
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
        showConnector={Boolean(hoveredPreset)}
        onOpenDetail={handleOpenDetail}
        onAnchorPosChange={handleAnchorPosChange}
      />

      <UIOverlay currentPreset={currentPreset} onSelectPreset={handleSelectPreset} />

      {/* Detailed information modal */}
      <DetailModal
        isOpen={isDetailOpen}
        preset={detailPreset ?? cardPreset}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

const App = () => {
  const minimumLoadingTime = useMinimumLoadingTime();

  return (
    <main className="atelier-container">
      <ErrorBoundary
        fallback={(error, reset) => <SceneErrorFallback error={error} onRetry={reset} />}
      >
        <Suspense fallback={<LoadingScreen />}>
          <AtelierPage minimumLoadingTime={minimumLoadingTime} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
};

export default App;
