import React, { useContext, useEffect } from "react";
import { Layer, Source } from "react-mapbox-gl";
import * as d3 from "d3";
import * as turf from "@turf/turf";

import { constants } from "constants.js";
import { Context } from "store";

const FARLayer = ({ before, layer }) => {
  const { state, dispatch } = useContext(Context);
  const { campData, destVisible, index, preVisible, selectedCamp } = state.far;
  const selectedCampData = campData[selectedCamp];
  let selectedCampRow = null;

  if (index && selectedCamp) {
    selectedCampRow = index.filter((row) => row.slug === selectedCamp)[0];
  }

  const fetchFarCampData = (camp) =>
    d3.csv(`${constants.DATA_PATH}far/${camp}.csv`);

  // Load FAR data if needed
  useEffect(() => {
    if (!selectedCamp || campData[selectedCamp]) return;

    fetchFarCampData(selectedCamp).then((rows) => {
      dispatch({
        type: "set far camp data",
        camp: selectedCamp,
        data: rows.map((row) => ({
          ...row,
          pre_lat: +row.pre_lat,
          pre_lng: +row.pre_lng,
          dest_lat: +row.dest_lat,
          dest_lng: +row.dest_lng,
        })),
      });
    });
  }, [campData, index, selectedCamp, dispatch]);

  //
  // Make feature collections for points and layer
  //
  const prePoints = turf.featureCollection(
    selectedCampData
      ?.filter((row) => row.pre_lat && row.pre_lng)
      ?.map((row) => turf.point([row.pre_lng, row.pre_lat], row)) ?? []
  );

  const destPoints = turf.featureCollection(
    selectedCampData
      ?.filter((row) => row.dest_lat && row.dest_lng)
      ?.map((row) => turf.point([row.dest_lng, row.dest_lat], row)) ?? []
  );

  const preLines = turf.featureCollection(
    selectedCampData
      ?.filter((row) => row.pre_lat && row.pre_lng)
      ?.map((row) =>
        turf.lineString(
          [
            [row.pre_lng, row.pre_lat],
            [selectedCampRow.lng, selectedCampRow.lat],
          ],
          row
        )
      ) ?? []
  );

  const destLines = turf.featureCollection(
    selectedCampData
      ?.filter((row) => row.dest_lat && row.dest_lng)
      ?.map((row) => {
        let lng0 = selectedCampRow.lng;
        let lng1 = row.dest_lng;
        if (lng1 - lng0 >= 180) lng1 -= 360;
        return turf.lineString(
          [
            [lng0, selectedCampRow.lat],
            [lng1, row.dest_lat],
          ],
          row
        );
      }) ?? []
  );

  return (
    <>
      <Source
        id={`${layer.id}-preLines`}
        geoJsonSource={{
          type: "geojson",
          data: preLines,
        }}
      />
      {
        // NB: One of the layers needs to have the FAR Layer id, otherwise the
        // before prop won't work for other layers. We do this here with the
        // first layer.
      }
      <Layer
        type="line"
        id={`${layer.id}`}
        sourceId={`${layer.id}-preLines`}
        before={before}
        paint={{
          "line-width": 1,
          "line-color": "green",
          "line-opacity": 0.25,
        }}
        layout={{
          visibility: preVisible ? "visible" : "none",
        }}
      />
      <Source
        id={`${layer.id}-destLines`}
        geoJsonSource={{
          type: "geojson",
          data: destLines,
        }}
      />
      <Layer
        type="line"
        id={`${layer.id}-destLines`}
        sourceId={`${layer.id}-destLines`}
        before={before}
        paint={{
          "line-width": 1,
          "line-color": "blue",
          "line-opacity": 0.25,
        }}
        layout={{
          visibility: destVisible ? "visible" : "none",
        }}
      />
      <Source
        id={`${layer.id}-prePoints`}
        geoJsonSource={{
          type: "geojson",
          data: prePoints,
        }}
      />
      <Layer
        type="circle"
        id={`${layer.id}-prePoints`}
        sourceId={`${layer.id}-prePoints`}
        before={before}
        paint={{
          "circle-radius": 3,
          "circle-color": "orange",
        }}
        layout={{
          visibility: preVisible ? "visible" : "none",
        }}
      />
      />
      <Source
        id={`${layer.id}-destPoints`}
        geoJsonSource={{
          type: "geojson",
          data: destPoints,
        }}
      />
      <Layer
        type="circle"
        id={`${layer.id}-destPoints`}
        sourceId={`${layer.id}-destPoints`}
        before={before}
        paint={{
          "circle-radius": 3,
          "circle-color": "yellow",
        }}
        layout={{
          visibility: destVisible ? "visible" : "none",
        }}
      />
    </>
  );
};

export default FARLayer;
