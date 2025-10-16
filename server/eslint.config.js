import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
    js.configs.recommended,
    prettier,
    {
        files: ["**/*.ts", "**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        rules: {
            "no-unused-vars": "warn",
            "no-console": "off",
        },
    },
];
