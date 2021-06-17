import React, { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { Context } from "store";
import "./Infobox.scss";

const Infobox = ({ id, x, y }) => {
  const { state, dispatch } = useContext(Context);
  const { content } = state.infobox;
  const [height, setHeight] = useState(null);

  const infoboxRow = content.filter((d) => d.id === id)[0];
  const { title, description, link } = infoboxRow;

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        dispatch({ type: "clear open infobox" });
      }
    }

    setHeight(wrapperRef.current.getBoundingClientRect().height);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, wrapperRef]);

  const heightThreshold = window.outerHeight / 2;

  return (
    <div
      className={classNames("infobox", {
        "orient-top": y <= heightThreshold,
        "orient-bottom": y > heightThreshold,
      })}
      ref={wrapperRef}
      style={{
        top: y > heightThreshold ? y - height : y,
        left: x,
      }}
    >
      <h2>{title}</h2>
      <div className="infobox-description">{description}</div>
      {link ? (
        <a href={link} target="_blank" rel="noreferrer">
          More info
        </a>
      ) : null}
    </div>
  );
};

export default Infobox;
