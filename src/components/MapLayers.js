import React, { useContext, useEffect } from "react";

import GeoJsonLayer from "./GeoJsonLayer";
import { Context, reducer } from "../store";
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

const MapLayers = () => {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    // Load CSV, convert to GeoJSON, add to the layers in the store
    fetchFacilities().then((facilities) => {
      const facilitiesGeoJSON = facilitiesToGeoJSON(facilities);
      const newLayer = {
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
