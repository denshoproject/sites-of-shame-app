import classNames from "classnames";
import React, { useContext, useRef } from "react";
import ReactMapboxGl, { Image, ZoomControl } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { constants } from "constants.js";
import { Context } from "store";
import MapLayers from "components/MapLayers";
import PopupSwitch from "components/PopupSwitch";
import DiagonalGrid from "img/diagonal-grid.png";
import "./BaseMap.scss";

const Map = ReactMapboxGl({
  accessToken: constants.MAPBOX_ACCESS_TOKEN,
});

const BaseMap = ({ children, className, onMoveEnd }) => {
  const { state, dispatch } = useContext(Context);
  const clickableLayerIds = useRef();
  const { mapState } = state;

  clickableLayerIds.current = state.layers
    .filter(({ clickable, enabled }) => clickable && enabled)
    .map(({ id }) => id);

  state.layers
    .filter(({ enabled }) => enabled)
    .forEach((layer) => {
      if (layer.clickableSublayers) {
        clickableLayerIds.current = [
          ...clickableLayerIds.current,
          ...layer.clickableSublayers,
        ];
      }
    });

  const handleClick = (map, event) => {
    const features = map.queryRenderedFeatures(event.point, {
      layers: clickableLayerIds.current,
    });
    dispatch({
      type: "set clickedFeature",
      clickedFeature: features[0] || null,
      clickedFeatureLngLat: event.lngLat || null,
    });
  };

  return (
    <div className={classNames("BaseMap", className)}>
      <Map
        // eslint-disable-next-line
        style={constants.MAPBOX_BASE_LAYER}
        containerStyle={{
          height: "100%",
          width: "100%",
        }}
        center={mapState.center}
        zoom={mapState.zoom}
        onMoveEnd={onMoveEnd}
        onClick={handleClick}
      >
        <ZoomControl position="bottom-right" />
        <PopupSwitch />
        <Image id="diagonal-grid" url={DiagonalGrid} />
        <MapLayers />
        {children}
      </Map>
    </div>
  );
};

export default BaseMap;
