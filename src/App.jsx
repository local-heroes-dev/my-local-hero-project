import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import HeroesPage from "./pages/HeroesPage";
import NominatePage from "./pages/NominatePage";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { checkAuthStatus } from "./store/slices/authSlice";
import HeroDetail from "./pages/HeroDetail";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(checkAuthStatus());
    }
  }, [dispatch]);

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
                <Register />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/nominate" 
            element={
              <ProtectedRoute requireAuth={true}>
                <NominatePage />
              </ProtectedRoute>
            } 
          />

          <Route path="/heroes/:id" element={<HeroDetail />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
