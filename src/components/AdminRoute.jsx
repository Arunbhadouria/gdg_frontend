// components/AdminRoute.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminRoute({ children }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return children;
}

export default AdminRoute;