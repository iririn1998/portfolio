import { useCallback, useEffect, useState } from "react";
import { CARD_INFOS, VIEW_PRESETS } from "../../../constants";
import type { DetailPreset, ScreenPosition, ViewPreset } from "../../../types";

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
  const [cardPreset, setCardPreset] = useState<ViewPreset>(() => detailFromPath() ?? "overview");
  const [transitionCount, setTransitionCount] = useState(0);

  // Hover state only for 3D marker pins
  const [hoveredPreset, setHoveredPreset] = useState<Exclude<ViewPreset, "overview"> | null>(null);
  const [markerScreenPos, setMarkerScreenPos] = useState<ScreenPosition | null>(null);
  const [cardAnchorPos, setCardAnchorPos] = useState<ScreenPosition | null>(null);

  const [detailPreset, setDetailPreset] = useState<DetailPreset | null>(detailFromPath);

  useEffect(() => {
    const syncLocation = () => {
      const detail = detailFromPath();
      setDetailPreset(detail);
      if (detail) {
        setCurrentPreset(detail);
        setCardPreset(detail);
        setHoveredPreset(null);
        setTransitionCount((prev) => prev + 1);
      }
    };
    window.addEventListener("popstate", syncLocation);
    return () => window.removeEventListener("popstate", syncLocation);
  }, []);

  const activeView = VIEW_PRESETS.find((v) => v.id === currentPreset) ?? VIEW_PRESETS[0];
  const activeCardInfo = CARD_INFOS[cardPreset] ?? CARD_INFOS.overview;

  const handleSelectPreset = useCallback((preset: ViewPreset) => {
    setCurrentPreset(preset);
    setCardPreset(preset);
    setTransitionCount((prev) => prev + 1);
    setHoveredPreset(null);
  }, []);

  const handleOpenDetail = useCallback(() => {
    const detail = cardPreset === "overview" ? "desk" : cardPreset;
    window.history.pushState(
      { atelierDetail: true },
      "",
      detailPaths[detail] + window.location.search + window.location.hash,
    );
    setDetailPreset(detail);
  }, [cardPreset]);

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
    cardPreset,
    hoveredPreset,
    markerScreenPos,
    cardAnchorPos,
    activeView,
    activeCardInfo,
    transitionCount,
    isDetailOpen: detailPreset !== null,
    detailPreset,
    handleOpenDetail,
    handleCloseDetail,
    handleSelectPreset,
    handleHoverMarker,
    handleUpdateMarkerPos,
    handleAnchorPosChange,
  };
};
