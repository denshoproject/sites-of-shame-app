import React, { useContext, useMemo } from "react";
import * as d3 from "d3";
import { Context } from "store";

import "./FamilyIndividual.scss";
import FamilyLegendRectangle from "components/ui/FamilyLegendRectangle";

const FamilyIndividuals = () => {
  const { state } = useContext(Context);
  const { colorScheme, data, selectedFamily } = state.families;

  const familyData = useMemo(() => {
    return data ? data.filter((d) => d.family_id === selectedFamily) : [];
  }, [data, selectedFamily]);

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
    <div className="individual-list">
      {individuals.map(({ name, color }) => (
        <ol className="each-individual">
          <li>
            <FamilyLegendRectangle color={color} />
            {name}
          </li>
        </ol>
      ))}
    </div>
  );
};

export default FamilyIndividuals;
