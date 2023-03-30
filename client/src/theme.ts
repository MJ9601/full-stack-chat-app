import { extendTheme } from "@chakra-ui/react";

const theme = {
  config: {
    intialColorMode: "dark",
    useSystemColorMode: true,
  },
  styles: {
    global: {
      ":root": {
        "font-family":
          '"Inter", "system-ui", Avenir, Helvetica, Arial, "sans-serif"',
        "line-height": 1.5,
        "font-weight": 400,
        "color-scheme": "light dark",
        color: "rgba(255, 255, 255, 0.87)",
        " background-color": "#242424",
        "font-synthesis": "none",
        "text-rendering": "optimizeLegibility",
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": " grayscale",
        "-webkit-text-size-adjust": "100%",
      },

      body: {
        margin: 0,
        "min-width": "320px",
        "min-height": "100vh",
      },
    },
  },
};

export default extendTheme(theme);