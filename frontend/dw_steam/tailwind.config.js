/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                steam: {
                    bg: '#1b2838',
                    card: '#171a21',
                    text: '#c6d4df',
                    accent: '#66c0f4',
                    hover: '#2a475e'
                }
            }
        },
    },
    plugins: [],
}
