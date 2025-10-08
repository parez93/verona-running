import lineClamp from '@tailwindcss/line-clamp';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}", // aggiunta src per purge ottimale
    ],
    theme: {
        extend: {},
    },
    plugins: [
        lineClamp,
    ],
}
