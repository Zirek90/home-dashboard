import js from "@eslint/js";
import pluginRouter from "@tanstack/eslint-plugin-router";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "vite.config.ts", "build"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      "@tanstack/router": pluginRouter,
    },
    settings: {
      "import/resolver": {
        alias: {
          map: [["@src", "./src"]],
          extensions: [".ts", ".tsx", ".js", ".jsx"],
        },
      },
      react: {
        version: "18.3",
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      "react-refresh/only-export-components": "off",
      "@tanstack/router/create-route-property-order": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_", // Ignore function arguments starting with "_"
          varsIgnorePattern: "^_", // Ignore variables starting with "_"
          ignoreRestSiblings: true, // Ignore unused rest siblings like `const { a, ...rest }`
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"], // React, external libraries
            ["internal", "parent", "sibling", "index"], // Aliased imports and relative imports
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "react-router-dom",
              group: "external",
              position: "after",
            },
            {
              pattern: "@src/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "never",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  }
);
