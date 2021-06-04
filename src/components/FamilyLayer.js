import React, { useContext, useEffect } from "react";
import { Layer, Source } from "react-mapbox-gl";
import * as d3 from "d3";
import * as turf from "@turf/turf";
import { csv, group } from "d3";

import { constants } from "constants.js";
import { Context } from "store";

const FamilyLayer = ({ before, layer }) => {
  const { state, dispatch } = useContext(Context);
  const { familyData, index, selectedFamily } = state.family;
  const selectedFamilyData = familyData[selectedFamily];
  let selectedFamilyRow = null;

  if (index && selectedFamily) {
    selectedFamilyRow = index.filter((row) => row.slug === selectedFamily)[0];
  }

  const fetchJourneys = () =>
    d3.csv(constants.DATA_PATH + "family-journeys.csv");

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
    // console.log(familyFeatureCollections)
  };

  return (
    <>
      {/* <Source
        id={`${layer.id}`}
        geoJsonSource={{
          type: "geojson",
          data: familyFeatureCollections,
        }}
      /> */}
      {
        // NB: One of the layers needs to have the FAR Layer id, otherwise the
        // before prop won't work for other layers. We do this here with the
        // first layer.
      }
      <Layer
        type="line"
        id={`${layer.id}`}
        sourceId={`${layer.id}`}
        before={before}
        paint={{
          "line-width": 1,
          "line-color": "green",
          "line-opacity": 0.25,
        }}
      />
    </>
  );
};

export default FamilyLayer;
