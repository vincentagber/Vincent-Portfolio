/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    400: '#E6C25A', // Lighter
                    500: '#D4AF37', // Base
                    600: '#AA8C2C', // Darker
                },
                black: '#0a0a0a',
                dark: {
                    100: '#2c2c2c',
                    200: '#1a1a1a',
                    300: '#121212',
                }
            },
            fontFamily: {
                playfair: ['"Playfair Display"', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            backgroundImage: {
                'lux-gradient': 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
            }
        },
        container: {
            center: true,
            padding: '2rem',
        },
    },
    plugins: [],
}
