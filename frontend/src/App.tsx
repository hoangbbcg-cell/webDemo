// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./features/routes/AppRoutes";

import { useEffect } from "react";
import { getCsrfTokenApi } from "./features/auth/api/csrf.api";

export default function App() {
  useEffect(() => {
    getCsrfTokenApi();
  }, []);
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
