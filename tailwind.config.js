/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      jakarta: ["'Plus Jakarta Sans'", "sans-serif"],
    },
    fontSize: {
      "2xl": [
        "56px",
        {
          lineHeight: "1.25",
        },
      ],
      xl: [
        "40px",
        {
          lineHeight: "1.25",
        },
      ],
      lg: [
        "24px",
        {
          lineHeight: "1.25",
        },
      ],
      md: [
        "18px",
        {
          lineHeight: "1.25",
        },
      ],
      base: [
        "16px",
        {
          lineHeight: "1.5",
        },
      ],
      small: [
        "14px",
        {
          lineHeight: "1.5",
        },
      ],
    },
    extend: {
      colors: {
        lime: "#d8db2f",
        red: "#d73328",
        "primary-100": "#e4f4fd",
        "primary-300": "#9abed5",
        "primary-500": "#6b94a8",
        "primary-700": "#4e6e7e",
        "primary-900": "#133041",
      },
      backgroundImage: {
        check: "url('./assets/check.svg')",
      },
      screens: {
        tablet: "768px",
        desktop: "1024px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
