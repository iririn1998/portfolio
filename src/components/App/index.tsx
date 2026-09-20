import { Suspense, use } from "react";
import { useGLTF } from "@react-three/drei";
import { ErrorBoundary } from "../ErrorBoundary";
import { SceneErrorFallback } from "../SceneErrorFallback";
import { AtelierScene } from "../AtelierScene";
import { ConnectorLine } from "../ConnectorLine";
import { InfoCard } from "../InfoCard";
import { LoadingScreen } from "../LoadingScreen";
import { UIOverlay } from "../UIOverlay";
import { useAtelierNavigation } from "./hooks/useAtelierNavigation";

import { useMinimumLoadingTime } from "./hooks/useMinimumLoadingTime";
import styles from "./index.module.css";

const AtelierPage = ({ minimumLoadingTime }: { minimumLoadingTime: Promise<void> }) => {
  // Suspend before mounting the page; AtelierModel reuses the same GLTF cache.
  useGLTF("/atelier.glb");
  use(minimumLoadingTime);

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
        currentPreset={currentPreset}
        showConnector={Boolean(hoveredPreset)}
        onSelectPreset={handleSelectPreset}
        onAnchorPosChange={handleAnchorPosChange}
      />

      <UIOverlay currentPreset={currentPreset} onSelectPreset={handleSelectPreset} />
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

/** @scope ../.. */
export default App;
