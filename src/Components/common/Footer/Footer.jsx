import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./footer.css";
import logo from "../../../../public/logo.png";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="site_footer">
        <div className="footer_container">
          {/* Left */}
          <div className="footer_brand">
            <div className="d-flex align-items-center">
              <img className="logo" src={logo} alt="logo" />
              <h4 className="m-0">
                Movies<span>DB</span>
              </h4>
            </div>

            <p>
              Movie and TV information powered by TMDB.
              <br />
              This product uses the TMDB API but is not endorsed or certified by
              TMDB.
            </p>
          </div>

          {/* Center */}
          <div className="footer_links">
            <h6>Quick Links</h6>
            <nav>
              <ul>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Home
                  </NavLink>
                </li>
              </ul>
              <ul>
                <li>
                  <NavLink
                    to="/tv"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    TV Shows
                  </NavLink>
                </li>
              </ul>
              <ul>
                <li>
                  <NavLink
                    to="/movies"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Movies
                  </NavLink>
                </li>
              </ul>
              <ul>
                <li>
                  <NavLink
                    to="/watchlist"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Watchlist
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          {/* Right */}
          <div className="footer_social">
            <h6>Connect</h6>
            <div className="social_icons">
              <a href="#" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="footer_bottom">
          <p className="m-0">
            Designed by <b>Aman</b>
          </p>
          © {new Date().getFullYear()} MoviesDB. All rights reserved.
        </div>
      </footer>
    </>
  );
}
