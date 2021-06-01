import queryString from "query-string";

export const stateToQuery = (state) => {
  const layers = state.layers
    .filter((layer) => layer.enabled)
    .map((layer) => layer.id)
    .join("|");

  const queryState = {
    lat: state.mapState.center[1].toFixed(4),
    layers,
    lng: state.mapState.center[0].toFixed(4),
    zoom: state.mapState.zoom[0],
  };
  window.history.replaceState(
    null,
    null,
    "?" + queryString.stringify(queryState)
  );
};

export const queryToState = (initialState) => {
  const queryState = queryString.parse(window.location.search);
  const stateUpdates = {};

  if (queryState.zoom) {
    if (!stateUpdates.mapState)
      stateUpdates.mapState = { ...initialState.mapState };
    stateUpdates.mapState.zoom = [+queryState.zoom];
  }

  if (queryState.lat && queryState.lng) {
    if (!stateUpdates.mapState)
      stateUpdates.mapState = { ...initialState.mapState };
    stateUpdates.mapState.center = [+queryState.lng, +queryState.lat];
  }

  if (queryState.layers) {
    const enabledLayers = queryState.layers.split("|");
    stateUpdates.layers = initialState.layers.map((layer) => ({
      ...layer,
      enabled: enabledLayers.indexOf(layer.id) >= 0,
    }));
    const stateLayerIds = stateUpdates.layers.map(({ id }) => id);

    // If a layer is enabled that is not in the initial state, add a stub
    enabledLayers.forEach((layer) => {
      if (stateLayerIds.indexOf(layer) >= 0) return;
      stateUpdates.layers.push({
        id: layer,
        enabled: true,
      });
    });
  }

  return {
    ...initialState,
    ...stateUpdates,
  };
};
