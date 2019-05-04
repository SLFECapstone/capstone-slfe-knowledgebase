import React from "react";
import "bootstrap/dist/css/bootstrap.css"; // this is needed to override existing CSS styling

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-teal mb-4">
      <div className="container">
        <div className="logo">
          <a href="/" className="logo--link">
            <img
              className="logo--image"
              alt=""
              src="https://i.imgur.com/L2kMZ75.png"
            />
          </a>
        </div>

        <div class="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link font-weight-bold" href="/browse">
                Result
              </a>
            </li>
            <li className="nav-item font-weight-bold">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            <li className="nav-item font-weight-bold">
              <a className="nav-link" href="/map">
                Map
              </a>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown mr-3">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-toggle="dropdown"
              >
                <i className="fa fa-user" /> User Name
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item">
                  <i className="fa fa-user-circle" /> Profile
                </a>
                <a className="dropdown-item">
                  <i className="fa fa-gear" /> Settings
                </a>
                <a className="dropdown-item">
                  <a href="/login">
                    <i className="fa fa-sign-out" />Logout
                  </a>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

