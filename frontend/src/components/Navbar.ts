import { Link, useNavigate } from "react-router-dom";
import { getUserRole, clearAuth } from "../auth";

export const Navbar = () => {
  const role = getUserRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">UAMS</Link>
        <div className="space-x-4">
          {role === "Admin" && (
            <Link to="/create-software" className="text-white hover:text-gray-200">Create Software</Link>
          )}
          {role === "Employee" && (
            <Link to="/request-access" className="text-white hover:text-gray-200">Request Access</Link>
          )}
          {role === "Manager" && (
            <Link to="/pending-requests" className="text-white hover:text-gray-200">Pending Requests</Link>
          )}
          {role && (
            <button onClick={handleLogout} className="text-white hover:text-gray-200">Logout</button>
          )}
          {!role && (
            <>
              <Link to="/signup" className="text-white hover:text-gray-200">Signup</Link>
              <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};