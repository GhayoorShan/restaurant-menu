/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#071C4D",
        muted: "#838DA6",
        borderColor: "#F4F6F9",
      },
    },
  },
  plugins: [],
};
