import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import HomePage from "./pages";
import { Provider } from "react-redux";
import { store } from "./services/redux/store";
import SignUpPage from "./pages/signUp";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import AccountSettingsPage from "./pages/accountSettings";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/sign-up",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/profile/:uid",
    element: <ProfilePage></ProfilePage>,
  },
  {
    path: "/account-settings",
    element: <AccountSettingsPage></AccountSettingsPage>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
