import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import HeaderImage from "img/about-header.png";
import "./About.scss";

const About = () => {
  const [pageText, setPageText] = useState(null);

  useEffect(() => {
    if (pageText) return;

    fetch("./about.md")
      .then((r) => r.text())
      .then(setPageText);
  }, [pageText, setPageText]);

  return (
    <div className="about">
      <div className="about-header-image">
        <Link className="about-header-close" to="/">
          &times;
        </Link>
        <img alt="Sites of Shame Map" src={HeaderImage} />
      </div>
      <div className="about-content">
        <ReactMarkdown children={pageText} rehypePlugins={[rehypeRaw]} />
      </div>
    </div>
  );
};

export default About;
