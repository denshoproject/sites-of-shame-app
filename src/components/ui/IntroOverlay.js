import React from "react";
// import { Link } from "react-router-dom";

import Logo from "img/densho-logo-horizontal.png";
import IntroLogo from "img/logo-intro.png";
import "./IntroOverlay.scss";

const IntroOverlay = () => {
  const closeOverlay = () => {
    document.getElementById("overlay").style.display = "none";
  };

  return (
    <div id="overlay" className="overlay">
      <div class="logo-container">
        <img alt="Densho logo" src={IntroLogo} className="intro-logo" />
      </div>
      <hr className="line" />
      <p class="title-text">SITES OF SHAME</p>
      <img alt="Densho logo" src={Logo} className="logo" />
      <p className="text-firstparagraph">
        During World War II, more than 125,000 individuals of Japanese ancestry
        were held without trial in a complex network of detention sites
        throughout the U.S. Over two-thirds of those imprisoned were U.S.
        citizens.
      </p>
      <p className="text-secondparagraph">
        Forty years later, the U.S. government determined that the incarceration
        was wrong and President Ronald Reagan signed the Civil Liberties Act of
        1988. While many of the physical sites have faded into the landscape,
        their history serves as a reminder of the fragility of our democracy.
      </p>
      <div class="overlay-button" onClick={() => closeOverlay()}>
        <p class="button-text">SEE THEIR JOURNEYS</p>
      </div>
    </div>
  );
};

export default IntroOverlay;
