import React, { useContext, useEffect, useRef } from "react";

import { Context } from "store";
import "./Infobox.scss";

const Infobox = ({ id }) => {
  const { state, dispatch } = useContext(Context);
  const { content } = state.infobox;

  const infoboxRow = content.filter((d) => d.id === id)[0];
  const { title, description, link } = infoboxRow;

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        dispatch({ type: "clear open infobox" });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch, wrapperRef]);

  return (
    <div className="infobox" ref={wrapperRef}>
      <h2>{title}</h2>
      <div className="infobox-description">{description}</div>
      <a href={link} target="_blank" rel="noreferrer">
        More info
      </a>
    </div>
  );
};

export default Infobox;
