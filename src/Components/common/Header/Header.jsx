import React, { useEffect, useRef, useState } from "react";
import "../Header/header.css";
import logo from "../../../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../../ui/SearchBar";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const sliderRef = useRef(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sliderRef.current && !sliderRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/search/${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <div className="header">
      {/* Mobile Menu */}
      <div ref={sliderRef} className={`slider ${isOpen ? "active" : ""}`}>
        <div className="close">
          <AiOutlineClose
            className="clsIcon"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <nav>
          <ul><li><NavLink to="/" className={({isActive}) => (isActive ? "active" : "")}  onClick={() => setIsOpen(false)}>Home</NavLink></li></ul>
          <ul><li><NavLink to="/tv" className={({isActive}) => (isActive ? "active" : "")} onClick={() => setIsOpen(false)}>TV Shows</NavLink></li></ul>
          <ul><li><NavLink to="/movies" className={({isActive}) => (isActive ? "active" : "")} onClick={() => setIsOpen(false)}>Movies</NavLink></li></ul>
          <ul><li><NavLink to="/watchlist" className={({isActive}) => (isActive ? "active" : "")} onClick={() => setIsOpen(false)}>Watchlist</NavLink></li></ul>
        </nav>

        <div className="header_right">
          <button className="btn btn-primary">Login</button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="header_container container-fluid d-flex justify-content-between align-items-center">
        <img className="logo" src={logo} alt="logo" />

        <nav>
          <ul><li><NavLink to="/" className={({isActive}) => (isActive ? "active" : "")}>Home</NavLink></li></ul>
          <ul><li><NavLink to="/tv" className={({isActive}) => (isActive ? "active" : "")}>TV Shows</NavLink></li></ul>
          <ul><li><NavLink to="/movies" className={({isActive}) => (isActive ? "active" : "")}>Movies</NavLink></li></ul>
          <ul><li><NavLink to="/watchlist" className={({isActive}) => (isActive ? "active" : "")}>Watchlist</NavLink></li></ul>
        </nav>

        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
        />

        <div className="header_right">
          <button className="burger" onClick={() => setIsOpen(true)}>
            <GiHamburgerMenu />
          </button>
        </div>
      </div>
    </div>
  );
}
