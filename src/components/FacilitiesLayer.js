import React, { useContext, useEffect } from "react";
import { Layer, Source } from "react-mapbox-gl";
import * as d3 from "d3";
import * as turf from "@turf/turf";

import { constants } from "constants.js";
import { Context } from "store";

const FacilitiesLayer = ({ before, layer }) => {
  const { state, dispatch } = useContext(Context);
  const { data, enabledCategories } = state.facilities;

  const fetchFacilities = () => d3.csv(constants.DATA_PATH + "facilities.csv");

  // Load facilities data if needed
  useEffect(() => {
    if (data.features.length > 0) return;

    fetchFacilities().then((rows) => {
      const facilitiesGeoJSON = turf.featureCollection(
        rows.map((f) => {
          return turf.point([f.geo_longitude, f.geo_latitude], f);
        })
      );
      dispatch({
        type: "set facilities data",
        data: facilitiesGeoJSON,
      });
    });
  }, [data, dispatch]);

  const paint = {
    "circle-radius": ["/", ["to-number", ["get", "peak_population"]], 500],
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
    "circle-stroke-color": "white",
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
