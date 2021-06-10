import React, { useContext } from "react";

import { Context } from "store";
import "./InfoboxButton.scss";

const InfoboxButton = ({ clickedId, id }) => {
  const { state, dispatch } = useContext(Context);

  const openInfobox = () => {
    if (id !== state.openInfobox) {
      dispatch({ type: "set open infobox", clickedId, id });
    }
  };

  return (
    <div className="infobox-button" onClick={openInfobox}>
      i
    </div>
  );
};

export default InfoboxButton;
