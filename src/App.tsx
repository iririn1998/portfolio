import { useState, useCallback } from "react";
import { AtelierScene } from "./components/AtelierScene";
import { LoadingScreen } from "./components/LoadingScreen";
import { UIOverlay } from "./components/UIOverlay";
import { VIEW_PRESETS } from "./constants";
import type { ViewPreset } from "./types";

const App = () => {
  const [currentPreset, setCurrentPreset] = useState<ViewPreset>("overview");
  const [autoRotate, setAutoRotate] = useState(false);
  const [transitionCount, setTransitionCount] = useState(0);

  const activeView = VIEW_PRESETS.find((v) => v.id === currentPreset) ?? VIEW_PRESETS[0];

  const handleSelectPreset = useCallback((preset: ViewPreset) => {
    setCurrentPreset(preset);
    setTransitionCount((prev) => prev + 1);
  }, []);

  const handleToggleAutoRotate = useCallback(() => {
    setAutoRotate((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentPreset("overview");
    setTransitionCount((prev) => prev + 1);
  }, []);

  return (
    <main className="atelier-container">
      <LoadingScreen />
      <AtelierScene
        activeView={activeView}
        autoRotate={autoRotate}
        transitionCount={transitionCount}
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
