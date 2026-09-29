import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050507",
        ink: "#07090D",
        panel: "#0B0E13",
        primary: {
          DEFAULT: "#410AF5",
          soft: "#673BF7",
          glow: "#8D6CF9",
        },
        electric: "#2E6BFF",
        cyan: {
          soft: "#7FD6E8",
        },
        danger: "#E5484D",
        paper: "#F4F4F6",
        mute: "#9AA0AC",
        faint: "#565B66",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        label: "0.22em",
      },
      maxWidth: {
        shell: "1440px",
        readable: "68ch",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
