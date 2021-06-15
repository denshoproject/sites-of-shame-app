import React from "react";

import Logo from "img/logo.png";
import "./Nav.scss";

const Nav = () => {
  const leftLinks = [];

  const rightLinks = [
    {
      label: "About",
      url: "https://densho.org/about-densho/",
    },
  ];

  return (
    <nav className="Nav">
      <ol className="links">
        {leftLinks.map((link) => (
          <a key={link.label} href={link.url}>
            {link.label}
          </a>
        ))}
      </ol>
      <a href="https://densho.org/">
        <img alt="Densho logo" src={Logo} />
        <span className="site-name">Sites of Shame</span>
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
