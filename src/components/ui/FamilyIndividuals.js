import React, { useContext, useMemo } from "react";
import * as d3 from "d3";
import { Context } from "store";

import "./FamilyIndividual.scss";
import FamilyLegendRectangle from "components/ui/FamilyLegendRectangle";

const FamilyIndividuals = () => {
  const { state } = useContext(Context);
  const { data, selectedFamily } = state.families;

  const familyData = useMemo(() => {
    return data ? data.filter((d) => d.family_id === selectedFamily) : [];
  }, [data, selectedFamily]);

  const byIndividual = useMemo(() => {
    return d3.group(familyData, (d) => d.person_name);
  }, [familyData]);

  const colorScale = d3.scaleOrdinal(d3.schemeSet3);
  const colorScheme = Array.from(byIndividual.keys())
    .sort()
    .map((person) => {
      return {
        personId: person,
        color: colorScale(person),
      };
    });

  let colorExpression = "white";

  if (colorScheme.length > 0) {
    colorExpression = ["match", ["get", "person_id"]];
    colorScheme.forEach(({ personId, color }) => {
      colorExpression.push(personId);
      colorExpression.push(color);
    });
    colorExpression.push("white");
  }

  let allNames = colorExpression.slice(2, colorExpression.length - 1);
  let namesLength = allNames.length / 2;

  let i = 0;
  let allNamesArray = [];
  while (i < namesLength) {
    let eachPerson = allNames.slice(0, 2);
    allNamesArray.push(eachPerson);
    allNames = allNames.slice(2);
    i += 1;
  }

  if (selectedFamily === "") allNamesArray = [];

  return (
    <div className="individual-list">
      {" "}
      {allNamesArray.map((individual) => (
        <ol className="each-individual">
          <li>
            <FamilyLegendRectangle color={individual[1]} />
            {individual[0]}
          </li>
        </ol>
      ))}
    </div>
  );
};

export default FamilyIndividuals;
