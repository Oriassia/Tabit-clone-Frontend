/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        greyNavbar: "#303030",
        greySelectedRestaurant: "#383838",
        greyBg: "#212121",
        greyDarkBg: "#1f1f1f",
        greyDropDownMenu: "#424242",
        greyHoverDropDownMenu: "#595959",
        greyBorder: "#404040",
        greenBorder: "#116667",
        greenButton: "#0ca3a6",
        greenHamburger: "#14888a",
        greenReservationActive: "#a6e3e4",
        greenBg: "#00C8C933",
        greenBorderForIcon: "#689390",
        footerBg: "#A6E3E4",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        googleSans: ['"Google Sans"', "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
