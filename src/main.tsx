import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
// import { Authenticator } from "@aws-amplify/ui-react";
// import '@aws-amplify/ui-react/styles.css';
import { store } from "./Store";
import { Suspense } from "react";
import { TourProvider } from "@reactour/tour";
import { RouterProvider } from "react-router-dom";
import { router } from "@common/router";
import DEFAULT_TOUR_STEPS from "@utils/tour/steps";
import { Provider } from "react-redux";
import { lightTheme } from "@utils/Theme";
import { SnackbarProvider } from "notistack";
import { CssBaseline, ThemeProvider } from "@mui/material";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={lightTheme}>
    <CssBaseline />
    <Provider store={store}>
      <SnackbarProvider
        dense
        preventDuplicate
        maxSnack={3}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        autoHideDuration={3000}
      >
        <TourProvider steps={DEFAULT_TOUR_STEPS}>
          <Suspense>
            <RouterProvider router={router} />
          </Suspense>
        </TourProvider>
      </SnackbarProvider>
    </Provider>
  </ThemeProvider>
);
