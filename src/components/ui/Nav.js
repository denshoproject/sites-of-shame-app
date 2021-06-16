import React from "react";

import Logo from "img/logo.png";
import "./Nav.scss";

const Nav = () => {
  const leftLinks = [];

  const rightLinks = [
    {
      label: "About the map",
      url: "https://densho.org/about-densho/",
    },
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
    <nav className="Nav">
      <a href="https://densho.org/">
        <img alt="Densho logo" src={Logo} />
        <span className="site-name separator"> / </span>
        <span className="site-name"> Sites of Shame</span>
      </a>
      <ol className="links">
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
