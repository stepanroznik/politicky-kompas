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
    rules: {
        indent: ['warn', 4],
        'vue/html-indent': ['warn', 4],
        'max-len': ['warn', { code: 300, tabWidth: 4 }],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'space-before-function-paren': 'off',
        'func-names': 'off',
        'object-shorthand': 'off',
        'linebreak-style': 'off',
        'import/extensions': 'off',
    },
}
