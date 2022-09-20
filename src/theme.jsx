import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    body: {
      main: "#d7d6f7",
    },
    primary: {
      main: "#282439",
      light: "#A78A52",
      lightmain: "#D8BB81",
    },
    secondary: {
      main: "#4905B4",
      light: "#4c02f1",
      contrastText: "#000000",
    },
    text: {
      main: "#ffffff",
      primary: "#D9D9D9",
      secondary: "#A78A52",
      lightcolor: "#EEE8C8",
      detail: "black",
      lightgray: "#AAAAAA",
    },
    hover: {
      main: "#3f385b",
    },
    formscheme: {
      main: "#F4EFE6",
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
