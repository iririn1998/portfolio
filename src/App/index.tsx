import { Suspense, use } from "react";
import { useGLTF } from "@react-three/drei";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { SceneErrorFallback } from "./components/SceneErrorFallback";
import { AtelierScene } from "./components/AtelierScene";
import { DetailModal } from "./components/DetailModal";
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
    activeView,
    transitionCount,
    isDetailOpen,
    detailPreset,
    handleOpenDetail,
    handleCloseDetail,
    handleSelectPreset,
  } = useAtelierNavigation();

  return (
    <div className={styles.pageReveal}>
      <AtelierScene
        activeView={activeView}
        transitionCount={transitionCount}
        onSelectPreset={handleSelectPreset}
        onOpenDetail={handleOpenDetail}
      />

      <UIOverlay currentPreset={currentPreset} onSelectPreset={handleSelectPreset} />

      {/* Detailed information modal */}
      <DetailModal
        isOpen={isDetailOpen}
        preset={detailPreset ?? currentPreset}
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
