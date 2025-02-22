import React from "react";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes"; // Import your routing setup
import "./index.css"; // Tailwind styles

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
