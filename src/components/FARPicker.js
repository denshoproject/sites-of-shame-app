import React, { useContext, useEffect } from "react";
import * as d3 from "d3";

import { constants } from "constants.js";
import { Context } from "store";
import "./FARPicker.scss";

const FARPicker = () => {
  const { state, dispatch } = useContext(Context);
  const { index } = state.far;

  const fetchFarIndex = () => d3.csv(`${constants.DATA_PATH}far/index.csv`);

  useEffect(() => {
    if (index) return;

    // Load CSV, convert to GeoJSON, add to the layers in the store
    fetchFarIndex().then((rows) => {
      dispatch({
        type: "set far index",
        index: rows.map((row) => {
          return {
            ...row,
            lat: +row.lat,
            lng: +row.lng,
          };
        }),
      });
    });
  }, [dispatch, index]);

  const handleChange = (value) => {
    dispatch({ type: "set far selectedCamp", selectedCamp: value });
  };

  return (
    <div className="far-picker">
      {index ? (
        <select onChange={(e) => handleChange(e.target.value)}>
          <option>Select a camp</option>
          {index.map((camp) => (
            <option key={camp.slug} value={camp.slug}>
              {camp.name}
            </option>
          ))}
        </select>
      ) : null}
    </div>
  );
};

export default FARPicker;
