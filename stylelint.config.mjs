const config = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-css-modules",
    "stylelint-config-recess-order",
  ],
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  reportDescriptionlessDisables: true,
  rules: {
    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9]*$",
      { message: "CSS module classes must be camelCase" },
    ],
    "selector-max-id": 0,
    "selector-max-universal": 1,
    "selector-max-compound-selectors": 3,
    "selector-max-specificity": "0,3,0",
    "selector-no-qualifying-type": true,
    "declaration-no-important": true,
    "max-nesting-depth": 2,
    "color-named": "never",
    "color-hex-length": "short",
    "length-zero-no-unit": true,
    "no-descending-specificity": true,
    "declaration-property-value-no-unknown": true,
    "value-keyword-case": ["lower", { ignoreProperties: ["composes"] }],
  },
};

export default config;
