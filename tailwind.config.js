/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        horizon: ["Horizon", "sans-serif"],
        "horizon-outlined": ["Horizon Outlined", "sans-serif"],
      },
    },
  },
  plugins: [],
};
