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

  const transferLines = useMemo(() => {
    return turf.featureCollection(
      data
        .map((row) => {
          if (
            !row.latitude1 ||
            !row.longitude1 ||
            !row.latitude2 ||
            !row.longitude2
          ) {
            return console.error("missing latitude or longitude", row);
          }
          let offset = Math.random() * 20;
          return turf.transformTranslate(
            turf.greatCircle(
              turf.point([row.longitude1, row.latitude1]),
              turf.point([row.longitude2, row.latitude2]),
              { properties: row }
            ),
            offset,
            offset
          );
        })
        .filter((transfer) => typeof transfer != "undefined")
    );
  }, [data]);

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
            ["get", "personsTransferred"],
            50,
            0.5,
            250,
            1.5,
          ],
          "line-color": colorExpression,
          "line-opacity": 0.25,
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
