/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // If you're using the `app` directory
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Replace 'Roboto' with your font name
      },
      colors: {
        grayCustom: "#808080",
        WarmGray: "#807373",

        primary: {
          DEFAULT: '#ff5d58',
          hover: '#ff3832',
        },
        secondary: {
          DEFAULT: '#FFE7E6',
          hover: '#FFF5F5',
        },
        raisinBlack: "#2C2929"
      },
      backgroundImage: {
        "bulk-banner": "url('/images/Bulk-Order-Banner.png')",
      },
      keyframes: {
        'dot-pulse': {
          '0%': { boxShadow: '9999px 0 0 -5px' },
          '30%': { boxShadow: '9999px 0 0 2px' },
          '60%, 100%': { boxShadow: '9999px 0 0 -5px' },
        },
        'dot-pulse-before': {
          '0%': { boxShadow: '9984px 0 0 -5px' },
          '30%': { boxShadow: '9984px 0 0 2px' },
          '60%, 100%': { boxShadow: '9984px 0 0 -5px' },
        },
        'dot-pulse-after': {
          '0%': { boxShadow: '10014px 0 0 -5px' },
          '30%': { boxShadow: '10014px 0 0 2px' },
          '60%, 100%': { boxShadow: '10014px 0 0 -5px' },
        },
      },
      animation: {
        'dot-pulse': 'dot-pulse 1.5s infinite linear 0.25s',
        'dot-pulse-before': 'dot-pulse-before 1.5s infinite linear',
        'dot-pulse-after': 'dot-pulse-after 1.5s infinite linear 0.5s',
      },
      screens: {
        xxs: "360px",
        
        sm: "576px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "992px",
        // => @media (min-width: 1024px) { ... }

        xl: "1200px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1440px",
        // => @media (min-width: 1536px) { ... }
      },
      container: {
        center: true,
        padding: '16px',
        // screens: {
        //   sm: "540px", // Container's max-width for sm breakpoint
        //   md: "720px", // Container's max-width for md breakpoint
        //   lg: "960px", // Container's max-width for lg breakpoint
        //   xl: "1140px", // Container's max-width for xl breakpoint
        //   "2xl": "1320px", // Container's max-width for 2xl breakpoint
        // },
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require("tailwind-scrollbar-hide"),
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "540px",
          },
          "@screen md": {
            maxWidth: "720px",
          },
          "@screen lg": {
            maxWidth: "960px",
          },
          "@screen xl": {
            maxWidth: "1140px",
          },
          "@screen 2xl": {
            maxWidth: "1320px",
          },
        },
      });
    },
  ],
};
