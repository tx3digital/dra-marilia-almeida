/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                brand: ['Poppins', 'sans-serif'],
            },
            colors: {
                brand: {
                    primary: '#833c4e',
                    secondary: '#6D2437',
                    bg: '#f7f5f3',
                }
            }
        },
    },
    plugins: [],
}
