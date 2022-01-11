import React, { useContext, useMemo } from "react";
import * as d3 from "d3";
import { Context } from "store";

import InfoboxButton from "components/ui/InfoboxButton";
import "./FamilyIndividuals.scss";
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
        const personId = byIndividual.get(individual)[0].person_id;
        const hasBio = 
          ((byIndividual.get(individual)[0].has_bio === 1) ? true : false);
        return { name, color, personId, hasBio };
      })
      .sort((a, b) => d3.ascending(a.name, b.name));
  }, [byIndividual, colorScheme]);

  return (
    <div className="family-individuals">
      <div className="family-name-container">
        <div className="family-name-spacer"></div>
        {familyName ? (
          <div className="family-name">{familyName} family</div>
        ) : null}
        {familyName ? (
          <InfoboxButton id={familyName} clickedId={familyName} />
        ) : null}
      </div>
      <ol className="individual-list">
        {individuals.map(({ name, color, personId, hasBio }) => (
          <li key={name}>
            <FamilyLegendRectangle color={color} />
            {name} 
            {hasBio ? (
              <InfoboxButton id={personId} clickedId={personId} />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FamilyIndividuals;
