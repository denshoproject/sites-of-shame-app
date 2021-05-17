import React from "react";
import { Layer, Source } from 'react-mapbox-gl';

const VectorLayer = ({ before, layer }) => {
  return (
    <React.Fragment>
      <Source
        id={layer.id} 
        geoJsonSource={{
          type: 'geojson',
          data: layer.url,
        }}
      />
      <Layer
        type={layer.layerType}
        id={layer.id}
        sourceId={layer.id}
        before={before}
        paint={layer.paint}
      />
    </React.Fragment>
  );
};

export default VectorLayer;
