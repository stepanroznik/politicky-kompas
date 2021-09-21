module.exports = {
    purge: {
        enabled: false,
        content: ['./src/**/*.vue', './public/index.html'],
        options: {
            safelist: [],
        },
    },
    theme: {
        extend: {
            gridTemplateRows: {
                20: 'repeat(20, minmax(0, 1fr))',
                10: 'repeat(10, minmax(0, 1fr))',
            },
            gridTemplateColumns: {
                20: 'repeat(20, minmax(0, 1fr))',
                10: 'repeat(10, minmax(0, 1fr))',
            },
            screens: {
                xs: '480px',
                '2xs': '360px',
            },
            opacity: {
                '85': '0.85',
            },
            scale: {
                '175': '1.75',
                '200': '2',
            }
        },
    },
    variants: [
        'responsive',
        'group-hover',
        'focus-within',
        'first',
        'last',
        'odd',
        'even',
        'hover',
        'focus',
        'active',
        'visited',
        'disabled',
    ],
    plugins: [require('@tailwindcss/forms')],
};
