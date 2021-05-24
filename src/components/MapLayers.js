import React, { useContext, useEffect } from "react";

import FARLayer from "./FARLayer";
import GeoJsonLayer from "./GeoJsonLayer";
import { Context } from "../store";
import * as turf from "@turf/turf";
import { csv } from "d3";
import { constants } from "../constants";

const fetchFacilities = () => csv(constants.DATA_PATH + "facilities.csv");

const facilitiesToGeoJSON = (facilities) => {
  return turf.featureCollection(
    facilities.map((f) => {
      return turf.point([f.geo_longitude, f.geo_latitude], f);
    })
  );
};

const fetchJourneys = () => csv(constants.DATA_PATH + "family-journeys.csv");

const journeysToGeoJSON = (journeys) => {
  return turf.featureCollection(
    journeys
      .map((j) => {
        if (!j.latitude || !j.longitude)
          return console.error("Journey missing latitude or longitude", j);
        else return turf.point([+j.longitude, +j.latitude], j);
      })
      .filter((journey) => typeof journey != "undefined")
  );
};

const MapLayers = () => {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    // Load CSV, convert to GeoJSON, add to the layers in the store
    fetchFacilities().then((facilities) => {
      const facilitiesGeoJSON = facilitiesToGeoJSON(facilities);
      const newLayer = {
        name: "Facilities",
        id: "sos-facilities",
        data: facilitiesGeoJSON,
        clickable: true,
        layerType: "circle",
        sourceType: "geojson",
        paint: {
          "circle-radius": [
            "/",
            ["to-number", ["get", "peak_population"]],
            500,
          ],
          // "circle-radius": {
          //   property: "peak_population_rounded",
          //   type: "categorical",
          //   stops: [
          //     ["0", 5],
          //     ["1000", 6],
          //     ["2000", 7],
          //     ["3000", 8],
          //     ["4000", 9],
          //     ["5000", 10],
          //     ["6000", 11],
          //     ["7000", 12],
          //     ["8000", 13],
          //     ["9000", 14],
          //     ["10000", 15],
          //     ["11000", 16],
          //     ["12000", 17],
          //     ["13000", 18],
          //     ["14000", 19],
          //     ["15000", 20],
          //     ["16000", 21],
          //     ["17000", 22],
          //     ["18000", 23],
          //   ],
          // },
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
        },
        enabled: true,
        layerLegend: [
          {
            color: "#ff7b54",
            name: "Concentration Camp",
          },
          {
            color: "#FFB26B",
            name: "Temporary Assembly Center",
          },
          {
            color: "#ffd56b",
            name: "Department of Justice Internment Camp",
          },
          {
            color: "#939b62",
            name: "Citizen Isolation Center",
          },
          {
            color: "#faf2da",
            name: "US Federal Prison",
          },
          {
            color: "#8e9775",
            name: "Additional Facility",
          },
          {
            color: "#4a503d",
            name: "US Army Internment Camp",
          },
          {
            color: "#e28f83",
            name: "US Army Internment Camp",
          },
        ],
      };
      dispatch({ type: "add layer", payload: newLayer });
    });
  }, [dispatch]);

  useEffect(() => {
    // Load CSV, convert to GeoJSON, add to the layers in the store
    fetchJourneys().then((journeys) => {
      const journeysGeoJSON = journeysToGeoJSON(journeys);
      const newLayer = {
        name: "Journeys",
        id: "sos-journeys",
        data: journeysGeoJSON,
        clickable: true,
        layerType: "circle",
        sourceType: "geojson",
        paint: {
          "circle-radius": 10,
          "circle-color": "blue",
          "circle-stroke-color": "white",
          "circle-stroke-width": 1,
          "circle-opacity": 0.5,
        },
        enabled: true,
        layerLegend: [],
      };
      dispatch({ type: "add layer", payload: newLayer });
    });
  }, [dispatch]);

  let enabledLayers = state.layers
    .filter(({ enabled }) => enabled)
    .sort((a, b) => {
      let value = a.order - b.order;
      if (value === 0) {
        value = a.name.localeCompare(b.name);
      }
      return value;
    })
    .reverse();

  return enabledLayers.map((layer, i) => {
    let before;
    if (i > 0) {
      before = enabledLayers[i - 1].id;
    }

    if (layer.id === "final accountability records") {
      return <FARLayer key={layer.id} layer={layer} before={before} />;
    }
    if (layer.sourceType === "geojson") {
      return <GeoJsonLayer key={layer.id} layer={layer} before={before} />;
    }
    return null;
  });
};

export default MapLayers;
