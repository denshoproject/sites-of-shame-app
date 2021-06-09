import React, { useContext, useEffect } from "react";
import { Layer, Source } from "react-mapbox-gl";
import * as d3 from "d3";
import * as turf from "@turf/turf";

import { constants } from "constants.js";
import { Context } from "store";

const FamilyLayer = ({ before, layer }) => {
  const { state, dispatch } = useContext(Context);
  const { data } = state.families;

  const fetchFamilies = () =>
    d3.csv(constants.DATA_PATH + "familyjourneys-withdates.csv");

  useEffect(() => {
    fetchFamilies().then((rows) => {
      dispatch({
        type: "set family data",
        data: rows.map((row) => ({
          ...row,
          personid: +row.person_id,
          familyid: +row.family_id,
          latitude1: +row.latitude,
          longitude1: +row.longitude,
        })),
      });
    });
  }, [dispatch]);

  let familyLines = turf.featureCollection([]);
  let familyArray = [
    [-122.6762071, -45.5234515],
    [-114.019501, 46.8605189],
  ];

  if (data.length) {
    data.map((j) => {
      familyArray.push([j.longitude1, j.latitude1]);
    });
  }

  familyLines = turf.featureCollection([turf.lineString(familyArray)]);

  return (
    <>
      <Source
        id={layer.id}
        geoJsonSource={{
          type: "geojson",
          data: familyLines,
        }}
      />
      <Layer
        type="line"
        id={layer.id}
        sourceId={layer.id}
        before={before}
        paint={{
          "line-width": 1,
          "line-color": "gray",
          "line-opacity": 0.25,
        }}
      />
    </>
  );
};

export default FamilyLayer;
