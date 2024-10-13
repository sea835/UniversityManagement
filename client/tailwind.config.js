/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}", "index.html"],
    theme: {
        extend: {
            fontFamily: {
                'italiano': ['"Italianno"', 'cursive'],
                'inria': ['"Inria Serif"', 'serif'],
            },
            colors: {
                'primary': {
                    DEFAULT: '#B0896A',
                },
                'secondary': {
                    DEFAULT: '#F2EBE1',
                },
                'tertiary': {
                    DEFAULT: '#BEB29F',
                },
            },
        },
        plugins: [],
    }
}