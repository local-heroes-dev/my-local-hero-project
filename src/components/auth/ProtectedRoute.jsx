import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requireAuth }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If route requires authentication and user is not authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If route requires unauthenticated user and user is authenticated, redirect to nominate
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/nominate" replace />;
  }
  
  // Otherwise, render the children
  return children;
};

export default ProtectedRoute;