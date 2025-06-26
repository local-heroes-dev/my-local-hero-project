import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import HeroesPage from "./pages/HeroesPage";
import NominatePage from "./pages/NominatePage";
import Register from "./pages/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroesPage />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute requireAuth={false}>
                {" "}
                <Register />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/nominate" element={<NominatePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
