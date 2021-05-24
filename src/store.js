import React, { createContext, useReducer } from "react";

const initialState = {
  clickedFeature: null,

  mapState: {
    center: [-93, 38],
    zoom: [4],
  },

  layers: [
    {
      name: "Exclusion Orders",
      id: "exclusion orders",
      data: "./data/exclusion-orders.geojson",
      clickable: true,
      layerType: "fill",
      sourceType: "geojson",
      paint: {
        "fill-color": "salmon",
      },
      enabled: true,
      layerLegend: [],
    },
    {
      name: "Transfer Orders",
      id: "transfer orders",
      data: "./data/transfer-orders.geojson",
      clickable: true,
      layerType: "line",
      sourceType: "geojson",
      paint: {
        "line-width": 3,
        "line-color": "gray",
      },
      enabled: true,
      layerLegend: [],
    },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set clickedFeature":
      return {
        ...state,
        clickedFeature: action.clickedFeature,
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
    case "add layer":
      return {
        ...state,
        layers: [...state.layers, action.payload],
      };
    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Provider;
