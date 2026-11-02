import type { DetailPreset } from "../../../../types";

/** @scope .. */
export type DetailItem = {
  title: string;
  description?: string;
  tags?: string[];
};

/** @scope .. */
export type DetailSection = {
  heading: string;
  paragraphs?: string[];
  items?: DetailItem[];
};

/** @scope .. */
export type DetailData = {
  id: DetailPreset;
  title: string;
  subtitle: string;
  icon: string;
  lead: string;
  sections: DetailSection[];
};
