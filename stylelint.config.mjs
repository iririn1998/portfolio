/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  ignoreFiles: ["dist/**", "node_modules/**"],
  rules: {
    "property-no-vendor-prefix": null,
  },
};
