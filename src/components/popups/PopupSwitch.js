import React, { useContext } from "react";
import { Popup } from "react-mapbox-gl";

import FacilityPopup from "components/popups/FacilityPopup";
import TransferOrderPopup from "components/popups/TransferOrderPopup";
import FamilyPopup from "components/popups/FamilyPopup";
import FARPopup from "components/popups/FARPopup";
import ExclusionOrderPopup from "components/popups/ExclusionOrderPopup";
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
        {layerId === "families" ? (
          <FamilyPopup feature={clickedFeature} />
        ) : null}
        {layerId === "transfer orders" ? (
          <TransferOrderPopup feature={clickedFeature} />
        ) : null}
        {layerId === "exclusion orders" ? (
          <ExclusionOrderPopup feature={clickedFeature} />
        ) : null}
        {layerId.startsWith("far") ? (
          <FARPopup feature={clickedFeature} />
        ) : null}
      </div>
    </Popup>
  );
};

export default PopupSwitch;
