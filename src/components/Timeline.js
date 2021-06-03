import React, { useContext } from "react";
import * as d3 from "d3";

import { Context } from "store";
import "./Timeline.scss";

const Timeline = () => {
  const { state } = useContext(Context);
  const { facilities } = state.data;

  const dates = [
    ...facilities.features.map((f) => f.properties.date_opened),
    ...facilities.features.map((f) => f.properties.date_closed),
  ];

  let timeExtent = d3.extent(dates);

  // TODO use timeExtent to make a time scale
  // TODO display a visualization of facilities over time

  return <div className="timeline">Timeline</div>;
};

export default Timeline;
