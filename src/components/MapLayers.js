import React, { useContext, useEffect } from "react";

import GeoJsonLayer from "./GeoJsonLayer";
import { Context } from "../store";
import * as turf from "@turf/turf";
import { csv, json } from "d3";

const fetchFacilities = () => csv("./data/facilities.csv");

const facilitiesToGeoJSON = (facilities) => {
  return turf.featureCollection(
    facilities.map((f) => {
      return turf.point([f.geo_longitude, f.geo_latitude], f);
    })
  );
};

const fetchExclusionOrders = () => json("./data/eo_simplified.geojson");

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
        layerType: "circle",
        sourceType: "geojson",
        paint: {
          "circle-radius": 50,
          "circle-color": "red",
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
    fetchExclusionOrders().then((eoGeoJSON) => {
      const newLayer = {
        name: "Exclusion Orders",
        id: "exclusion orders",
        data: eoGeoJSON,
        layerType: "fill",
        sourceType: "geojson",
        paint: {
          "fill-color": "salmon",
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
