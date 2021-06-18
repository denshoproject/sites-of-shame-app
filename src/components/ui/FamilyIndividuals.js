import React, { useContext, useMemo } from "react";
import * as d3 from "d3";
import { Context } from "store";

import InfoboxButton from "components/ui/InfoboxButton";
import "./FamilyIndividual.scss";
import FamilyLegendRectangle from "components/ui/FamilyLegendRectangle";

const FamilyIndividuals = () => {
  const { state } = useContext(Context);
  const { colorScheme, data, selectedFamily } = state.families;

  const familyData = useMemo(() => {
    return data ? data.filter((d) => d.family_id === selectedFamily) : [];
  }, [data, selectedFamily]);

  const familyName = useMemo(
    () => familyData[0]?.family_name ?? null,
    [familyData]
  );

  const byIndividual = useMemo(() => {
    return d3.group(familyData, (d) => d.person_id);
  }, [familyData]);

  const individuals = useMemo(() => {
    if (!byIndividual) return [];
    const individualIds = Array.from(byIndividual.keys());
    return individualIds
      .map((individual) => {
        const name = byIndividual.get(individual)[0].person_name;
        const color =
          colorScheme.filter(({ personId }) => personId === individual)[0]
            ?.color ?? null;
        return { name, color };
      })
      .sort((a, b) => d3.ascending(a.name, b.name));
  }, [byIndividual, colorScheme]);

  return (
    <div className="family-individuals">
      <div style={{ display: "flex", alignItems: "center" }}>
        {familyName ? (
          <div style={{ display: "flex" }} className="family-name">
            {familyName} family
          </div>
        ) : null}
        {familyName ? (
          <InfoboxButton
            style={{ display: "flex" }}
            id={familyName}
            clickedId={familyName}
          />
        ) : null}
      </div>
      <ol className="individual-list">
        {individuals.map(({ name, color }) => (
          <li key={name}>
            <FamilyLegendRectangle color={color} />
            {name}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FamilyIndividuals;
