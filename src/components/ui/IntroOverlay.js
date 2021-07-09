import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import Logo from "img/densho-logo-horizontal.png";
import IntroLogo from "img/logo-intro.png";
import "./IntroOverlay.scss";

const IntroOverlay = () => {
  const closeOverlay = () => {
    document.getElementById("overlay").style.display = "none";
  };

  const wrapperRef = useRef(null);

  const [overlayText, setOverlayText] = useState(null);

  useEffect(() => {
    if (overlayText) return;

    fetch("./overlay-text.md")
      .then((r) => r.text())
      .then(setOverlayText);
  }, [overlayText, setOverlayText]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        closeOverlay();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div id="overlay" className="overlay" ref={wrapperRef}>
      <div class="logo-container">
        <img alt="Densho logo" src={IntroLogo} className="intro-logo" />
      </div>
      <hr className="line" />
      <p class="title-text">SITES OF SHAME</p>
      <img alt="Densho logo" src={Logo} className="logo" />
      <div className="intro-content">
        <ReactMarkdown children={overlayText} rehypePlugins={[rehypeRaw]} />
      </div>
      <div class="overlay-button" onClick={() => closeOverlay()}>
        <p class="button-text">SEE THEIR JOURNEYS</p>
      </div>
    </div>
  );
};

export default IntroOverlay;
