import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";
import { AppContextProvider } from "./utils";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(

// );

render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
