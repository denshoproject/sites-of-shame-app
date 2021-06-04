import React, { useContext, useEffect } from "react";
import * as turf from "@turf/turf";
import { csv, group } from "d3";

import FARLayer from "components/FARLayer";
import FamilyLayer from "components/FamilyLayer";
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
  const familyJourneys = group(
    journeys,
    (d) => d.family_id,
    (d) => d.person_id
  );

  let allJourneyLines = [];

  // console.log({ familyJourneys });
  let familyFeatureCollections = [];
  //return turf.featureCollection(

  familyJourneys.forEach((family) => {
    // For each family (uno and yasui)
    // console.log({ family });

    let familyFeatureCollection = [];

    // Look at every person in this family
    family.forEach((personSteps, i) => {
      // console.log({personSteps})
      const personLineCoords = [];

      // Look at every step that person took
      personSteps.map((j, i) => {
        // console.log({j, i})
        if (!j.latitude || !j.longitude)
          return console.error("Journey missing latitude or longitude", j);
        // else return turf.point([+j.longitude, +j.latitude], j);
        // Add the coordinates to this person's line
        else personLineCoords.push([+j.longitude, +j.latitude]);
      });

      if (personLineCoords.length > 1) {
        const line = turf.lineString(personLineCoords, {
          family_id: personSteps[0].family_id,
          person_id: personSteps[0].person_id,
        });
        familyFeatureCollection.push(line);
        allJourneyLines.push(line);
        // console.log('line --->', line, personLineCoords)
      }
    });
  });

  familyFeatureCollections = turf.featureCollection(allJourneyLines);
  console.log({ familyFeatureCollections });
  return familyFeatureCollections;
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
        layerType: "line",
        sourceType: "geojson",
        paint: {
          "line-width": 4,
          "line-color": {
            property: "person_id",
            type: "categorical",
            stops: [
              ["uno-1", "purple"],
              ["uno-2", "salmon"],
              ["uno-3", "firebrick"],
              ["uno-4", "coral"],
              ["uno-5", "gold"],
              ["uno-6", "peachpuff"],
              ["uno-7", "palegoldenrod"],
              ["uno-8", "fuchsia"],
              ["uno-9", "orchid"],
              ["uno-10", "blueviolet"],
              ["uno-11", "pink"],
              ["yasui-1", "pink"],
              ["yasui-2", "pink"],
              ["yasui-3", "pink"],
            ],
          },
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
