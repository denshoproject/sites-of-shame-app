import React from "react";

import Logo from "img/logo.png";
import "./Nav.scss";

const Nav = () => {
  const leftLinks = [
    {
      label: "Collections & Research",
      url: "https://densho.org/archives/",
    },
    {
      label: "Learn",
      url: "https://densho.org/learning-center/",
    },
    {
      label: "Teach",
      url: "",
    },
  ];

  const rightLinks = [
    {
      label: "About Us",
      url: "https://densho.org/about-densho/",
    },
    {
      label: "Get Involved",
      url: "https://densho.org/about-densho/get-involved/",
    },
    {
      label: "Donate",
      url: "https://densho.org/give/",
    },
  ];

  return (
    <nav className="Nav">
      <ol className="links">
        {leftLinks.map((link) => (
          <a href={link.url}>{link.label}</a>
        ))}
      </ol>
      <img alt="Densho logo" src={Logo} />
      <ol className="links">
        {rightLinks.map((link) => (
          <a href={link.url}>{link.label}</a>
        ))}
      </ol>
    </nav>
  );
};

export default Nav;
