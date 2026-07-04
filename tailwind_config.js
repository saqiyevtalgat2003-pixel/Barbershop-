/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1C1B19",       // near-black warm charcoal background
        panel: "#262421",     // card/panel background
        panel2: "#302C27",    // slightly lighter panel
        brass: "#C9A227",     // primary accent - brass/gold
        brassDim: "#9C7E1F",
        pole: "#8B3A2F",      // desaturated barber-pole red, used sparingly
        cream: "#EDE8E0",     // primary text
        muted: "#9C9686",     // secondary text
        line: "#3A3630"       // hairline borders
      },
      fontFamily: {
        display: ["'Oswald'", "sans-serif"],
        body: ["'Work Sans'", "sans-serif"]
      },
      letterSpacing: {
        widest2: "0.25em"
      }
    },
  },
  plugins: [],
}
