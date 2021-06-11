export const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
export const MAPBOX_BASE_LAYER = process.env.REACT_APP_MAPBOX_BASE_LAYER;
export const DATA_PATH = process.env.REACT_APP_DATA_PATH;
export const HAWAII_BOUNDS = [
  [-160.4279, 18.7711],
  [-154.6545, 22.4415],
];

export const FACILITY_COLORS = {
  wra: {
    "Additional Facility": "#8e9775",
    "Citizen Isolation Center": "#939b62",
    "Concentration Camp": "#ff7b54",
    "Temporary Assembly Center": "#FFB26B",
  },
  eais: {
    "Additional Facility": "#8e9775",
    "Department of Justice Internment Camp": "#ffd56b",
    "Immigration Detention Station": "#e28f83",
    "U.S. Army Internment Camp": "#4a503d",
    "U.S. Federal Prison": "#faf2da",
  },
  hawaii: {
    "Additional Facility": "#8e9775",
    "U.S. Army Internment Camp": "#4a503d",
  },
};
