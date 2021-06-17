import React, { createContext, useReducer } from "react";
import * as turf from "@turf/turf";

import { DATA_PATH } from "constants.js";
import { stateToQuery, queryToState } from "./query";

const initialState = {
  clickedFeature: null,
  clickedFeatureLngLat: null,

  infobox: {
    openId: null,
    clickedId: null,
    content: [],
    x: null,
    y: null,
  },

  insetMapState: {
    center: [-157.329712, 21.079375],
    zoom: [5],
  },

  mapState: {
    flyTo: null,
    center: [-93, 38],
    zoom: [4],
  },

  far: {
    index: null,
    selectedCamp: "",
    campData: {},
    preVisible: true,
    destVisible: true,
    loading: {},
  },

  transfers: {
    data: [],
  },

  families: {
    selectedFamily: "",
    data: [],
    colorScheme: [],
  },

  facilities: {
    categories: [],
    data: turf.featureCollection([]),
    enabledCategories: ["WRA", "EAIS", "Hawaii"],
  },

  layers: [
    {
      name: "Exclusion Orders",
      id: "exclusion orders",
      data: DATA_PATH + "exclusion-orders.geojson",
      clickable: true,
      layerType: "fill",
      sourceType: "geojson",
      paint: {
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
      },
      enabled: true,
      order: 0,
    },
    {
      name: "Final Accountability Records",
      id: "far",
      clickable: false,
      clickableSublayers: ["far-lines", "far-points"],
    },
    {
      name: "Family Journeys",
      id: "families",
      clickable: true,
      order: 5,
    },
    {
      name: "Transfer Orders",
      id: "transfer orders",
      data: DATA_PATH + "transfer-orders.geojson",
      clickable: true,
      layerType: "line",
      sourceType: "geojson",
      paint: {
        "line-width": 3,
        "line-color": "gray",
      },
      enabled: false,
      order: 4,
    },
    {
      name: "Facilities",
      id: "sos-facilities",
      clickable: true,
      layerType: "circle",
      sourceType: "geojson",
      enabled: true,
      order: 2,
    },
  ],
};

const getNewState = (state, action) => {
  switch (action.type) {
    case "clear open infobox":
      return {
        ...state,
        infobox: {
          ...state.infobox,
          clickedId: null,
          openId: null,
          x: null,
          y: null,
        },
      };
    case "set open infobox":
      return {
        ...state,
        infobox: {
          ...state.infobox,
          clickedId: action.clickedId,
          openId: action.id,
          x: action.x,
          y: action.y,
        },
      };
    case "set infobox content":
      return {
        ...state,
        infobox: {
          ...state.infobox,
          content: action.content,
        },
      };
    case "set transfer data":
      return {
        ...state,
        transfers: {
          ...state.transfers,
          data: action.data,
        },
      };
    case "set family data":
      return {
        ...state,
        families: {
          ...state.families,
          data: action.data,
        },
      };
    case "set family colorScheme":
      return {
        ...state,
        families: {
          ...state.families,
          colorScheme: action.colorScheme,
        },
      };
    case "set family selectedFamily":
      return {
        ...state,
        families: {
          ...state.families,
          selectedFamily: action.selectedFamily,
        },
      };
    case "set far loading":
      return {
        ...state,
        far: {
          ...state.far,
          loading: {
            ...state.far.loading,
            [action.camp]: action.loading,
          },
        },
      };
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
    case "set facilities categories":
      return {
        ...state,
        facilities: {
          ...state.facilities,
          categories: action.categories,
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
          ...state.mapState,
          center: action.center,
          zoom: action.zoom,
        },
      };
    case "set flyTo":
      return {
        ...state,
        mapState: {
          ...state.mapState,
          flyTo: action.flyTo,
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
