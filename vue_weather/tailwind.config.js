/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#00668A",
        "weather-secondary": "#004E71",
        "first":"#0B131E",
        "second":"#1F2B3B",
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
    },
    fontFamily:{
      Roboto: ["Roboto, sans-serif"],
      FiraSans: ["Fira Sans, sans-serif"] // https://fonts.google.com/specimen/Fira+Sans
    },
    container:{
      padding: "2rem",
      center:true,
    },
    screens: {
      sm:"640px",
      md:"768px",
    }
  },
  plugins: [],
}
