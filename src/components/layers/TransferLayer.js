import React, { useContext, useEffect, useMemo } from "react";
import { Layer, Source } from "react-mapbox-gl";
import * as d3 from "d3";
import * as turf from "@turf/turf";

import { DATA_PATH } from "constants.js";
import { Context } from "store";

const TransferLayer = ({ before, layer, loadData }) => {
  const { state, dispatch } = useContext(Context);
  const { data } = state.transfers;

  const fetchTransfers = () => d3.csv(DATA_PATH + "transfer-orders.csv");

  useEffect(() => {
    if (!loadData) return;

    fetchTransfers().then((rows) => {
      dispatch({
        type: "set transfer data",
        data: rows.map((row) => ({
          ...row,
          latitude1: +row.latitude1,
          longitude1: +row.longitude1,
          latitude2: +row.latitude2,
          longitude2: +row.longitude2,
          personsTransferred: +row["Persons transferred"],
        })),
      });
    });
  }, [dispatch, loadData]);

  const transfers = useMemo(() => {
    const hash = {};
    data.forEach((r) => {
      const key = `${r["Transfer order number"]}`;
      if (!hash[key]) hash[key] = [];
      hash[key].push(r);
    });

    return Object.values(hash).map((rows) => {
      return {
        latitude1: rows[0].latitude1,
        longitude1: rows[0].longitude1,
        latitude2: rows[0].latitude2,
        longitude2: rows[0].longitude2,
        transferred: d3.sum(rows, (d) => d["Persons transferred"]),
        transfernumber: rows[0]["Transfer order number"],
      };
    });
  });

  const transferLines = useMemo(() => {
    return turf.featureCollection(
      transfers
        .map((row) => {
          if (
            !row.latitude1 ||
            !row.longitude1 ||
            !row.latitude2 ||
            !row.longitude2
          ) {
            return console.error("missing latitude or longitude", row);
          }
          return turf.greatCircle(
            turf.point([row.longitude1, row.latitude1]),
            turf.point([row.longitude2, row.latitude2]),
            { properties: row }
          );
        })
        .filter((transfer) => typeof transfer != "undefined")
    );
  }, [transfers]);

  const colorExpression = "#2d2a6b";

  return (
    <>
      <Source
        id={layer.id}
        geoJsonSource={{
          type: "geojson",
          data: transferLines,
        }}
      />
      <Layer
        type="line"
        id={layer.id}
        sourceId={layer.id}
        before={before}
        paint={{
          "line-width": [
            "interpolate",
            ["linear"],
            ["get", "transferred"],
            3000,
            3,
            5000,
            5,
            8000,
            7,
          ],
          "line-color": colorExpression,
          "line-opacity": 0.4,
        }}
      />
      <Layer
        type="symbol"
        sourceId={layer.id}
        before={layer.id}
        paint={{
          "icon-color": colorExpression,
        }}
        layout={{
          "icon-image": "arrow",
          "icon-size": ["interpolate", ["linear"], ["zoom"], 4, 0.5, 12, 2],
          "symbol-placement": "line",
        }}
      />
    </>
  );
};

export default TransferLayer;
