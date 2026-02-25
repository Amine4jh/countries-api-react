import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Country from "./components/Country.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllCountries from "./components/AllCountries.jsx";

const queryClient = new QueryClient();

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <AllCountries />,
      },
      {
        path: "country/:id",
        element: <Country />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
