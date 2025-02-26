import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/index";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import "./i18n";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
