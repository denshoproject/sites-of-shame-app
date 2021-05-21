import React from "react";

const FamilyDropdown = () => {
  return (
    <form>
      <label>
        Select a Family:
        <select>
          <option value="Yasui">Yasui Family</option>
          <option value="Uno">Uno Family</option>
        </select>
      </label>
    </form>
  );
};

export default FamilyDropdown;
