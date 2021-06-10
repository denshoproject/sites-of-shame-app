import React, { useContext } from "react";

import FARLayer from "components/FARLayer";
import TransferLayer from "components/TransferLayer";
import FamilyLayer from "components/FamilyLayer";
import FacilitiesLayer from "components/FacilitiesLayer";
import GeoJsonLayer from "components/GeoJsonLayer";
import { Context } from "store";

const MapLayers = ({ loadLayerData }) => {
  const { state } = useContext(Context);

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
    } else if (layer.id === "families") {
      return (
        <FamilyLayer
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
