import React, { useContext, useState, useEffect } from "react";
import * as d3 from "d3";

import { constants } from "constants.js";
import { Context } from "store";
import "./FamilyPicker.scss";
import * as turf from "@turf/turf";

const FamilyPicker = () => {
  const { state, dispatch } = useContext(Context);
  const { data, selectedFamily } = state.families;

  let uniqueFamilies = [];
  if (data.length) {
    const onlyFamilyId = data.map((family) => family.family_id);
    uniqueFamilies = [...new Set(onlyFamilyId)];
  }

  const handleSelectedFamilyChange = (value) => {
    dispatch({ type: "set family selectedFamily", selectedFamily: value });
  };

  return (
    <div className="family-picker">
      <div className="family-picker-row">
        <select
          onChange={(e) => handleSelectedFamilyChange(e.target.value)}
          value={selectedFamily}
        >
          <option value="">Select a family</option>

          {uniqueFamilies.map((family) => (
            <option key={family} value={family}>
              {family}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FamilyPicker;
