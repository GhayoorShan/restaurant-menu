import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import airbnbBase from "eslint-config-airbnb-base";
import airbnbHooks from "eslint-config-airbnb/rules/react-hooks";
import airbnbReact from "eslint-config-airbnb/rules/react";
import importPlugin from "eslint-plugin-import";

const { configs: tsConfigs } = typescriptEslintPlugin;

export default [
  {
    ignores: ["dist", "node_modules"], // Ensure node_modules is ignored
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: typescriptParser,
      globals: {
        ...globals.browser, // Global browser variables
        describe: "readonly", // Vitest globals
        it: "readonly", // Vitest globals
        expect: "readonly", // Vitest globals
        vi: "readonly", // Vitest's mock function
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": typescriptEslintPlugin,
      import: importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...airbnbBase.rules,
      ...airbnbReact.rules,
      ...airbnbHooks.rules,
      ...tsConfigs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
          js: "never",
          jsx: "never",
        },
      ],
      "react/react-in-jsx-scope": "off", // React 17+ doesn't require React in scope for JSX
      "react/jsx-boolean-value": ["error", "never"], // Allow boolean attributes without `={true}`
      "react/function-component-definition": "off", // Disable this rule
      "react/require-default-props": "off", // Disable the default props rule for optional props
      "react/jsx-props-no-spreading": "off", // Disable prop spreading for stories
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
];
