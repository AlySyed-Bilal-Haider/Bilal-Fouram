import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#BA995B",
      light: "#A78A52",
      lightmain: "#D8BB81",
    },
    secondary: {
      main: "#06044a",
      light: "#4c02f1",
      contrastText: "#000000",
    },
    text: {
      main:"#ffffff",
      primary: "#E3D6BD",
      secondary: "#A78A52",
      lightcolor:"#EEE8C8"
    },
    hover:{
      main:'#CDB17A'
    }
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
