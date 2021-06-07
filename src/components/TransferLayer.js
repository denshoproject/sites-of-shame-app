import React, { useContext, useEffect } from "react";
import { Layer, Source } from "react-mapbox-gl";
import * as d3 from "d3";
import * as turf from "@turf/turf";

import { constants } from "constants.js";
import { Context } from "store";

const TransferLayer = ({ before, layer }) => {
  const { state, dispatch } = useContext(Context);
  const { transferData } = state.transfers;

  const fetchTransfers = () =>
    d3.csv(constants.DATA_PATH + "transfer-orders.csv");

  useEffect(() => {
    fetchTransfers().then((rows) => {
      dispatch({
        type: "set transfer data",
        data: rows.map((row) => ({
          ...row,
          latitude1: +row.latitude1,
          longitude1: +row.longitude1,
          latitude2: +row.latitude2,
          longitude2: +row.longitude2,
        })),
      });
    });
  }, [dispatch]);

  let coord1 = "";
  let coord2 = "";
  const transferLines = turf.featureCollection(
    transfers
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

  return (
    <>
      <Source
        id={`${layer.id}`}
        geoJsonSource={{
          type: "geojson",
          data: transferLines,
        }}
      />
      <Layer
        type="line"
        id={`${layer.id}`}
        sourceId={`${layer.id}`}
        before={before}
        paint={{
          "line-width": 1,
          "line-color": "#e3cd68",
          "line-opacity": 0.25,
        }}
      />
    </>
  );
};

export default TransferLayer;
