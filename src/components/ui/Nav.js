import React from "react";
import { Link } from "react-router-dom";

import Logo from "img/densho-logo-horizontal.png";
import "./Nav.scss";

const Nav = () => {
  const rightLinks = [
    {
      label: "Visit the Densho site",
      url: "https://densho.org/",
    },
    {
      label: "Donate",
      url: "https://densho.org/give/",
    },
  ];

  return (
    <nav className="nav">
      <div className="nav-left">
        <a href="https://densho.org/">
          <img alt="Densho logo" src={Logo} className="logo" />
        </a>
        <span className="separator">/</span>
        <Link to="/" className="site-name">
          Sites of Shame
        </Link>
      </div>
      <ol className="links">
        <Link to="about">About the Map</Link>
        {rightLinks.map((link) => (
          <a key={link.label} href={link.url}>
            {link.label}
          </a>
        ))}
      </ol>
    </nav>
  );
};

export default Nav;
