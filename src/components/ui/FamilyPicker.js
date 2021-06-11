import React, { useContext } from "react";

import { Context } from "store";
import "./FamilyPicker.scss";

const FamilyPicker = () => {
  const { state, dispatch } = useContext(Context);
  const { data, selectedFamily } = state.families;

  let uniqueFamilies = [];
  if (data.length) {
    const onlyFamilyId = data
      .map((family) => family.family_id)
      .filter((familyId) => familyId.length > 0);
    uniqueFamilies = [...new Set(onlyFamilyId)].sort();
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