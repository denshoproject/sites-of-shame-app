import React, { useContext, useEffect } from "react";
import * as turf from "@turf/turf";
import { csv } from "d3";

import FARLayer from "components/FARLayer";
import TransferLayer from "components/TransferLayer";
import FacilitiesLayer from "components/FacilitiesLayer";
import GeoJsonLayer from "components/GeoJsonLayer";
import { Context } from "store";
import { constants } from "constants.js";

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

const MapLayers = ({ loadLayerData }) => {
  const { state, dispatch } = useContext(Context);

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
        enabled: false,
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
    let before = "road-label";
    if (i > 0) {
      before = enabledLayers[i - 1].id;
    }

    if (layer.id === "far") {
      return (
        <FARLayer
          loadData={loadLayerData}
          key={layer.id}
          layer={layer}
          before={before}
        />
      );
    } else if (layer.id === "transfer orders") {
      return (
        <TransferLayer
          loadData={loadLayerData}
          key={layer.id}
          layer={layer}
          before={before}
        />
      );
    } else if (layer.id === "sos-facilities") {
      return (
        <FacilitiesLayer
          loadData={loadLayerData}
          key={layer.id}
          layer={layer}
          before={before}
        />
      );
    } else if (layer.sourceType === "geojson") {
      return <GeoJsonLayer key={layer.id} layer={layer} before={before} />;
    }
    return null;
  });
};

export default MapLayers;
