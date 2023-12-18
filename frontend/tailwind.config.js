// tailwind.config.js
const { nextui } = require("@nextui-org/react");

// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        gilroy: ["Gilroy-Medium"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      
      light: {
        // ...
        colors: {
          primary : "#f30d19",
          background : "#dadada",
          foreground : "#FFFFFF",
          text : "#71717A"
        },
      },
      dark: {
        // ...
        colors: {},
      },
      // ... custom themes
    },
})]
}