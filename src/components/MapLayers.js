import React, { useContext, useEffect } from "react";

import GeoJsonLayer from "./GeoJsonLayer";
import { Context } from "../store";
import * as turf from "@turf/turf";
import { csv } from "d3";

const fetchFacilities = () => csv("./data/facilities.csv");

const facilitiesToGeoJSON = (facilities) => {
  return turf.featureCollection(
    facilities.map((f) => {
      return turf.point([f.geo_longitude, f.geo_latitude], f);
    })
  );
};

const fetchJourneys = () => csv("./data/family-journeys.csv");

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
          "circle-radius": {
            property: "peak_population_rounded",
            type: "categorical",
            stops: [
              ["0", 5],
              ["1000", 6],
              ["2000", 7],
              ["3000", 8],
              ["4000", 9],
              ["5000", 10],
              ["6000", 11],
              ["7000", 12],
              ["8000", 13],
              ["9000", 14],
              ["10000", 15],
              ["11000", 16],
              ["12000", 17],
              ["13000", 18],
              ["14000", 19],
              ["15000", 20],
              ["16000", 21],
              ["17000", 22],
              ["18000", 23],
            ],
          },
          "circle-color": {
            property: "sos_category1",
            type: "categorical",
            stops: [
              ["wra", "red"],
              ["eais", "blue"],
              ["hawaii", "green"],
            ],
          },
          "circle-stroke-color": "white",
          "circle-stroke-width": 1,
          "circle-opacity": 0.5,
        },
        enabled: true,
        layerLegend: [
          {
            color: "red",
            name: "Incarceration Camp",
          },
          {
            color: "pink",
            name: "Temporary Assembly Center",
          },
          {
            color: "salmon",
            name: "Citizen Isolation Center",
          },
          {
            color: "orange",
            name: "EAIS",
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
          "circle-radius": 20,
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

    if (layer.sourceType === "geojson") {
      return <GeoJsonLayer key={layer.id} layer={layer} before={before} />;
    }
    return null;
  });
};

export default MapLayers;
