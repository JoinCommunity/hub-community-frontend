import plugin from "tailwindcss/plugin";

export const shadcnPlugin = plugin(
  function ({ addBase }) {
    addBase({
      ":root": {
        "--primary": "#e7e5e4",
        "--secondary": "#f4f4f4",
        "--third": "#a1a1aa",
        "--black": "#161616",
      },
      ".dark": {
        "--primary": "#161616",
        "--secondary": "#262626",
        "--third": "#f4f4f4",
        "--black": "#e7e5e4",
      },
    });
    addBase({
      html: {
        "@apply font-medium": {},
      },

      ".text-default": {
        "@apply text-xl leading-snug dark:text-zinc-400 text-black": {},
      },
      ".text-title": {
        " @apply text-6xl leading-tight font-medium text-black": {},
      },
    });
  },
  {
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: "var(--primary)",
          },
          secondary: {
            DEFAULT: "var(--secondary)",
          },
          third: {
            DEFAULT: "var(--third)",
          },
          black: {
            DEFAULT: "var(--black)",
          },
        },
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1260px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
);
