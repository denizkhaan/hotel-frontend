import { Outlet, Link, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="d-flex flex-column bg-light p-3 justify-content-between" style={{ width: "200px", height: "100vh" }}>
        <div>
          <h5 className="fw-bold mb-3">
            <Link to="/admin-dashboard" className="text-decoration-none text-primary">
              Admin Panel
            </Link>
          </h5>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/admin/users" className="nav-link">Users</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/reservations" className="nav-link">Reservations</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/rooms" className="nav-link">Rooms</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/hotels" className="nav-link">Hotels</Link>
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <div>
          <button
            className="btn btn-danger w-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
