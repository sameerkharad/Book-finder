/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Times New Roman'", "Georgia", "serif"], // classic serif font
        // headings
      },
    },
  },
  plugins: [],
};
