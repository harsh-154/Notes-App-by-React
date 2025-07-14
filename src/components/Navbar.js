import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/docs">
          <i className="fa-solid fa-book-open-reader me-2"></i> iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link${location.pathname === '/docs' ? ' active' : ''}`}
                    to="/docs"
                  >
                    Notes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link${location.pathname === '/bookmarks' ? ' active' : ''}`}
                    to="/bookmarks"
                  >
                    Bookmarks
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn ? (
              <li className="nav-item">
                <button className="btn btn-light ms-2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link${location.pathname === '/login' ? ' active' : ''}`}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link${location.pathname === '/signup' ? ' active' : ''}`}
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
