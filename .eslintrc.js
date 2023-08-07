module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        'plugin:vue/vue3-recommended',
        'plugin:vue/vue3-strongly-recommended',
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    plugins: [
        "@typescript-eslint",
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 6
    },
    rules: {
        semi: 'warn',
        indent: ['warn', 4],
        'vue/html-indent': ['warn', 4],
        'max-len': ['warn', { code: 300, tabWidth: 4 }],
        'no-console': 'warn',
        'no-debugger': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',  "vue/multi-word-component-names": [
            "warn", {
                "ignores": ['Home', 'Result', 'Test', 'Answers', 'About']
            }]
    },
};
