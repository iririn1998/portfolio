import type { ViewPreset } from "./view";

export type DetailPreset = Exclude<ViewPreset, "overview">;

export type DetailItem = {
  title: string;
  description?: string;
  tags?: string[];
};

export type DetailSection = {
  heading: string;
  paragraphs?: string[];
  items?: DetailItem[];
};

export type DetailData = {
  id: DetailPreset;
  title: string;
  subtitle: string;
  icon: string;
  lead: string;
  sections: DetailSection[];
};
