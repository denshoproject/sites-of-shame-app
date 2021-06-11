import React, { useContext, useEffect, useMemo } from "react";
import { Image, Layer, Source } from "react-mapbox-gl";
import * as d3 from "d3";
import * as turf from "@turf/turf";

import Arrow from "img/arrow.sdf";
import { DATA_PATH } from "constants.js";
import { Context } from "store";

const FamilyLayer = ({ before, layer, loadData }) => {
  const { state, dispatch } = useContext(Context);
  const { data, selectedFamily } = state.families;

  const fetchFamilies = () =>
    d3.csv(DATA_PATH + "familyjourneys-withdates.csv");

  useEffect(() => {
    if (!loadData || data.length) return;
    fetchFamilies().then((rows) => {
      dispatch({
        type: "set family data",
        data: rows
          .map((row) => ({
            ...row,
            latitude: +row.latitude,
            longitude: +row.longitude,
          }))
          .filter(({ latitude, longitude }) => latitude && longitude),
      });
    });
  }, [data, dispatch, loadData]);

  const familyData = useMemo(() => {
    return data ? data.filter((d) => d.family_id === selectedFamily) : [];
  }, [data, selectedFamily]);

  const byIndividual = useMemo(() => {
    return d3.group(familyData, (d) => d.person_id);
  }, [familyData]);

  const individuals = useMemo(() => {
    return Array.from(byIndividual.keys());
  }, [byIndividual]);

  const sharpnesses = useMemo(() => {
    return Object.fromEntries(
      individuals.map((personId) => {
        return [personId, Math.random() / 4 + 0.5];
      })
    );
  }, [individuals]);

  const lines = useMemo(() => {
    return turf.featureCollection(
      Array.from(byIndividual.keys())
        .map((personId) => {
          const steps = byIndividual.get(personId);
          if (steps.length < 2) return null;
          return turf.bezierSpline(
            turf.lineString(
              steps.map((step) => [step.longitude, step.latitude])
            ),
            {
              sharpness: sharpnesses[personId],
              properties: steps[0],
            }
          );
        })
        .filter((line) => line)
    );
  }, [byIndividual, sharpnesses]);

  const points = useMemo(() => {
    return turf.featureCollection(
      familyData.map((step) => {
        return turf.point([step.longitude, step.latitude], step);
      })
    );
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

  let colorExpression = "gray";

  if (colorScheme.length > 0) {
    colorExpression = ["match", ["get", "person_id"]];
    colorScheme.forEach(({ personId, color }) => {
      colorExpression.push(personId);
      colorExpression.push(color);
    });
    colorExpression.push("gray");
  }

  return (
    <>
      <Image id="arrow" options={{ sdf: true }} url={Arrow} />
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
          "line-width": 4,
          "line-color": colorExpression,
          "line-opacity": 0.75,
        }}
      />
      <Layer
        type="symbol"
        sourceId={layer.id}
        before={layer.id}
        paint={{
          "icon-color": colorExpression,
        }}
        layout={{
          "icon-image": "arrow",
          "icon-size": ["interpolate", ["linear"], ["zoom"], 4, 0.5, 12, 2],
          "symbol-placement": "line",
        }}
      />
      <Source
        id={`${layer.id}-points`}
        geoJsonSource={{
          type: "geojson",
          data: points,
        }}
      />
      <Layer
        type="circle"
        id={`${layer.id}-points`}
        sourceId={`${layer.id}-points`}
        before={before}
        paint={{
          "circle-radius": 6,
          "circle-color": colorExpression,
          "circle-opacity": 0.75,
        }}
      />
    </>
  );
};

export default FamilyLayer;
