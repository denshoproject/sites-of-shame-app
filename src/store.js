import React, { createContext, useReducer } from "react";

const initialState = {
  clickedFeature: null,

  far: {
    index: null,
    selectedCamp: null,
    campData: {},
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
      name: "Final Accountability Records",
      id: "final accountability records",
      clickable: true,
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
    case "set far index":
      return {
        ...state,
        far: {
          ...state.far,
          index: action.index,
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
