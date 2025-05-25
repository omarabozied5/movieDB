export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FFD600", // Main primary color
          50: "#FFF9CC",
          100: "#FFF4B3",
          200: "#FFEC80",
          300: "#FFE34D",
          400: "#FFDB1A",
          500: "#FFD600", // same as DEFAULT
          600: "#E6C100",
          700: "#CCAD00",
          800: "#B39800",
          900: "#998400",
        },
        secondary: {
          DEFAULT: "#0366D6", // Main secondary color
          50: "#BEE3F8",
          100: "#9BDAFF",
          200: "#70C1FF",
          300: "#4DA6FF",
          400: "#339DFF",
          500: "#0366D6", // same as DEFAULT
          600: "#0357B0",
          700: "#034A8B",
          800: "#023C6A",
          900: "#012D4A",
        },
        yellow: "#FFD600",
        blue: "#0366D6",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
};
