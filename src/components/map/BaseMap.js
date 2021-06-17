import classNames from "classnames";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import ReactMapboxGl, { Image, ZoomControl } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { MAPBOX_ACCESS_TOKEN, MAPBOX_BASE_LAYER } from "constants.js";
import { Context } from "store";
import MapLayers from "components/layers/MapLayers";
import PopupSwitch from "components/popups/PopupSwitch";
import Arrow from "img/arrow.sdf";
import DiagonalGrid from "img/diagonal-grid.png";
import "./BaseMap.scss";

const BaseMap = ({
  bounds,
  children,
  className,
  center,
  includeZoomControls,
  isInset,
  isInteractive,
  showPopups,
  zoom,
  onMoveEnd,
}) => {
  const { state, dispatch } = useContext(Context);
  const clickableLayerIds = useRef();
  const [map, setMap] = useState(null);
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

  const Map = useMemo(() => {
    return ReactMapboxGl({
      accessToken: MAPBOX_ACCESS_TOKEN,
      interactive: isInteractive,
    });
  }, [isInteractive]);

  useEffect(() => {
    if (mapState.flyTo && !isInset) {
      map.fitBounds(mapState.flyTo, {
        padding: 75,
      });

      dispatch({ type: "set flyTo", flyTo: null });
    }
  }, [dispatch, map, mapState.flyTo, isInset]);

  return (
    <div className={classNames("BaseMap", className)}>
      <Map
        // eslint-disable-next-line
        style={MAPBOX_BASE_LAYER}
        containerStyle={{
          height: "100%",
          width: "100%",
        }}
        center={center}
        fitBounds={bounds}
        interactive={isInteractive}
        zoom={zoom}
        onMoveEnd={onMoveEnd}
        onClick={handleClick}
        onStyleLoad={setMap}
      >
        {includeZoomControls ? <ZoomControl position="top-left" /> : null}
        {showPopups ? <PopupSwitch /> : null}
        <Image id="arrow" options={{ sdf: true }} url={Arrow} />
        <Image id="diagonal-grid" url={DiagonalGrid} />
        <MapLayers loadLayerData={!isInset} />
        {children}
      </Map>
    </div>
  );
};

export default BaseMap;
