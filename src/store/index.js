import React, { createContext, useReducer } from "react";
import * as turf from "@turf/turf";

import { constants } from "constants.js";
import { stateToQuery, queryToState } from "./query";

const initialState = {
  clickedFeature: null,
  clickedFeatureLngLat: null,

  insetMapState: {
    center: [-157.329712, 21.079375],
    zoom: [5],
  },

  mapState: {
    center: [-93, 38],
    zoom: [4],
  },

  far: {
    index: null,
    selectedCamp: "",
    campData: {},
    preVisible: true,
    destVisible: true,
  },

  facilities: {
    data: turf.featureCollection([]),
    enabledCategories: ["WRA", "EAIS", "Hawaii"],
  },

  layers: [
    {
      name: "Exclusion Orders",
      id: "exclusion orders",
      data: constants.DATA_PATH + "exclusion-orders.geojson",
      clickable: true,
      layerType: "fill",
      sourceType: "geojson",
      paint: {
        "fill-color": "#BEC1C1",
        "fill-outline-color": "#333",
        "fill-opacity": 0.25,
        "fill-pattern": "diagonal-grid",
      },
      enabled: true,
    },
    {
      name: "Final Accountability Records",
      id: "far",
      clickable: false,
      clickableSublayers: [
        "far-destLines",
        "far-destPoints",
        "far-preLines",
        "far-prePoints",
      ],
    },
    {
      name: "Transfer Orders",
      id: "transfer orders",
      data: constants.DATA_PATH + "transfer-orders.geojson",
      clickable: true,
      layerType: "line",
      sourceType: "geojson",
      paint: {
        "line-width": 3,
        "line-color": "gray",
      },
      enabled: true,
    },
    {
      name: "Facilities",
      id: "sos-facilities",
      clickable: true,
      layerType: "circle",
      sourceType: "geojson",
      enabled: true,
      categories: [
        {
          name: "WRA",
          value: "wra",
          types: [
            {
              color: "#ff7b54",
              name: "Concentration Camp",
            },
            {
              color: "#FFB26B",
              name: "Temporary Assembly Center",
            },
            {
              color: "#8e9775",
              name: "Additional Facility",
            },
            {
              color: "#939b62",
              name: "Citizen Isolation Center",
            },
          ],
        },
        {
          name: "EAIS",
          value: "eais",
          types: [
            {
              color: "#ffd56b",
              name: "Department of Justice Internment Camp",
            },
            {
              color: "#e28f83",
              name: "Immigration Detention Station",
            },
            {
              color: "#4a503d",
              name: "US Army Internment Camp",
            },
            {
              color: "#faf2da",
              name: "US Federal Prison",
            },
          ],
        },
        {
          name: "Hawaii",
          value: "hawaii",
          types: [
            {
              color: "#4a503d",
              name: "US Army Internment Camp",
            },
            {
              color: "#8e9775",
              name: "Additional Facility",
            },
          ],
        },
      ],
    },
  ],
};

const getNewState = (state, action) => {
  switch (action.type) {
    case "set far index":
      return {
        ...state,
        far: {
          ...state.far,
          index: action.index,
        },
      };
    case "set far preVisible":
      return {
        ...state,
        far: {
          ...state.far,
          preVisible: action.preVisible,
        },
      };
    case "set far destVisible":
      return {
        ...state,
        far: {
          ...state.far,
          destVisible: action.destVisible,
        },
      };
    case "set far selectedCamp":
      return {
        ...state,
        far: {
          ...state.far,
          selectedCamp: action.selectedCamp,
        },
      };
    case "set far camp data":
      return {
        ...state,
        far: {
          ...state.far,
          campData: {
            ...state.far.campData,
            [action.camp]: action.data,
          },
        },
      };
    case "set facilities data":
      return {
        ...state,
        facilities: {
          ...state.facilities,
          data: action.data,
        },
      };
    case "set facilities enabledCategories":
      return {
        ...state,
        facilities: {
          ...state.facilities,
          enabledCategories: action.categories,
        },
      };
    case "set clickedFeature":
      return {
        ...state,
        clickedFeature: action.clickedFeature,
        clickedFeatureLngLat: action.clickedFeatureLngLat,
      };
    case "toggle layer":
      return {
        ...state,
        layers: state.layers.map((l) => {
          if (l.id !== action.layerId) return l;
          return {
            ...l,
            enabled: !l.enabled,
          };
        }),
      };
    case "enable layer":
      return {
        ...state,
        layers: state.layers.map((l) => {
          if (l.id !== action.layerId) return l;
          return {
            ...l,
            enabled: true,
          };
        }),
      };
    case "disable layer":
      return {
        ...state,
        layers: state.layers.map((l) => {
          if (l.id !== action.layerId) return l;
          return {
            ...l,
            enabled: false,
          };
        }),
      };
    case "set mapState":
      return {
        ...state,
        mapState: {
          center: action.center,
          zoom: action.zoom,
        },
      };
    case "set insetMapState":
      return {
        ...state,
        insetMapState: {
          center: action.center,
          zoom: action.zoom,
        },
      };
    case "add layer": {
      // First try to update the layer if it already exists. This might be
      // because the layer was included in the URL query params.
      let layerUpdated = false;
      let newLayers = state.layers.map((layer) => {
        if (layer.id === action.payload.id) {
          layerUpdated = true;
          return {
            ...action.payload,
            ...layer,
          };
        }
        return layer;
      });

      // If it wasn't already included, push it onto the array.
      if (!layerUpdated) {
        newLayers.push(action.payload);
      }

      return {
        ...state,
        layers: newLayers,
      };
    }
    default:
      return state;
  }
};

const reducer = (state, action) => {
  const newState = getNewState(state, action);
  stateToQuery(newState);
  return newState;
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, queryToState(initialState));
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Provider;
