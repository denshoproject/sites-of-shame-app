import React, { createContext, useReducer } from "react";

const initialState = {
  layers: [],
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
