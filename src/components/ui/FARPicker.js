import React, { useContext, useEffect } from "react";
import * as d3 from "d3";

import { DATA_PATH } from "constants.js";
import { Context } from "store";
import LegendCircle from "components/ui/LegendCircle";
import "./FARPicker.scss";

const FARPicker = () => {
  const { state, dispatch } = useContext(Context);
  const { destVisible, index, preVisible, selectedCamp } = state.far;

  const fetchFarIndex = () => d3.csv(`${DATA_PATH}far/index.csv`);

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

  const handleSelectedCampChange = (value) => {
    dispatch({ type: "set far selectedCamp", selectedCamp: value });
  };

  const handlePreVisibleChange = (value) => {
    dispatch({ type: "set far preVisible", preVisible: value });
  };

  const handleDestVisibleChange = (value) => {
    dispatch({ type: "set far destVisible", destVisible: value });
  };

  return (
    <div className="far-picker">
      {index ? (
        <div className="far-picker-row">
          <select
            onChange={(e) => handleSelectedCampChange(e.target.value)}
            value={selectedCamp}
          >
            <option value="">Select a camp</option>
            {index.map((camp) => (
              <option key={camp.slug} value={camp.slug}>
                {camp.name}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <div className="far-picker-row">
        <label>
          <LegendCircle color="#c4b15a" />
          <input
            type="checkbox"
            onChange={(e) => handlePreVisibleChange(e.target.checked)}
            checked={preVisible}
          />
          Before Camp
        </label>
      </div>
      <div className="far-picker-row">
        <label>
          <LegendCircle color="#78bfcc" />
          <input
            type="checkbox"
            onChange={(e) => handleDestVisibleChange(e.target.checked)}
            checked={destVisible}
          />
          After Camp
        </label>
      </div>
    </div>
  );
};

export default FARPicker;
