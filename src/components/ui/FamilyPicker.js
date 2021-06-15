import React, { useContext } from "react";

import { Context } from "store";
import "./FamilyPicker.scss";
import FamilyIndividuals from "components/ui/FamilyIndividuals";

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

  let capitalizeUniqueFamilies = [];
  if (data.length) {
    const familyName = data
      .map((family) => family.family_name)
      .filter((familyName) => familyName.length > 0);
    capitalizeUniqueFamilies = [...new Set(familyName)].sort();
  }

  let allFamilyNames = [];

  let i = 0;
  while (i < uniqueFamilies.length) {
    let bothNames = [uniqueFamilies[i], capitalizeUniqueFamilies[i]];
    i++;
    allFamilyNames.push(bothNames);
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

          {allFamilyNames.map((family) => (
            <option key={family[0]} value={family[0]}>
              {family[1]}
            </option>
          ))}
        </select>
        <FamilyIndividuals />
      </div>
    </div>
  );
};

export default FamilyPicker;
