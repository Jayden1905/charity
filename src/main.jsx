import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/home";
import About from "./pages/about";
import NotFound from "./pages/not-found.jsx";
import Nav from "./components/menu/nav.jsx";
import { ReleasePet } from "./pages/release.jsx";
import { AdpotPage } from "./pages/adopt.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProtectedRoute } from "./components/route/protectedRoute.jsx";

export function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<App />}>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/adopt" element={<AdpotPage />} />
          <Route
            path="/release"
            element={
              <ProtectedRoute>
                <ReleasePet />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Nav />
        <AnimatedRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
