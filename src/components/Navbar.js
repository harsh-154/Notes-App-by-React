import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
function Navbar() {
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    // Google Analytics
    console.log(location.pathname);
  }, [location]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="text-white" to="/home">
            INotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link text-light ${isActive ? "active" : ""}`
                  }
                  to="/docs"
                >
                  Documents
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link text-light ${isActive ? "active" : ""}`
                  }
                  to="/about"
                >
                  About Us
                </NavLink>
              </li>
            </ul>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              /> */}
            {localStorage.getItem("token") ? ( // This ensures it only runs if a valid token exists
              <button className="btn btn-primary" onClick={handleLogout}>
                Log Out
              </button>
            ) : (
              <>
                <Link className="mx-2 btn btn-primary" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary" to="/signup">
                  Sign Up
                </Link>
              </>
            )}

            {/* </form> */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
