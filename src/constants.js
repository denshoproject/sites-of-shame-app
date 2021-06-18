export const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
export const MAPBOX_BASE_LAYER = process.env.REACT_APP_MAPBOX_BASE_LAYER;
export const DATA_PATH = process.env.REACT_APP_DATA_PATH;
export const HAWAII_BOUNDS = [
  [-160.4279, 18.7711],
  [-154.6545, 22.4415],
];

export const FACILITY_COLORS = {
  wra: {
    "Additional Facility": "#3C3C3C",
    "Citizen Isolation Center": "#C3391E",
    "Concentration Camp": "#E97543",
    "Temporary Assembly Center": "#F7A935",
  },
  eais: {
    "Additional Facility": "#3C3C3C",
    "Department of Justice Internment Camp": "#81B9E2",
    "Immigration Detention Station": "#6FD1CB",
    "U.S. Army Internment Camp": "#3C9B90",
    "U.S. Federal Prison": "#faf2da",
  },
  hawaii: {
    "Additional Facility": "#3C3C3C",
    "U.S. Army Internment Camp": "#B3B3B3",
  },
};

export const FAR_COLORS = {
  pre: "#e3cd68",
  both: "#7FC788",
  dest: "#86d5e3",
};
