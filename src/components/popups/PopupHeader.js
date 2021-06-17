import React from "react";
import classNames from "classnames";

import "./PopupHeader.scss";

const PopupHeader = ({ children, className }) => {
  return (
    <div className={classNames(["popup-header", "popup-row", className])}>
      {children}
    </div>
  );
};

export default PopupHeader;
