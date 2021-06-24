import React, { useContext, useEffect } from "react";
import { Layer, Source } from "react-mapbox-gl";
import * as d3 from "d3";

import { DATA_PATH } from "constants.js";
import { Context } from "store";

const ExclusionOrderLayer = ({ before, layer, loadData }) => {
  const { state, dispatch } = useContext(Context);
  const { data } = state.exclusionOrders;
  const { clickedFeature } = state;

  useEffect(() => {
    if (!loadData || data.features.length) return;
    d3.json(DATA_PATH + "exclusion-orders.geojson").then((data) => {
      dispatch({
        type: "set exclusionOrders data",
        data,
      });
    });
  }, [data, dispatch, loadData]);

  const exclusionOrderClicked =
    clickedFeature?.layer?.id === "exclusion orders" ?? false;

  return (
    <>
      <Source
        id={layer.id}
        geoJsonSource={{
          type: "geojson",
          data,
        }}
      />
      <Layer
        type="fill"
        id={layer.id}
        sourceId={layer.id}
        before={before}
        paint={{
          "fill-color": "#BEC1C1",
          "fill-outline-color": "#333",
          "fill-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            4,
            0.15,
            12,
            0.05,
          ],
          "fill-pattern": "diagonal-grid",
        }}
      />
      <Layer
        type="line"
        id={`${layer.id}-outline`}
        sourceId={layer.id}
        before={before}
        paint={{
          "line-color": "#999",
          "line-width": 3,
        }}
        filter={[
          "==",
          ["get", "id"],
          exclusionOrderClicked ? clickedFeature.properties.id : null,
        ]}
        layout={{
          visibility: exclusionOrderClicked ? "visible" : "none",
        }}
      />
    </>
  );
};

export default ExclusionOrderLayer;
