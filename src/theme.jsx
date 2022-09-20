import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    body: {
      main: "#d7d6f7",
    },
    primary: {
      main: "#282439",
      light: "#3f385b",
    },
    secondary: {
      main: "#4905B4",
      light: "#4905B4a1",
    },
    text: {
      main: "#ffffff",
      light: "#D9D9D9",
      paragraph: "#000",
    },
    hover: {
      main: "#3a285a",
    },
  },
});

theme.overrides = {
  MuiCssBaseline: {
    "@global": {
      body: {
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#000000",
        color: "#ffffff",
      },
      ".img-fluid": {
        maxWidth: "100%",
        height: "auto",
      },
    },
  },
};

theme = responsiveFontSizes(theme);

export default theme;
