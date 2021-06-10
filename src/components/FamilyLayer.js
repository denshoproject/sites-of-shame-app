import React, { useContext, useEffect, useMemo } from "react";
import { Layer, Source } from "react-mapbox-gl";
import * as d3 from "d3";
import * as turf from "@turf/turf";

import { constants } from "constants.js";
import { Context } from "store";

const FamilyLayer = ({ before, layer }) => {
  const { state, dispatch } = useContext(Context);
  const { data, selectedFamily } = state.families;

  const fetchFamilies = () =>
    d3.csv(constants.DATA_PATH + "familyjourneys-withdates.csv");

  useEffect(() => {
    if (data.length) return;
    fetchFamilies().then((rows) => {
      dispatch({
        type: "set family data",
        data: rows.map((row) => ({
          ...row,
          latitude: +row.latitude,
          longitude: +row.longitude,
        })),
      });
    });
  }, [data, dispatch]);

  const familyData = useMemo(
    () => (data ? data.filter((d) => d.family_id === selectedFamily) : []),
    [data, selectedFamily]
  );

  const byIndividual = d3.group(familyData, (d) => d.person_id);

  const lines = turf.featureCollection(
    Array.from(byIndividual.keys())
      .map((personId) => {
        const steps = byIndividual.get(personId);
        if (steps.length < 2) return null;
        return turf.lineString(
          steps.map((step) => [step.longitude, step.latitude]),
          steps[0]
        );
      })
      .filter((line) => line)
  );

  return (
    <>
      <Source
        id={layer.id}
        geoJsonSource={{
          type: "geojson",
          data: lines,
        }}
      />
      <Layer
        type="line"
        id={layer.id}
        sourceId={layer.id}
        before={before}
        paint={{
          "line-width": 2,
          "line-color": "gray",
          "line-opacity": 0.25,
        }}
      />
    </>
  );
};

export default FamilyLayer;
