import React, { useContext, useEffect } from "react";
import * as turf from "@turf/turf";
import { csv } from "d3";

import FARLayer from "components/FARLayer";
import TransferLayer from "components/TransferLayer";
import GeoJsonLayer from "components/GeoJsonLayer";
import { Context } from "store";
import { constants } from "constants.js";

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

const fetchTransfers = () => csv(constants.DATA_PATH + "transfer-orders.csv");

const transfersToGeoJSON = (journeys) => {
  let coord1 = "";
  let coord2 = "";
  return turf.featureCollection(
    journeys
      .map((j) => {
        if (!j.latitude1 || !j.longitude1 || !j.latitude2 || !j.longitude2)
          return console.error("missing latitude or longitude", j);
        else coord1 = [+j.longitude1, +j.latitude1];
        coord2 = [+j.longitude2, +j.latitude2];
        var finalcoordinate = [coord1, coord2];
        return turf.lineString(finalcoordinate, j);
      })
      .filter((transfer) => typeof transfer != "undefined")
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
        enabled: false,
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
            name: "Immigration Detention Station",
          },
        ],
      };
      dispatch({ type: "add layer", payload: newLayer });
    });
  }, [dispatch]);

  useEffect(() => {
    // Load CSV, convert to GeoJSON, add to the layers in the store
    fetchTransfers().then((transfers) => {
      const transfersGeoJSON = transfersToGeoJSON(transfers);
      const newLayer = {
        name: "Transfer Orders",
        id: "transfers",
        data: transfersGeoJSON,
        clickable: true,
        layerType: "line",
        sourceType: "geojson",
        paint: {
          "line-color": "gray",
          "line-width": 5,
          "line-opacity": 0.6,
        },
        enabled: true,
        layerLegend: [],
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
        enabled: false,
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

    if (layer.id === "far") {
      return <FARLayer key={layer.id} layer={layer} before={before} />;
    }
    if (layer.id === "transfer orders") {
      return <TransferLayer key={layer.id} layer={layer} before={before} />;
    }
    if (layer.sourceType === "geojson") {
      return <GeoJsonLayer key={layer.id} layer={layer} before={before} />;
    }
    return null;
  });
};

export default MapLayers;
