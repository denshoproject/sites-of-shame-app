import React, { useContext, useEffect } from "react";
import { Layer, Source } from "react-mapbox-gl";
import * as d3 from "d3";
import * as turf from "@turf/turf";

import { DATA_PATH, FACILITY_COLORS } from "constants.js";
import { Context } from "store";

const categoryValueToName = {
  wra: "WRA",
  eais: "EAIS",
  hawaii: "Hawaii",
};

const getColor = (category, type) => FACILITY_COLORS[category][type];

const FacilitiesLayer = ({ before, layer, loadData }) => {
  const { state, dispatch } = useContext(Context);
  const { categories, data, enabledCategories } = state.facilities;

  const fetchFacilities = () => d3.csv(DATA_PATH + "facilities.csv");

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

      const categoryNames = Array.from(
        new Set(rows.map((row) => row.sos_system))
      ).filter((category) => category);
      const categories = categoryNames.map((category) => {
        const types = Array.from(
          new Set(
            rows
              .filter((row) => row.sos_system === category && row.sos_category)
              .map((row) => row.sos_category)
          )
        )
          .sort()
          .map((type) => {
            return {
              name: type,
              color: getColor(category, type),
            };
          });
        return {
          name: categoryValueToName[category],
          value: category,
          types,
        };
      });

      dispatch({
        type: "set facilities categories",
        categories,
      });
    });
  }, [data, dispatch, loadData]);

  const paint = {
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["to-number", ["get", "peak_population"]],
      200,
      5,
      2000,
      10,
      20000,
      15,
    ],
    "circle-color": {
      property: "sos_category",
      type: "categorical",
      stops: [
        ["Concentration Camp", "#E97543"],
        ["Temporary Assembly Center", "#F7A935"],
        ["Department of Justice Internment Camp", "#81B9E2"],
        ["Citizen Isolation Center", "#C3391E"],
        ["US Federal Prison", "#F7A935"],
        ["Additional Facility", "#3C3C3C"],
        ["US Army Internment Camp", "#B3B3B3"],
        ["Immigration Detention Station", "#6FD1CB"],
      ],
    },
    "circle-stroke-color": "rgba(255, 255, 255, 0.25)",
    "circle-stroke-width": 1,
    "circle-opacity": 1,
  };

  let filter = ["any"];

  if (categories) {
    filter = [
      "any",
      ...enabledCategories.map((category) => {
        const { value } =
          categories.filter((c) => c.name === category)[0] || {};
        return ["==", ["get", "sos_system"], value];
      }),
    ];
  }

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
