module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
      extend: {
        colors: {
          bgLight: "#FBFAE1",
          cardGreen: "#CEF0B9",
          accentGreen: "#64A36F",
          accentYellow: "#FFE121",
        },
        fontFamily: {
          cute: ['Quicksand', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };