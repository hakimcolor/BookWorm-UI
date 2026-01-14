import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, role, loading } = useContext(AuthContext);
  const location = useLocation();

  // 🔄 Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // ✅ Admin access
  if (user && role === 'admin') {
    return children;
  }

  // ❌ Not admin → redirect
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
