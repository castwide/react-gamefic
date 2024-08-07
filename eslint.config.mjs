import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettierEslint from "eslint-plugin-prettier";
import jestEslint from "eslint-plugin-jest";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "**/node_modules",
      "**/build",
      "scaffold/webpack.config.cjs",
      "src/react-gamefic/*.test.js",
      "coverage",
    ],
  },
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      prettier: prettierEslint,
      jest: jestEslint,
    },

    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.commonjs,
        ...globals.node,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "prettier/prettier": "error",
    },
  },
];
