import React, { createContext, useReducer } from "react";

const initialState = {
  layers: [
    // {
    //   id: "sos-facilities",
    //   url: "data/sos_facilities.geojson",
    //   layerType: "circle",
    //   sourceType: "geojson",
    //   paint: {
    //     "circle-radius": 50,
    //     "circle-color": "red",
    //     "circle-stroke-color": "white",
    //     "circle-stroke-width": 1,
    //     "circle-opacity": 0.5,
    //   },
    //   enabled: true,
    // },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
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
      const newLayers = [...state.layers, action.payload];
      return {
        ...state,
        layers: newLayers,
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
