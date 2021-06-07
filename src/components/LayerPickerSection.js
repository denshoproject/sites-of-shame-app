import React, { useState } from "react";
import classNames from "classnames";

import ExpandToggle from "img/expand-toggle.png";
import "./LayerPickerSection.scss";

const LayerPickerSection = ({ children, name }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="layer-picker-section">
      <h3 onClick={() => setExpanded(!expanded)}>
        <img
          alt="expand icon"
          className={classNames({ expanded })}
          src={ExpandToggle}
        />
        {name}
      </h3>
      <div className={classNames("layer-picker-section-body", { expanded })}>
        {children}
      </div>
    </section>
  );
};

export default LayerPickerSection;
