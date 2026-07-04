/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14170F",        // near-black, warm-green undertone (barbershop night)
        panel: "#1D2117",      // card/panel background
        panel2: "#262B1E",     // slightly lighter panel
        hunter: "#3F6B4A",     // classic barbershop awning green
        hunterDim: "#2E4E37",
        copper: "#C08A45",     // brushed copper/brass — used sparingly
        stamp: "#B0362A",      // rubber-stamp red, ticket accents, timers, alerts
        cream: "#F1EAD6",      // primary text / ticket paper
        paper: "#EAE2C8",      // ticket paper background
        muted: "#9AA08C",      // secondary text on dark
        mutedPaper: "#8A8368", // secondary text on paper
        line: "#333B29",       // hairline borders on dark
        linePaper: "#D8CDA6"   // hairline borders on paper
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"]
      },
      letterSpacing: {
        widest2: "0.2em",
        widest3: "0.32em"
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(241,234,214,0.05) 1px, transparent 0)"
      },
      backgroundSize: {
        grain: "18px 18px"
      }
    },
  },
  plugins: [],
}
