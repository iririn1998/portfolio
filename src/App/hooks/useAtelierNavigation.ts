import { useCallback, useEffect, useState } from "react";
import { VIEW_PRESETS } from "../../constants";
import type { DetailPreset, ViewPreset } from "../../types";

const detailPaths: Record<DetailPreset, string> = {
  desk: "/about",
  bookshelf: "/skills",
  window: "/products",
};

const detailFromPath = (): DetailPreset | null => {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  return (
    (Object.keys(detailPaths) as DetailPreset[]).find((key) => detailPaths[key] === path) ?? null
  );
};

/** @scope .. */
export const useAtelierNavigation = () => {
  const [currentPreset, setCurrentPreset] = useState<ViewPreset>(
    () => detailFromPath() ?? "overview",
  );
  const [transitionCount, setTransitionCount] = useState(0);
  const [detailPreset, setDetailPreset] = useState<DetailPreset | null>(detailFromPath);

  useEffect(() => {
    const syncLocation = () => {
      const detail = detailFromPath();
      setDetailPreset(detail);
      if (detail) {
        setCurrentPreset(detail);
        setTransitionCount((prev) => prev + 1);
      }
    };
    window.addEventListener("popstate", syncLocation);
    return () => window.removeEventListener("popstate", syncLocation);
  }, []);

  const activeView = VIEW_PRESETS.find((v) => v.id === currentPreset) ?? VIEW_PRESETS[0];

  const handleSelectPreset = useCallback((preset: ViewPreset) => {
    setCurrentPreset(preset);
    setTransitionCount((prev) => prev + 1);
  }, []);

  const handleOpenDetail = useCallback((detail: DetailPreset) => {
    window.history.pushState(
      { atelierDetail: true },
      "",
      detailPaths[detail] + window.location.search + window.location.hash,
    );
    setDetailPreset(detail);
  }, []);

  const handleCloseDetail = useCallback(() => {
    if (window.history.state?.atelierDetail) {
      window.history.back();
    } else {
      window.history.replaceState(
        window.history.state,
        "",
        "/" + window.location.search + window.location.hash,
      );
      setDetailPreset(null);
    }
  }, []);

  return {
    currentPreset,
    activeView,
    transitionCount,
    isDetailOpen: detailPreset !== null,
    detailPreset,
    handleOpenDetail,
    handleCloseDetail,
    handleSelectPreset,
  };
};
