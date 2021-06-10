import React, { useContext, useEffect } from "react";
import { Layer, Source } from "react-mapbox-gl";
import * as d3 from "d3";
import * as turf from "@turf/turf";

import { constants } from "constants.js";
import { Context } from "store";

const FacilitiesLayer = ({ before, layer, loadData }) => {
  const { state, dispatch } = useContext(Context);
  const { data, enabledCategories } = state.facilities;

  const fetchFacilities = () => d3.csv(constants.DATA_PATH + "facilities.csv");

  // Load facilities data if needed
  useEffect(() => {
    if (!loadData || data.features.length > 0) return;

    fetchFacilities().then((rows) => {
      const facilitiesGeoJSON = turf.featureCollection(
        rows
          .filter((f) => f.geo_longitude && f.geo_latitude)
          .map((f) => turf.point([f.geo_longitude, f.geo_latitude], f))
      );
      dispatch({
        type: "set facilities data",
        data: facilitiesGeoJSON,
      });
    });
  }, [data, dispatch, loadData]);

  const paint = {
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["to-number", ["get", "peak_population"]],
      100,
      5,
      1000,
      10,
      20000,
      15,
    ],
    "circle-color": {
      property: "sos_category",
      type: "categorical",
      stops: [
        ["Concentration Camp", "#ff7b54"],
        ["Temporary Assembly Center", "#FFB26B"],
        ["Department of Justice Internment Camp", "#ffd56b"],
        ["Citizen Isolation Center", "#939b62"],
        ["US Federal Prison", "#faf2da"],
        ["Additional Facility", "#8e9775"],
        ["US Army Internment Camp", "#4a503d"],
        ["Immigration Detention Station", "#e28f83"],
      ],
    },
    "circle-stroke-color": "rgba(255, 255, 255, 0.25)",
    "circle-stroke-width": 1,
    "circle-opacity": 1,
  };

  let filter = [
    "any",
    ...enabledCategories.map((category) => {
      const { value } = layer.categories.filter((c) => c.name === category)[0];
      return ["==", ["get", "sos_system"], value];
    }),
  ];

  return (
    <>
      <Source
        id={layer.id}
        geoJsonSource={{
          type: "geojson",
          data,
        }}
      />
      <Layer
        type="circle"
        id={`${layer.id}`}
        sourceId={`${layer.id}`}
        before={before}
        filter={filter}
        paint={paint}
      />
    </>
  );
};

export default FacilitiesLayer;
