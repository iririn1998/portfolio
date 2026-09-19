import type { ScreenPosition } from "../types";

type ConnectorLineProps = {
  startPos: ScreenPosition | null;
  endPos: ScreenPosition | null;
  visible: boolean;
};

export const ConnectorLine = ({ startPos, endPos, visible }: ConnectorLineProps) => {
  if (!visible || !startPos || !endPos) {
    return null;
  }

  // Smooth cubic bezier curve connecting card to marker
  const dx = endPos.x - startPos.x;
  const ctrlX = startPos.x + dx * 0.45;
  const pathD = `M ${startPos.x} ${startPos.y} C ${ctrlX} ${startPos.y}, ${ctrlX} ${endPos.y}, ${endPos.x} ${endPos.y}`;

  return (
    <svg className="connector-svg" aria-hidden="true">
      {/* Dashed connecting line */}
      <path d={pathD} className="connector-path" />

      {/* Card anchor dot */}
      <circle cx={startPos.x} cy={startPos.y} r="4" className="connector-anchor-dot" />

      {/* Marker target ring and dot */}
      <circle cx={endPos.x} cy={endPos.y} r="6.5" className="connector-target-ring" />
      <circle cx={endPos.x} cy={endPos.y} r="2.5" className="connector-target-dot" />
    </svg>
  );
};
