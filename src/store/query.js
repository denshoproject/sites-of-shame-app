import queryString from "query-string";

export const stateToQuery = (state) => {
  const queryState = {
    lat: state.mapState.center[1].toFixed(4),
    lng: state.mapState.center[0].toFixed(4),
    zoom: state.mapState.zoom[0],
  };
  window.location.hash = queryString.stringify(queryState);
};

export const queryToState = (initialState) => {
  const queryState = queryString.parse(window.location.hash);
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

  return {
    ...initialState,
    ...stateUpdates,
  };
};
