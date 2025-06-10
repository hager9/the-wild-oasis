import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import PageNotFound from "./pages/PageNotFound";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import Guests from "./pages/Guests";

export default function App() {
  const queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Navigate replace to="dashboard" /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "bookings", element: <Bookings /> },
        { path: "bookings/:bookingId", element: <Booking /> },
        { path: "checkin/:bookingId", element: <Checkin /> },
        { path: "cabins", element: <Cabins /> },
        { path: "settings", element: <Settings /> },
        { path: "users", element: <Users /> },
        { path: "account", element: <Account /> },
        { path: "guests", element: <Guests /> },
      ],
    },
    { path: "login", element: <Login /> },
    { path: "*", element: <PageNotFound /> },
  ]);

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}
