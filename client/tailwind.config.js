module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Major Mono Display', 'monospace'],
      },
      colors: {
        cy: {
          "blue": "#0000ff",
          "cyan": "#00dbe8",
          "yellow": "#ffe800",
          "blood": "#c71228",
          "pink": "#ff41b4",
          "red": "#f40e00",
          "green": "#00ff01",
          "corp": "#99835c",
          "purple": "#cd36b2",
        }
      },
      padding: {
        "1%": "1%",
      }
    },
  },
  plugins: [],
}