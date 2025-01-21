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
import NeedGuestPage from "./components/protected-routes/NeedGuestPage";
import NeedLoginPage from "./components/protected-routes/NeedLoginPage";
import CheckProfileUid from "./components/protected-routes/CheckProfileUid";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NeedLoginPage>
        <HomePage></HomePage>,
      </NeedLoginPage>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <NeedGuestPage>
        <SignUpPage></SignUpPage>,
      </NeedGuestPage>
    ),
  },
  {
    path: "/login",
    element: (
      <NeedGuestPage>
        <LoginPage></LoginPage>,
      </NeedGuestPage>
    ),
  },
  {
    path: "/profile/:uid",
    element: (
      <CheckProfileUid>
        <ProfilePage></ProfilePage>
      </CheckProfileUid>
    ),
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
