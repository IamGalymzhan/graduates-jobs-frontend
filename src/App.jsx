import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/index";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import "./i18n";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
