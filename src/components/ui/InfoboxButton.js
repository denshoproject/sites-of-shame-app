import React, { useContext, useRef } from "react";

import { Context } from "store";
import "./InfoboxButton.scss";

const InfoboxButton = ({ clickedId, id }) => {
  const { state, dispatch } = useContext(Context);

  const rootRef = useRef();

  const openInfobox = () => {
    if (id !== state.openInfobox) {
      const { x, y } =
        rootRef.current?.parentElement?.getBoundingClientRect() ?? {};
      dispatch({ type: "set open infobox", clickedId, id, x, y });
    }
  };

  return (
    <div className="infobox-button" onClick={openInfobox} ref={rootRef}>
      i
    </div>
  );
};

export default InfoboxButton;
