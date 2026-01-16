import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // brandBlue value uses #4A90E2 (assumed correction from #44A90E2 typo)
        brandBlue: "#4A90E2",
        brandGreen: "#22C55E",
        brandAmber: "#FBBF24",
        brandSlate: "#CBD5E1",
        brandCharcoal: "#4B5563",
        brandPrimary: "#94A3B8",
        brandSecondary: "#4B5563",
        backgroundBase: "#4B5563",
        surface: "rgba(148,163,184,0.14)",
        surfaceMuted: "rgba(148,163,184,0.16)",
        borderSoft: "rgba(148,163,184,0.24)",
        borderStrong: "rgba(148,163,184,0.28)",
        textPrimary: "#FFFFFF",
        textMuted: "#94A3B8",
        focus: "#4A90E2",
        accent: "#FBBF24",
        accent2: "#22C55E",
      },
    },
  },
  plugins: [],
};

export default config;
