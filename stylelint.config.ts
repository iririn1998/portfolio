import type { Config } from "stylelint";

const config: Config = {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  ignoreFiles: ["dist/**", "node_modules/**"],
  rules: {
    "property-no-vendor-prefix": null,
  },
};

export default config;
