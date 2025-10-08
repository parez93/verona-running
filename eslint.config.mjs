import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            "next-env.d.ts",
        ],
        rules: {
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
            "react/no-unescaped-entities": "warn",
            "no-console": ["warn", { "allow": ["warn", "error"] }],
            "eqeqeq": "error",
            "curly": "error",
            "import/order": ["warn", { "groups": ["builtin", "external", "internal"], "newlines-between": "always" }],
        },
    },
];

export default eslintConfig;
