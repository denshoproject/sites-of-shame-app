import React, { useContext } from "react";
import { Popup } from "react-mapbox-gl";

import FacilityPopup from "components/FacilityPopup";
import FamilyPopup from "components/FamilyPopup";
import FARPopup from "components/FARPopup";
import ExclusionOrderPopup from "components/ExclusionOrderPopup";
import { Context } from "store";
import "./PopupSwitch.scss";

const PopupSwitch = () => {
  const { state } = useContext(Context);
  const { clickedFeature, clickedFeatureLngLat } = state;
  if (!clickedFeature || !clickedFeatureLngLat) return null;

  const layerId = clickedFeature.layer.id;
  const { lng, lat } = clickedFeatureLngLat;

  return (
    <Popup className="popup-switch" coordinates={[lng, lat]}>
      <div className="popup-content">
        {layerId === "sos-facilities" ? (
          <FacilityPopup feature={clickedFeature} />
        ) : null}
        {layerId === "exclusion orders" ? (
          <ExclusionOrderPopup feature={clickedFeature} />
        ) : null}
        {layerId === "sos-journeys" ? (
          <FamilyPopup feature={clickedFeature} />
        ) : null}
        {layerId.startsWith("far") ? (
          <FARPopup feature={clickedFeature} />
        ) : null}
      </div>
    </Popup>
  );
};

export default PopupSwitch;
